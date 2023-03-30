import { useSelector } from 'react-redux';
import {
  Alert
} from '@mui/material';

const Message = () => {
  const message = useSelector((state) => state.message);

  if (message === null) {
    return;
  }

  return (
    <Alert severity={message.type}>
      <em>{message.text}</em>
    </Alert>
  );
};

export default Message;
