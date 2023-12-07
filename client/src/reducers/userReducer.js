const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const SET_PROFILE = "SET_PROFILE"


const defaultState = {
  currentUser: {},
  currentProfile: {
    firstname: null,
    email: null,
    avatar: null,
  },
  isAuth: false
}
export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isAuth: false
      }
    case SET_PROFILE:
      return {
        ...state,
        currentProfile: {
          ...state.currentProfile,
          avatar: `${action.payload.avatar}`,
          firstname: `${action.payload.firstname}`,
          email: `${action.payload.email}`,
        },
        isAuth: true,
      }
    default:
      return state
  }
}

export const setUser = user => ({ type: SET_USER, payload: user })
export const setProfile = profile => ({ type: SET_PROFILE, payload: profile })
export const logout = () => ({ type: LOGOUT }) 