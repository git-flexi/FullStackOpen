import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../reducers/blogReducer';
import {
  TextField, Button
} from '@mui/material';

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const submitComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment('');
  };

  return (
    <form onSubmit={submitComment}>
      <div className="input-block">
        <TextField
          label='Comment'
          name="commentInput"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="contained" color="primary" type="submit">add comment</Button>
      </div>
    </form>
  );
};

export default CommentForm;