import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UsersInfo = () => {
  const userList = useSelector((state) => state.userList);

  const match = useMatch('/users/:id');
  const user = match
    ? userList.find((user) => {
      return user.id === match.params.id;
    })
    : null;

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInfo;
