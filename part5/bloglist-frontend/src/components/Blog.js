const Blog = ({ blog }) => (
  <div className='blog'>
    <div className='blogTitle'>{blog.title}</div>
    <div className='blogProps'>by: {blog.author}</div>
    <div className='blogProps'>URL: {blog.url}</div>
  </div>
);

export default Blog;