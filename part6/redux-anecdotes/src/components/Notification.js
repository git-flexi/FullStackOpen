import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.message);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: '0 0 10px 0',
  };

  return (
    <div>
      {notification !== '' &&
        <div style={style}>
          {notification}
        </div>
      }
    </div>
  );
};

export default Notification;
