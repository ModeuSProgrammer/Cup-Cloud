const SET_TARIFF = "SET_TARIFF"

const defaultState = {
  tariffID: null,
}

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TARIFF: return { ...state, tariffID: action.payload }
    default:
      return state
  }
}

export const setTariff = (tariffID) => ({ type: SET_TARIFF, payload: tariffID });