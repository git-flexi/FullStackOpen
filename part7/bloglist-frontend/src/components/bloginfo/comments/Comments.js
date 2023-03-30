import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <>
      <h3>comments</h3>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments
          .map((comment) => (
            <li key={comment}>{comment}</li>
          ))
        }
      </ul >
    </>
  );
};

export default Comments;