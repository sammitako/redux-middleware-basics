export const createPromiseThunk = (type, promiseCreator) => {
  // Action Type
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // thunk 생성함수, 여기서 파라미터는 하나로 통일해서 나중에 비구조할당으로 사용
  // Flux Standard Action
  return (param) => async (dispatch) => {
    dispatch({ type });
    try {
      const payload = await promiseCreator(param); // posts, post
      dispatch({
        type: SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: null,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};
