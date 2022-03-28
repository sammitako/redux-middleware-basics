import React from "react";
import PostContainer from "../containers/PostContainer";

const PostPage = ({ match }) => {
  const { id } = match.params; // URL 파라미터 조회 -> 문자열
  const postId = parseInt(id, 10);
  return <PostContainer postId={postId} />;
};

export default PostPage;
