import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const remove = async (object) => {
  const response = await axios.delete(`${baseUrl}/${object.id}`);
  return response.data;
}

const newLike = async (object) => {
  object.likes += 1;
  const response = await axios
    .put(`${baseUrl}/${object.id}`, object)

  return response.data
}

export default { getAll, create, setToken, newLike, remove };
