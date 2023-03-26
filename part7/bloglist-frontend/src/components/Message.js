import { useSelector } from 'react-redux';

const Message = () => {
  const message = useSelector(state => state.message);

  if (message === null) {
    return;
  };

  let messageColor = 'grey';
  if (message.type === 'success') {
    messageColor = 'green';
  };

  if (message.type === 'error') {
    messageColor = 'red';
  };

  const messageStyle = {
    color: messageColor,
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div className="message" style={messageStyle}>
      <em>{message.text}</em>
    </div>
  );
};

export default Message;
