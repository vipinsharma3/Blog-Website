const CommentsList = ({comments}) => {
  return (
    <>
      <h1 className="text-lg font-semibold py-4">Comments : </h1>
      {comments.map((comment) => (
        <div className="p-2" key={comment.postedBy + ":" + comment.text}>
          <h3 className="font-semibold">{comment.postedBy}</h3>
          <p className="font-mono">{comment.text}</p>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
