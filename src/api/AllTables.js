import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Table({tableId}) {
  let location = useLocation();
  console.log(location.pathname, tableId);
  
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tables/${tableId}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  function createPost() {
    axios
      .post(process.env.REACT_APP_API_URL, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}