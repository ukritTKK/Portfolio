import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
// import { IndexRoute } from 'react-router'
import App from '../app'

import {
  // GarageAdd,
  // GarageEdit,
  // GarageIndex,
  MechanicIndex,
  MechanicAdd,
  MechanicEdit,
  PartIndex,
  PartAdd,
  PartEdit,
  // CarIndex,
  // CarAdd,
  // CarEdit,
  // RequireAuth,
  // RequireAuthMechanic,
  // RequireAuthGarage,
  Login,
  BackendLogin,
  Register,
  // DashboardMechanic,
  // DashboardGarage,
  ServiceLog,
  // ServiceAdd,
  // ServiceEdit,
  ServiceDetail,
  // MechanicProfile,
  // GarageProfile,
  Home,
  Map,
  Payment,
  History,
  Notification,
  Settings,
  Invoice,
  MechanicLogin
} from '../containers'
import MechanicMapContainer from '../containers/Mechanic/Map'
import MechanicSettingsContainer from '../containers/Mechanic/Settings'
// import { Main } from '../components'
import '../pages/css/pages.css'
import '../pages/css/pages-icons.css'
import store from '../stores/stores'
import { Provider } from 'react-redux'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import { createStore, combineReducers } from 'redux'
// import reducers from '../reducers'

// const store = createStore(
//   combineReducers({
//     mechanic: mechanic,
//     part: part,
//     garage: garage,
//     post: post,
//     auth: auth,
//     car: car,
//     deleted: deleted,
//     service: service,
//     user: userReducer,
//     settings: settings,
//     payment: payment,
//     map: map,
//     header: header,
//     routing: routerReducer
//   })
// )

// const history = syncHistoryWithStore(browserHistory, store)

// <Route exact path='/' component={Home}/>
// <Route path='/login' component={Login}/>
// <Route path='/register' component={Register}/>
// <Route path='/map' component={Map}/>
// <Route path='/payment' component={Payment}/>
// <Route path='/history' component={History}/>
// <Route path='/notification' component={Notification}/>
// <Route path='/settings' component={Settings}/>
// <Route path='/invoice' component={Invoice}/>
// <Route path='/mechanic/map' component={MechanicMapContainer}/>
// <Route path='backend/login' component={BackendLogin} />
// <Route exact path='/mechanics' component={MechanicIndex} />
// <Route path='/mechanic/login' component={MechanicLogin} />
// <Route path='/mechanic/add' component={MechanicAdd} />
// <Route path='/mechanic/edit/:id' component={MechanicEdit} />
// <Route exact path='/service' component={ServiceDetail} />
// <Route path='/service/log' component={ServiceLog} />
// <Route exact path='/part' component={PartIndex} />
// <Route path='/parts/add' component={PartAdd} />
// <Route path='/parts/edit/:id' component={PartEdit} />

class main extends React.Component {
  render () {
    return (
      <Router>
        <Provider store={store}>
          <App>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Route path='/map' component={Map}/>
              <Route path='/payment' component={Payment}/>
              <Route path='/history' component={History}/>
              <Route path='/notification' component={Notification}/>
              <Route path='/settings' component={Settings}/>
              <Route path='/invoice' component={Invoice}/>
              <Route path='/mechanic/map' component={MechanicMapContainer}/>
              <Route path='backend/login' component={BackendLogin} />
              <Route exact path='/mechanics' component={MechanicIndex} />
              <Route path='/mechanic/login' component={MechanicLogin} />
              <Route path='/mechanic/add' component={MechanicAdd} />
              <Route path='/mechanic/edit/:id' component={MechanicEdit} />
              <Route path='/mechanic/settings' component={MechanicSettingsContainer} />
              <Route exact path='/service' component={ServiceDetail} />
              <Route path='/service/log' component={ServiceLog} />
              <Route exact path='/part' component={PartIndex} />
              <Route path='/parts/add' component={PartAdd} />
              <Route path='/parts/edit/:id' component={PartEdit} />
            </Switch>
          </App>
        </Provider>
      </Router>
    )
  }
}
export default main
/*   <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="admin" component={RequireAuth(App)}>
          <IndexRoute component={Main}/>

          <Route path="services">
            <IndexRoute component={ServiceDetail} />
            <Route path="log" component={ServiceLog} />
          </Route>

          <Route path="mechanics">
            <IndexRoute component={MechanicIndex} />
            <Route path="add" component={MechanicAdd} />
            <Route path="edit/:id" component={MechanicEdit} />
          </Route>

          <Route path="parts">
            <IndexRoute component={PartIndex} />
            <Route path="add" component={PartAdd}/>
            <Route path="edit/:id" component={PartEdit}/>
          </Route>

          <Route path="garages">
            <IndexRoute component={GarageIndex} />
            <Route path="add" component={GarageAdd}/>
            <Route path="edit/:id" component={GarageEdit}/>
          </Route>

          <Route path="cars">
            <IndexRoute component={CarIndex} />
            <Route path="add" component={CarAdd} />
            <Route path="edit/:id" component={CarEdit} />
          </Route>
        </Route>

        <Route path="mechanic" component={RequireAuthMechanic(App)}>
          <IndexRoute component={DashboardMechanic} />
          <Route path="services">
            <IndexRoute component={ServiceLog} />
            <Route path="add" component={ServiceAdd} />
            <Route path="edit/:id" component={ServiceEdit} />
            <Route path="detail/:id" component={ServiceDetail} />
          </Route>
          <Route path="profile" component={MechanicProfile} />
        </Route>

        <Route path="garage" component={RequireAuthGarage(App)}>
          <IndexRoute component={DashboardGarage} />
          <Route path="mechanics">
            <IndexRoute component={MechanicIndex} />
            <Route path="add" component={MechanicAdd} />
            <Route path="edit/:id" component={MechanicEdit} />
          </Route>
          <Route path="parts">
            <IndexRoute component={PartIndex} />
            <Route path="add" component={PartAdd}/>
            <Route path="edit/:id" component={PartEdit}/>
          </Route>
          <Route path="services">
            <IndexRoute component={ServiceLog} />
            <Route path="edit/:id" component={ServiceEdit} />
            <Route path="detail/:id" component={ServiceDetail} />
          </Route>
          <Route path="profile" component={GarageProfile} />
        </Route>
      </Route>

      <Route path="backend/login" component={BackendLogin} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="map" component={Map} />
    </Router>
  </Provider>,
  */
