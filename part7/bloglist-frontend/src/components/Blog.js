import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showErrorMessage } from '../reducers/messageReducer';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (event) => {
    event.preventDefault();

    try {
      dispatch(likeBlog(blog));
    } catch (exception) {
      dispatch(showErrorMessage(exception.response.data.error));
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (
      !window.confirm(
        `Do you really want to delete '${blog.title}' by ${blog.author}?`
      )
    ) {
      return;
    }

    try {
      dispatch(deleteBlog(blog));
    } catch (exception) {
      dispatch(showErrorMessage(exception.response.data.error));
    }
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div className="blog">
      <div className="blogTitle">
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div className="blogPropContainer" style={showWhenVisible}>
        <div className="blogProps">
          URL: <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="blogProps">
          Likes: {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        {blog.user && (
          <div className="blogProps">Created by: {blog.user.name}</div>
        )}
        {user && user.username === blog.user.username && (
          <div className="blogProps">
            <button className="deleteButton" onClick={handleDelete}>
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
