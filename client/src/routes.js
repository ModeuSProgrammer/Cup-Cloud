import Drive from './pages/Drive';
import Profile from './pages/Profile';
import Tariff from './pages/Tariff';
import Auth from './pages/Auth';
import Main from './pages/Main';
import { DRIVE_ROUTE, PROFILE_ROUTE, TARIFF_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE } from './utils/consts';

export const authRoutes = [
  {
    path: DRIVE_ROUTE,
    Component: Drive
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile
  },
  {
    path: TARIFF_ROUTE,
    Component: Tariff
  }
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Main
  }
]


