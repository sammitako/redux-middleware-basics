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
    // 데이터 리로딩되는 문제 해결
    // if (data) return; // deps -> [data]
    dispatch(getPosts());
  }, [dispatch]);

  // 기존의 데이터 유지 -> 데이터 존재하면 Loading... 숨김
  if (loading && !data) return <div>Loading...</div>;
  if (error) return <div>ERROR !</div>;
  if (!data) return null;

  return <PostList posts={data} />;
};

export default PostListContainer;
