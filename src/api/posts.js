import axios from "axios";

export const getPosts = async () => {
  // localhost:3000 -> 현재 React Application이 띄어져 있는 주소의 도메인을 사용
  const response = await axios.get("/posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};
