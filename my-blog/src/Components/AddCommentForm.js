import axios from "axios";
import {useState} from "react";
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleName, updatedComment}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const {user} = useUser();

  const addComment = async () => {
    if (!name.trim() || !comment.trim()) {
      alert("Name and comment cannot be empty");
      return;
    }

    const token = user && (await user.getIdToken());
    const headers = token ? {authToken: token} : {};
    const response = await axios.post(
      `/api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: comment,
      },
      {
        headers,
      }
    );
    const newComment = response.data;
    updatedComment(newComment);
    setName("");
    setComment("");
  };

  return (
    <div>
      <h1 className="my-6 text-lg font-semibold">Add Comments</h1>
      {user && <p className="text-md">You are posting as {user.email}</p>}
      <div className="flex">
        <input
          placeholder="Enter Name"
          className="mt-4 mr-8 p-4 border-2 border-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          
        />
        <textarea
          placeholder="Write Comment"
          className="mt-4 mr-8 p-4 border-2 border-black"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          // cols={30}
          // rows={4}
        />
        <button
          className="my-6 p-4 rounded-md cursor-pointer text-white bg-black active:bg-slate-700"
          onClick={addComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default AddCommentForm;
