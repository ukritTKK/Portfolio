import { combineReducers } from 'redux'
import mechanic from './mechanic'
import part from './part'
import garage from './garage'
// import user from './user'
import post from './post'
import auth from './auth'
import car from './car'
import deleted from './delete'
import service from './service'
import userReducer from './myuser'
import settings from './settings'
import payment from './payment'
import map from './map'
import header from './header'
import mechanicSettings from './mechanic-settings'
import history from './history'

const rootReducer = combineReducers({
  mechanic: mechanic,
  part: part,
  garage: garage,
  // user: user,
  post: post,
  auth: auth,
  car: car,
  deleted: deleted,
  service: service,
  user: userReducer,
  settings: settings,
  payment: payment,
  map: map,
  header: header,
  mechanicSettings: mechanicSettings,
  history: history
})

export default rootReducer
