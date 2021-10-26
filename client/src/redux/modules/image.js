// image.js

// Actions
const LOAD = "image/LOAD";
const CREATE = "image/CREATE";
const UPDATE = "image/UPDATE";
const REMOVE = "image/REMOVE";

const initialState = {
  image: [{ fileName: "test", id: 1 }],
};

// Action Creators
export function loadImage(image) {
  return { type: LOAD, image };
}

export function createImage(image) {
  return { type: CREATE, image };
}

// export function updateImage(widget) {
//   return { type: UPDATE, widget };
// }

// export function removeImage(widget) {
//   return { type: REMOVE, widget };
// }

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "image/LOAD":
      return state;

    case "image/CREATE":
      const new_image_list = [...state.image, action.image];
      return { image: new_image_list };

    default:
      return state;
  }
}
