import { useEffect, useState } from "react";
import useStyles from "../css/useStyles.js";

import { useDispatch, useSelector } from "react-redux";

const ImageShow = () => {
  const classes = useStyles();
  const loaded_image = useSelector((state) => state.image);

  console.log(loaded_image, "로디드 이미지");
  useEffect(() => {
    let file, fr, img;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    function loadImage() {
      file = loaded_image.image[0].file;
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
        ctx.drawImage(img, 0, 0);
      }
    }

    function reset() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    if (loaded_image.image.length !== 0) loadImage();

    return () => reset();
  }, [loaded_image]);

  console.log(loaded_image);
  if (loaded_image.length === 0) {
    return <h1>Upload your image</h1>;
  } else {
    return (
      <canvas
        id="canvas"
        style={{ maxWidth: "100%", maxHeight: "100%", overflow: "auto" }}
      ></canvas>
    );
  }
};

export default ImageShow;
