// current.js

// Actions
const UPDATE = "current/UPDATE";

const initialState = {
  index: 0,
};

// Action Creators
export function updateIndex(idx) {
  return { type: UPDATE, idx: idx };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "current/UPDATE":
      const new_idx = action.idx;

      return { index: new_idx };

    default:
      return state;
  }
}
