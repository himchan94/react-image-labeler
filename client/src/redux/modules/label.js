// lable.js

// Actions
const LOAD = "label/LOAD";
const CREATE = "label/CREATE";
const UPDATE = "label/UPDATE";
const REMOVE = "label/REMOVE";

const initialState = {
  label: [],
};

// Action Creators
export function loadLabel(label) {
  return { type: LOAD, label };
}

export function createLabel(label) {
  return { type: CREATE, label };
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
    case "label/LOAD":
      return state;

    case "label/CREATE":
      const new_label_list = [...state.label, action.label];
      return { image: new_label_list };

    default:
      return state;
  }
}
