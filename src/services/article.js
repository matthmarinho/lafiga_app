import api from "./api";

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

const getAll = () => {
  return api.get("/api/v1/articles");
};

const get = id => {
  return api.get(`/api/v1/articles/${id}`);
};

const create = data => {

  const formData = new FormData()
  formData.append('image', data.image)
  formData.append('title', data.title)
  formData.append('content', data.content)
  formData.append('gallery', data.gallery)

  return api.post("/api/v1/articles", formData, config);
};

const update = (id, data) => {

  const formData = new FormData()
  formData.append('image', data.image)
  formData.append('title', data.title)
  formData.append('content', data.content)
  formData.append('gallery', data.gallery)
  
  return api.put(`/api/v1/articles/${id}`, data);
};

const remove = id => {
  return api.delete(`/api/v1/articles/${id}`);
};

const removeInBatches = (data) => {
  return api.delete(`/api/v1/articles/remove_in_batches`, {data: data});
};

const findByTitle = title => {
  return api.get(`/api/v1/articles?title=${title}`);
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