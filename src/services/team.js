import api from "./api";

const getAll = () => {
  return api.get("/api/v1/teams");
};

const get = id => {
  return api.get(`/api/v1/teams/${id}`);
};

const create = data => {
  return api.post("/api/v1/teams", data);
};

const update = (id, data) => {
  return api.put(`/api/v1/teams/${id}`, data);
};

const remove = id => {
  return api.delete(`/api/v1/teams/${id}`);
};

const removeInBatches = (data) => {
  return api.delete(`/api/v1/teams/remove_in_batches`, {data: data});
};

const findByTitle = title => {
  return api.get(`/api/v1/teams?title=${title}`);
};

const exportedObject = {
  getAll,
  get,
  create,
  update,
  remove,
  removeInBatches,
  findByTitle
}

export default exportedObject