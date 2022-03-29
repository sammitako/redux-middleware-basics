import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { reducerUtils } from "../lib/asyncUtils";
import { clearPost, getPost } from "../modules/posts";

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(
    (state) => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // 데이터 있으면 API 요청 안함
    if (data) return;
    dispatch(getPost(postId));

    // unmount, postId가 변경되서 useEffect 함수가 호출되기 직전
    // return () => {
    //   dispatch(clearPost());
    // };
  }, [postId, dispatch, data]);

  if (loading && !data) return <div>Loading...</div>;
  if (error) return <div>ERROR !</div>;
  if (!data) return null;

  return <Post post={data} />;
};

export default PostContainer;
