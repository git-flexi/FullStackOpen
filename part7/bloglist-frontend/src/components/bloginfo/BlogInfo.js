import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likeBlog } from '../../reducers/blogReducer';
import { showErrorMessage } from '../../reducers/messageReducer';
import Comments from './comments/Comments';

const BlogInfo = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const match = useMatch('/blogs/:id');
  const blog = match
    ? blogs.find((blog) => {
      return blog.id === match.params.id;
    })
    : null;

  if (!blog) {
    return null;
  }

  const handleLike = (event) => {
    event.preventDefault();
    try {
      dispatch(likeBlog(blog));
    } catch (exception) {
      dispatch(showErrorMessage(exception.response.data.error));
    }
  };

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div><a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
      <div>added by {blog.user.name}</div>
      <Comments blog={blog} />
    </div>
  );
};

export default BlogInfo;