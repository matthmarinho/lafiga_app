import api from "../../../services/api";

const getAll = () => {
  return api.get(`/api/v1/categories`);
};

const get = (id) => {
  return api.get(`/api/v1/categories/${id}`);
};

const create = (data) => {
  return api.post(`/api/v1/categories`, data);
};

const update = (id, data) => {
  return api.put(`/api/v1/categories/${id}`, data);
};

const remove = () => {
  return api.delete(`/api/v1/categories`);
};

const removeAll = () => {
  return api.delete(`/api/v1/maps`);
};

const findByTitle = title => {
  return api.get(`/api/v1/maps?title=${title}`);
};

const exportedObject = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
}

export default exportedObject