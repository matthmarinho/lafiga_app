import api from "./api";

const getAll = () => {
  return api.get("/api/v1/chars");
};

const get = id => {
  return api.get(`/api/v1/chars/${id}`);
};

const create = data => {
  return api.post("/api/v1/chars", data);
};

const update = (id, data) => {
  return api.put(`/api/v1/chars/${id}`, data);
};

const remove = id => {
  return api.delete(`/api/v1/chars/${id}`);
};

const removeInBatches = (data) => {
  return api.delete(`/api/v1/chars/remove_in_batches`, {data: data});
};

const withoutTeam = () => {
  return api.get(`/api/v1/chars/without_team`);
};

const findByTitle = title => {
  return api.get(`/api/v1/chars?title=${title}`);
};

const exportedObject = {
  getAll,
  get,
  create,
  update,
  remove,
  removeInBatches,
  withoutTeam,
  findByTitle
}

export default exportedObject