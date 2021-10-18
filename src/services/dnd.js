import api from "./api_dnd"

const getClasses = mapId => {
  return api.get(`/classes`)
}

const exportedObject = {
  getClasses,
}

export default exportedObject