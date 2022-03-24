const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// {id, title, body}
const posts = [
  {
    id: 1,
    title: "Redux Basics",
    body: "What is Redux Basics?",
  },
  {
    id: 2,
    title: "Redux Intermediate",
    body: "What is Redux Intermediate?",
  },
  {
    id: 3,
    title: "Redux Advanced",
    body: "What is Redux Advanced?",
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
