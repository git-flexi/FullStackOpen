import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../reducers/blogReducer';
import {
  TextField, Button
} from '@mui/material';
import Togglable from '../Toggable';

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const dispatch = useDispatch();

  const addNewBlog = (event) => {
    event.preventDefault();

    dispatch(createBlog(newBlog));
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <Togglable buttonLabel="new blog">
      <form onSubmit={addNewBlog}>
        <h2>Create Blog</h2>
        <div className="input-block">
          <TextField label='Title'
            name="title"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, [target.name]: target.value })
            }
          />
        </div>
        <div className="input-block">
          <TextField label='author'
            name="author"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, [target.name]: target.value })
            }
          />
        </div>
        <div className="input-block">
          <TextField label='Url'
            name="url"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, [target.name]: target.value })
            }
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">create</Button>
        </div>
      </form>
    </Togglable>
  );
};

export default BlogForm;
