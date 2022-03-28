import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import { getPosts } from "../modules/posts";

const PostListContainer = () => {
  // modules -> rootReducer posts -> initialState
  const { data, loading, error } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  // modules에서 API 호출
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>ERROR !</div>;
  if (!data) return null;

  return <PostList posts={data} />;
};

export default PostListContainer;
