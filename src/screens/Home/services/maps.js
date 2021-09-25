import api from "../../../services/api";

const getAll = () => {
  return api.get("/api/v1/maps");
};

const get = id => {
  return api.get(`/api/v1/maps/${id}`);
};

const create = data => {
  return api.post("/api/v1/maps", data);
};

const update = (id, data) => {
  return api.put(`/api/v1/maps/${id}`, data);
};

const remove = id => {
  return api.delete(`/api/v1/maps/${id}`);
};

const removeAll = () => {
  return api.delete(`/api/v1/maps`);
};

const findByTitle = title => {
  return api.get(`/api/v1/maps?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};