const myLogger = (store) => (next) => (action) => {
  console.log(action);
  // 컨테이너 컴포넌트에서 dispatch 됬을 때의 결과물
  const result = next(action);
  console.log("\t", store.getState()); // 액션이 리듀서에서 모두 처리가 된 후의 상태
  return result;
};

export default myLogger;
