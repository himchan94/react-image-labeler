//configStore.js
import { createStore, combineReducers } from "redux";
import image from "./modules/image";
import label from "./modules/label";
import current from "./modules/current";
import { createBrowserHistory } from "history";

// Redux devtool
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구

// 브라우저 히스토리를 만들어줍니다.
export const history = createBrowserHistory();
// root 리듀서를 만들어줍니다.
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가해주는 거예요!
const rootReducer = combineReducers({
  image: image,
  label: label,
  current: current,
});

// 스토어를 만듭니다.
const store = createStore(rootReducer, composeWithDevTools());

export default store;
