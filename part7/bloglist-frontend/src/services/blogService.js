import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig());
  return response.data;
};

const update = async (updateBlog) => {
  const response = await axios.put(
    `${baseUrl}/${updateBlog.id}`,
    updateBlog,
    getConfig()
  );
  return response.data;
};

const remove = async (deleteBlog) => {
  const response = await axios.delete(
    `${baseUrl}/${deleteBlog.id}`,
    getConfig()
  );
  return response.data;
};

const addComment = async (id, comment) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`, { comment }
  );
  return response.data;
};

export default { getAll, create, update, remove, addComment, setToken };
