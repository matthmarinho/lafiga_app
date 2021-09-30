import api from "../../../services/api"

const getAll = mapId => {
  return api.get(`/api/v1/maps/${mapId}/markers`)
}

const get = (mapId, id) => {
  return api.get(`/api/v1/maps/${mapId}/markers/${id}`)
}

const create = (mapId, data) => {
  return api.post(`/api/v1/maps/${mapId}/markers`, data)
}

const update = (mapId, id, data) => {
  return api.put(`/api/v1/maps/${mapId}/markers/${id}`, data)
}

const remove = (mapId, id) => {
  return api.delete(`/api/v1/maps/${mapId}/markers/${id}`)
}

const removeAll = () => {
  return api.delete(`/api/v1/maps`)
}

const findByTitle = title => {
  return api.get(`/api/v1/maps?title=${title}`)
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
}