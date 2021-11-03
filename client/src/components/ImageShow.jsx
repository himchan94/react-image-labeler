import { useEffect, useState } from "react";

//Mui component
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateImageid } from "../redux/modules/current.js";

// ID generator
import uuidv4 from "../script/id_generator.js";

// canvas global variable
let canvas, ctx;

// layer global variable
let layer, layerCtx;

const ImageShow = () => {
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("rectangle");
  const [selectedElement, setSelectedElement] = useState(null);

  const dispatch = useDispatch();

  const loaded_image = useSelector((state) => state.image);
  const loaded_label = useSelector((state) => state.label.label);
  const currentIndex = useSelector((state) => state.current.index);
  const currentLabel = useSelector((state) => state.current.current_label);
  const currentImageId = useSelector((state) => state.current.current_id);

  useEffect(() => {
    // canvas def
    canvas = document.getElementById("canvas");
    layer = document.getElementById("layer");

    if (canvas && layer) {
      ctx = canvas.getContext("2d");
      layerCtx = layer.getContext("2d");

      layerCtx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // file = local image file, fr =  fileReader, img = image object
    let file, fr, img;

    // loading image function
    function loadImage() {
      dispatch(
        updateImageid({
          current_id: loaded_image.image[currentIndex].id,
        })
      );
      file = loaded_image.image[currentIndex].file;
      fr = new FileReader();
      fr.onload = createImage;
      fr.readAsDataURL(file);

      // window image object creating function
      function createImage() {
        img = new Image();
        img.src = fr.result;
        img.onload = imageLoaded;
      }

      // loading image to canvas function
      function imageLoaded() {
        // set canvas(image) width & height
        canvas.width = img.width;
        canvas.height = img.height;

        // set canvas(layer) width & height
        layer.width = img.width;
        layer.height = img.height;

        // ctx.globalCompositeOperation = "source-over";

        // drawing image to canvas
        ctx.drawImage(img, 0, 0);

        // drawing label to canvas
        elements.forEach(({ x1, x2, y1, y2, labelColor, imageId }) => {
          if (currentImageId === imageId) {
            layerCtx.strokeStyle = labelColor;
            layerCtx.lineWidth = 3;
            layerCtx.strokeRect(x1, y1, x2 - x1, y2 - y1);
          }
        });
      }
    }

    // if image exists excute the function
    if (loaded_image.image.length !== 0) {
      loadImage();
    } else {
      // when there are no images, clear rect

      if (canvas) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    }
  }, [loaded_image, currentIndex, elements, currentImageId]);

  const createElement = (
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    labelName,
    labelId,
    labelColor,
    imageId
  ) => {
    return {
      id,
      x1,
      y1,
      x2,
      y2,
      type,
      labelName,
      labelId,
      labelColor,
      imageId,
    };
  };

  // offset for select
  const nearPoint = (x, y, x1, y1, name) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
  };

  const positionWithinElement = (x, y, element) => {
    const { type, x1, y1, x2, y2 } = element;
    if (type === "rectangle") {
      const topLeft = nearPoint(x, y, x1, y1, "tl");
      const topRight = nearPoint(x, y, x2, y1, "tr");
      const bottomLeft = nearPoint(x, y, x1, y2, "bl");
      const bottomRight = nearPoint(x, y, x2, y2, "br");
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

      return topLeft || topRight || bottomLeft || bottomRight || inside;
    }
  };

  const getElementAtPosition = (x, y, elements) => {
    return elements
      .filter((element) => element.imageId === currentImageId)
      .map((element) => ({
        ...element,
        position: positionWithinElement(x, y, element),
      }))
      .find((element) => element.position !== null);
  };

  const updateElement = (id, x1, y1, x2, y2) => {
    const elementsCopy = [...elements];
    const updated_elementsCopy = elementsCopy.map((element) => {
      if (element.id === id) {
        return { ...element, x1, y1, x2, y2 };
      } else return element;
    });

    // elementsCopy[id] = updatedElement;
    setElements(updated_elementsCopy);
  };

  // {최소x1, 최소y1, 최소x2, 최소y2} 조정
  const adjustElementCoordinate = (element) => {
    const { type, x1, y1, x2, y2 } = element;
    if (type === "rectangle") {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      return { x1: minX, y1: minY, x2: maxX, y2: maxY };
    }
  };

  const cursorForPosition = (position) => {
    switch (position) {
      case "tl":
      case "br":
        return "nwse-resize";
      case "tr":
      case "bl":
        return "nesw-resize";
      default:
        return "move";
    }
  };

  const resizedCoordinates = (clientX, clientY, position, coordinates) => {
    const { x1, y1, x2, y2 } = coordinates;
    switch (position) {
      case "tl":
        return { x1: clientX, y1: clientY, x2, y2 };
      case "tr":
        return { x1, y1: clientY, x2: clientX, y2 };
      case "bl":
        return { x1: clientX, y1, x2, y2: clientY };
      case "br":
        return { x1, y1, x2: clientX, y2: clientY };
      default:
        return null; //should not really get here...
    }
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = realXY(canvas, e);

    if (loaded_label.length === 0) {
      alert("Create yout Label");
    } else {
      if (!currentLabel.name) {
        alert("Select your Label");
      }
    }

    if (currentLabel.name) {
      if (tool === "selection") {
        const element = getElementAtPosition(clientX, clientY, elements);

        if (element) {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });

          if (element.position === "inside") {
            setAction("moving");
          } else {
            setAction("resizing");
          }
        }
        // if we are on an element
        // setaction(moving)
      } else if (tool === "remove") {
        const removing_element = getElementAtPosition(
          clientX,
          clientY,
          elements
        );
        if (removing_element) {
          // array of same imageId with currentImageId && editied array
          const filtered_currentImage = elements.filter(
            (elements) =>
              elements.imageId === currentImageId &&
              elements.id !== removing_element.id
          );

          // array of different imageId with currentImageId && not editied array
          const not_filtered_currentImage = elements.filter(
            (elements) => elements.imageId !== currentImageId
          );

          // combine both array to state
          setElements([...not_filtered_currentImage, ...filtered_currentImage]);
        }
      } else {
        const id = elements.length;
        const element = createElement(
          id,
          clientX,
          clientY,
          clientX,
          clientY,
          tool,
          currentLabel.name,
          currentLabel.id,
          currentLabel.color,
          currentImageId
        );
        setElements((prevState) => [...prevState, element]);
        setAction("drawing");
        setSelectedElement(element);
      }
    }
  };

  // function for real calculate real x,y position in canvas(layer)
  const realXY = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      clientX:
        ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      clientY:
        ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = realXY(canvas, e);

    if (currentLabel) {
      if (tool === "selection") {
        const element = getElementAtPosition(clientX, clientY, elements);
        e.target.style.cursor = element
          ? cursorForPosition(element.position)
          : "default";
      }

      if (action === "drawing") {
        const index = elements.length - 1;
        const { x1, y1 } = elements[index];
        updateElement(index, x1, y1, clientX, clientY, tool);
      } else if (action === "moving") {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
      } else if (action === "resizing") {
        const { id, type, position, ...coordinates } = selectedElement;
        const { x1, y1, x2, y2 } = resizedCoordinates(
          clientX,
          clientY,
          position,
          coordinates
        );
        updateElement(id, x1, y1, x2, y2, type);
      }
    }
  };

  const handleMouseUp = (e) => {
    if (currentLabel) {
      if (selectedElement) {
        const index = selectedElement.id;
        const { id, type } = elements[index];
        if (action === "drawing" || "resizing") {
          const { x1, y1, x2, y2 } = adjustElementCoordinate(elements[index]);
          updateElement(id, x1, y1, x2, y2, type);
        }

        setAction("none");
        setSelectedElement(null);
      }
    }
  };

  if (loaded_image.image.length === 0) {
    return <h1>Upload your image</h1>;
  } else {
    return (
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 300,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <input
              type="radio"
              id="selection"
              checked={tool === "selection"}
              onChange={() => setTool("selection")}
            />
            <label htmlFor="selection">Selection</label>
          </div>
          <div>
            <input
              type="radio"
              id="rectangle"
              checked={tool === "rectangle"}
              onChange={() => setTool("rectangle")}
            />
            <label htmlFor="rectangle">Rectangle</label>
          </div>
          <div>
            <input
              type="radio"
              id="rectangle"
              checked={tool === "remove"}
              onChange={() => setTool("remove")}
            />
            <label htmlFor="rectangle">Remove</label>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
          }}
        >
          <Button variant="contained" style={{ maxWidth: "50px" }}>
            <SaveIcon />
          </Button>
        </div>
        <canvas
          id="layer"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "auto",
            position: "absolute",
            zIndex: 44,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
        <canvas
          id="canvas"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "auto",
          }}
        ></canvas>
      </>
    );
  }
};

export default ImageShow;
