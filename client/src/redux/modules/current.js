// current.js

// Actions
const UPDATEINDEX = "current/UPDATEINDEX";
const UPDATEIMAGEID = "current/UPDATEIMAGEID";
const UPDATELABEL = "current/UPDATELABEL";

// data form {current_label:{name:label, color:color}}
const initialState = {
  index: 0,
  current_id: null,
  current_label: { name: null, color: null, id: null },
};

// Action Creators
export function updateIndex(obj) {
  return { type: UPDATEINDEX, obj: obj };
}

export function updateImageid(obj) {
  return { type: UPDATEIMAGEID, obj: obj };
}

export function updateLabel(obj) {
  return { type: UPDATELABEL, obj: obj };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "current/UPDATEINDEX":
      const newIndex_obj = action.obj;
      return { ...state, ...newIndex_obj };

    case "current/UPDATEIMAGEID":
      const newId_obj = action.obj;
      return { ...state, ...newId_obj };

    case "current/UPDATELABEL":
      const newLabel_obj = action.obj;
      return { ...state, current_label: newLabel_obj };

    default:
      return state;
  }
}
