import React from "react";
// import PostListContainer from "./containers/PostListContainer";
// import CounterContainer from "./containers/CounterContainer";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";

function App() {
  // return <CounterContainer />;
  // return <PostListContainer />;
  return (
    <>
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />
    </>
  );
}

export default App;
