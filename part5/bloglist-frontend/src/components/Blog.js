import { useState } from 'react';

const Blog = ({ user, blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeBlog = (event) => {
    event.preventDefault();
    blog.likes += 1;
    handleLike(blog);
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    if (!window.confirm(`Do you really want to delete '${blog.title}' by ${blog.author}?`)) {
      return;
    }

    handleDelete(blog);
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div className='blog'>
      <div className='blogTitle'>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div className='blogProps'>URL: <a href={blog.url}>{blog.url}</a></div>
        <div className='blogProps'>Likes: {blog.likes} <button onClick={likeBlog}>like</button></div>
        <div className='blogProps'>Created by: {blog.user.name}</div>
        {
          user && user.id === blog.user.id
          && <div className='blogProps'><button className='deleteButton' onClick={deleteBlog}>delete</button></div>
        }
      </div>
    </div >
  );
};

export default Blog;