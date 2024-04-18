const SET_PROCENT = "SET_PROCENT"
const SET_OCCUPIED = "SET_OCCUPIED"
const SET_TASK = "SET_TASK"


const defaultState = {
  procent: 0,
  occupied: [],
  task: []
}

export default function busyDataReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PROCENT: return { ...state, procent: action.payload }
    case SET_OCCUPIED: return { ...state, occupied: action.payload }
    case SET_TASK: return { ...state, task: action.payload }
    default:
      return state
  }
}

export const setProcent = (procent) => ({ type: SET_PROCENT, payload: procent })
export const setOccupied = ({ placeCountGB, TDOccupied }) => ({ type: SET_OCCUPIED, payload: { placeCountGB, TDOccupied } })
export const setTask = (datatask) => ({ type: SET_TASK, payload: datatask }) 
