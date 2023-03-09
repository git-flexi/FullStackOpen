const Message = ({ messageObject }) => {
  if (messageObject === null) {
    return;
  }

  let messageColor = 'grey';
  if (messageObject.type === 'success') {
    messageColor = 'green';
  }

  if (messageObject.type === 'error') {
    messageColor = 'red';
  }
  const messageStyle = {
    color: messageColor,
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return (
    <div className='message' style={messageStyle}>
      <em>{messageObject.messageText}</em>
    </div>
  );
};

export default Message;