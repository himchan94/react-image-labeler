// image.js

// Actions
const LOAD = "image/LOAD";
const CREATE = "image/CREATE";
const UPDATE = "image/UPDATE";
const REMOVE = "image/REMOVE";

const initialState = {
  image: [],
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

export function removeImage(id) {
  return { type: REMOVE, id };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "image/LOAD":
      return state;

    case "image/CREATE":
      const new_image_list = [...state.image, ...action.image];
      console.log("액샨이미지", new_image_list);
      return { image: new_image_list };

    case "image/REMOVE":
      const filtered_image_arr = state.image.filter(
        (lb, idx) => lb.id !== action.id
      );
      return { image: filtered_image_arr };
    default:
      return state;
  }
}
