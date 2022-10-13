import api from "./api"

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

const getAll = () => {
  return api.get("/api/v1/maps")
}

const get = id => {
  return api.get(`/api/v1/maps/${id}`)
}

const getNames = () => {
  return api.get("/api/v1/maps/getNames")
}

const create = data => {
  const formData = new FormData()
  formData.append('image', data.image)
  formData.append('name', data.name)

  return api.post("/api/v1/maps", formData, config)
}

const update = (id, data) => {

  const formData = new FormData()
  formData.append('image', data.image)
  formData.append('name', data.name)

  return api.put(`/api/v1/maps/${id}`, formData, config)
}

const remove = id => {
  return api.delete(`/api/v1/maps/${id}`)
}

const removeAll = () => {
  return api.delete(`/api/v1/maps`)
}

const removeInBatches = (data) => {
  return api.delete(`/api/v1/maps/remove_in_batches`, {data: data});
};

const findByTitle = title => {
  return api.get(`/api/v1/maps?title=${title}`)
}

const exportedObject = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  removeInBatches,
  getNames
}

export default exportedObject