import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import BlogInfoList from './BlogInfoList';

const BlogInfoMain = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Blogs</h1>
      {user && <BlogForm />}
      <h2>Blogs</h2>
      <BlogInfoList />
    </div>
  );
};

export default BlogInfoMain;
