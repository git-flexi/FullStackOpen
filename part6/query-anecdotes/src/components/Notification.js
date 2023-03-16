import { useNotificationValue } from './NotificationContext';

const Notification = () => {
  const notifcation = useNotificationValue();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  if (!notifcation || notifcation === '') return null;

  return (
    <div style={style}>
      {notifcation}
    </div>
  );
};

export default Notification;
