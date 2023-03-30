import { Link } from 'react-router-dom';

const BlogInfoListEntry = ({ blog }) => {
  return (
    <div key={blog.id} className="blog">
      <div className="blogTitle">
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </div>
    </div>
  );
};

export default BlogInfoListEntry;