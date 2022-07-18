import api from "./api";

const getAll = () => {  
  return api.get("/api/v1/uploads");
};

const get = id => {
  return api.get(`/api/v1/uploads/${id}`);
};

const create = data => {
  const attachmentData = new FormData();
  
  attachmentData.append('[attachment]', data.attachment)
  attachmentData.append('[title]', data.title)
  attachmentData.append('[description]', data.description)

  return api.post("/api/v1/uploads", attachmentData);
};

const update = (id, data) => {
  return api.put(`/api/v1/uploads/${id}`, data);
};

const remove = id => {
  return api.delete(`/api/v1/uploads/${id}`);
};

const removeInBatches = (data) => {
  return api.delete(`/api/v1/uploads/remove_in_batches`, {data: data});
};

const findByTitle = title => {
  return api.get(`/api/v1/uploads?title=${title}`);
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