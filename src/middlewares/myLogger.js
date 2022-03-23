const myLogger = (store) => (next) => (action) => {
  console.log(action);
  // 컨테이너 컴포넌트에서 dispatch 됬을 때의 결과물
  const result = next(action);
  return result;
};

export default myLogger;
