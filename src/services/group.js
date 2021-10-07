import api from "./api"

const getAll = () => {
  return api.get(`/api/v1/groups`)
}

const create = (data) => {
  return api.post(`/api/v1/groups`, data)
}

const update = (groupId, data) => {
  return api.put(`/api/v1/groups/${groupId}`, data)
}

const remove = (groupId) => {
  return api.delete(`/api/v1/groups/${groupId}`)
}

const exportation =  {
  getAll,
  create,
  update,
  remove,
}


export default exportation