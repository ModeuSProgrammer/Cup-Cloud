const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const ADD_FILE = "ADD_FILE"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
const PUSH_TO_STACK = "PUSH_TO_STACK"
const DELETE_FILE = "DELETE_FILE"
const SET_PROCENT = "SET_PROCENT"

const defaultState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  procent: 0,
  dirStack: []
}

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES: return { ...state, files: action.payload }
    case SET_CURRENT_DIR: return { ...state, currentDir: action.payload }
    case ADD_FILE: return { ...state, files: [...state.files, action.payload] }
    case SET_POPUP_DISPLAY: return { ...state, popupDisplay: action.payload }
    case PUSH_TO_STACK: return { ...state, dirStack: [...state.dirStack, action.payload] }
    case DELETE_FILE: return { ...state, files: [...state.files.filter(file => file.ID !== action.payload)] }
    case SET_PROCENT: return { ...state, procent: action.payload }
    default:
      return state
  }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const addFile = (file) => ({ type: ADD_FILE, payload: file });
export const setPopupDisplay = (display) => ({ type: SET_POPUP_DISPLAY, payload: display });
export const pushToStack = (dir) => ({ type: PUSH_TO_STACK, payload: dir });
export const deleteFileAction = (dirID) => ({ type: DELETE_FILE, payload: dirID });
export const setProcent = (procent) => ({ type: SET_PROCENT, payload: procent });