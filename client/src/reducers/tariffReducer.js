const SET_TARIFF = "SET_TARIFF"
const GET_TARIFF = "GET_TARIFF"


const defaultState = {
  tariffID: null,
}

export default function tariffReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TARIFF: return { ...state, tariffID: action.payload.tariffID }
    case GET_TARIFF: return { ...state, tariffID: action.payload.tariffID }
    default:
      return state
  }
}

export const setTariff = ({ tariffID }) => ({ type: SET_TARIFF, payload: { tariffID } })
export const getTariff = ({ tariffID }) => ({ type: GET_TARIFF, payload: { tariffID } })
