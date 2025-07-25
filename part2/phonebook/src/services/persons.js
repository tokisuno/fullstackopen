import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then(res => res.data);
}

const update = (oldObject, newObject) => {
  const id = oldObject.id;
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data);
}

const remove = (person) => {
  const req = axios.delete(`${baseUrl}/${person.id}`)
  return req.then(res => res.data);
}

export default { getAll, create, update, remove }
