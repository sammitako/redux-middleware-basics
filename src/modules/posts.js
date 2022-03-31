import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from "../lib/asyncUtils";
import { call, put, takeEvery } from "redux-saga/effects";

// API 요청 하나당 액션 3개씩
const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

const CLEAR_POST = "CLEAR_POST";

// thunk 함수 작성
// (actionType, promiseCreator)
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
// export const getPost = (id) => async (dispatch) => {
//   dispatch({ type: GET_POST, meta: id });
//   try {
//     // API 요청
//     const payload = await postsAPI.getPostById(id);
//     dispatch({ type: GET_POST_SUCCESS, payload, meta: id });
//   } catch (e) {
//     dispatch({
//       type: GET_POST_ERROR,
//       payload: e,
//       error: true,
//       meta: id,
//     });
//   }
// };
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const getPosts = () => ({ type: GET_POSTS });

// payload: saga에서 API 호출할 때 파라미터로 사용
// meta: reducer에서 처리할 때 사용
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });

// saga 함수
function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: e,
      error: true,
    });
  }
}

// dispatch되는 action 확인
function* getPostSaga(action) {
  const id = action.payload;
  try {
    const post = yield call(postsAPI.getPostById, id);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id,
    });
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      payload: e,
      error: true,
      meta: id,
    });
  }
}

// redux 모듈을 위한 saga 액션들을 모니터링하는 함수 -> rootSaga에 포함
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

export const goToHome =
  () =>
  (dispatch, getState, { history }) => {
    history.push("/");
  };

export const clearPost = () => ({ type: CLEAR_POST });

// 초기 상태
const initialState = {
  posts: reducerUtils.initial(),
  // post: reducerUtils.initial(),
  post: {},
};

const getPostsReducer = handleAsyncActions(GET_POSTS, "posts", true);
// const getPostReducer = handleAsyncActions(GET_POST, "post");
// const getPostReducer = (state, action) => {
//   const id = action.meta;
//   switch (action.type) {
//     case GET_POST:
//       return {
//         ...state,
//         post: {
//           ...state.post,
//           [id]: reducerUtils.loading(state.post[id] && state.post[id].data),
//         },
//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: {
//           ...state.post,
//           [id]: reducerUtils.success(action.payload),
//         },
//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         post: {
//           ...state.post,
//           [id]: reducerUtils.error(action.payload),
//         },
//       };
//     default:
//       return state;
//   }
// };
const getPostReducer = handleAsyncActionsById(GET_POST, "post", true);

// 리듀서
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);

    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}
