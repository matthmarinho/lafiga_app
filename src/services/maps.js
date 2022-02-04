import api from "./api";

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

const getAll = () => {
  return api.get("/api/v1/maps");
};

const get = id => {
  return api.get(`/api/v1/maps/${id}`);
};

const create = data => {
  const formData = new FormData();
  formData.append('image', data.image)
  formData.append('name', data.name)

  return api.post("/api/v1/maps", formData, config);
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