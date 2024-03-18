const SET_TARIFF = "SET_TARIFF"
const GET_TARIFF = "GET_TARIFF"
const GET_DATA_TARIFF = "GET_DATA_TARIFF"

const defaultState = {
  tariffID: null,
  dataTariff: {}
}

export default function tariffReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TARIFF: return { ...state, tariffID: action.payload.tariffID }
    case GET_TARIFF: return { ...state, tariffID: action.payload.tariffID }
    case GET_DATA_TARIFF: return { ...state, dataTariff: action.payload }
    default:
      return state
  }
}

export const setTariff = ({ tariffID }) => ({ type: SET_TARIFF, payload: { tariffID } })
export const getTariff = ({ tariffID }) => ({ type: GET_TARIFF, payload: { tariffID } })
export const getDT = (data) => ({ type: GET_DATA_TARIFF, payload: data })