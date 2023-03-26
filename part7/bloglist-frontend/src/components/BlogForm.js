import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showSuccessMessage, showErrorMessage } from '../reducers/messageReducer';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const dispatch = useDispatch();

  const addNewBlog = (event) => {
    event.preventDefault();

    try {
      const createdBlock = dispatch(createBlog(newBlog));
      dispatch(showSuccessMessage(
        `A new Blog ${createdBlock.title} by ${createdBlock.author} added`
      ));
    } catch (exception) {
      dispatch(showErrorMessage(exception.response.data.error));
    }

    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form onSubmit={addNewBlog}>
      <h2>Create Blog</h2>
      <div className="input-block">
        <label>Title:</label>
        <input
          name="title"
          id="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, [target.name]: target.value })
          }
        />
      </div>
      <div className="input-block">
        <label>Author:</label>
        <input
          name="author"
          id="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, [target.name]: target.value })
          }
        />
      </div>
      <div className="input-block">
        <label>Url:</label>
        <input
          name="url"
          id="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, [target.name]: target.value })
          }
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default BlogForm;
