const SET_PROCENT = "SET_PROCENT"
const SET_OCCUPIED = "SET_OCCUPIED"


const defaultState = {
  procent: 0,
  occupied: [],
}

export default function busyDataReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PROCENT: return { ...state, procent: action.payload }
    case SET_OCCUPIED: return { ...state, occupied: action.payload }
    default:
      return state
  }
}

export const setProcent = (procent) => ({ type: SET_PROCENT, payload: procent })
export const setOccupied = ({ placeCountGB, TDOccupied }) => ({ type: SET_OCCUPIED, payload: { placeCountGB, TDOccupied } }) 
