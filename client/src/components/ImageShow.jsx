import { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// let layer;
// let layerCtx;

let canvas, ctx;

const ImageShow = () => {
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("rectangle");
  const [selectedElement, setSelectedElement] = useState(null);

  const loaded_image = useSelector((state) => state.image);
  let currentIndex = useSelector((state) => state.current.index);

  useEffect(() => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // layer = document.getElementById("layer");
    // layerCtx = layer.getContext("2d");

    // file = local image file, fr =  fileReader, img = image object
    let file, fr, img;

    function loadImage() {
      file = loaded_image.image[currentIndex].file;
      fr = new FileReader();
      fr.onload = createImage;
      fr.readAsDataURL(file);

      function createImage() {
        img = new Image();
        img.onload = imageLoaded;
        img.src = fr.result;
      }

      function imageLoaded() {
        canvas.width = img.width;
        canvas.height = img.height;
        // layer.width = img.width;
        // layer.height = img.height;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, 0, 0);
        elements.forEach(({ layerElement }) => layerElement());
      }
    }

    function reset() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      console.log("리셋");
    }

    if (loaded_image.image.length !== 0) {
      loadImage();
      // elements.forEach(({ layerElement }) => layerElement());
    }
    return () => reset();
  }, [loaded_image, currentIndex, elements]);

  const createElement = (id, x1, y1, x2, y2, type) => {
    // const roughElement = generator.line(x1, y1, x2, y2);
    const layerElement =
      type === "line"
        ? null // 추후 다른 기능 확장예정
        : function () {
            ctx.strokeStyle = "gold";
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
          };
    return { id, x1, y1, x2, y2, type, layerElement };
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
      .map((element) => ({
        ...element,
        position: positionWithinElement(x, y, element),
      }))
      .find((element) => element.position !== null);
  };

  const updateElement = (id, x1, y1, x2, y2, type) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, type);

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
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
      case "start":
      case "end":
        return "nwse-resize";
      default:
        return "move";
    }
  };

  const resizedCoordinates = (clientX, clientY, position, coordinates) => {
    const { x1, y1, x2, y2 } = coordinates;
    switch (position) {
      case "tl":
      case "start":
        return { x1: clientX, y1: clientY, x2, y2 };
      case "tr":
        return { x1, y1: clientY, x2: clientX, y2 };
      case "bl":
        return { x1: clientX, y1, x2, y2: clientY };
      case "br":
      case "end":
        return { x1, y1, x2: clientX, y2: clientY };
      default:
        return null; //should not really get here...
    }
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = realXY(canvas, e);
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
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setAction("drawing");
      setSelectedElement(element);
    }
  };

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
  };

  const handleMouseUp = (e) => {
    if (selectedElement) {
      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (action === "drawing" || "resizing") {
        console.log(elements[index]);
        const { x1, y1, x2, y2 } = adjustElementCoordinate(elements[index]);
        console.log(x1, y1, x2, y2);
        updateElement(id, x1, y1, x2, y2, type);
      }

      setAction("none");
      setSelectedElement(null);
    }
  };

  if (loaded_image.length === 0) {
    return <h1>Upload your image</h1>;
  } else {
    return (
      <>
        <div style={{ position: "fixed", top: 0, left: 500 }}>
          {" "}
          <input
            type="radio"
            id="selection"
            checked={tool === "selection"}
            onChange={() => setTool("selection")}
          />
          <label htmlFor="selection">Selection</label>
          <input
            type="radio"
            id="rectangle"
            checked={tool === "rectangle"}
            onChange={() => setTool("rectangle")}
          />
          <label htmlFor="rectangle">Rectangle</label>
        </div>

        <canvas
          id="layer"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "auto",
            backgroundColor: "transparent",
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
            // position: "absolute",
            // zIndex: 11,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </>
    );
  }
};

export default ImageShow;
