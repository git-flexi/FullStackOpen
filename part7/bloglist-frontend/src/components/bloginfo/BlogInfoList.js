import { useSelector } from 'react-redux';
import BlogInfoListEntry from './BlogInfoListEntry';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogInfoListEntry key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;