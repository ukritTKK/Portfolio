import React from 'react'
import { Login } from '../../components/Mechanic/Login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { thelogin } from '../../actions/inputAction'
import { mechanicLogin, mechanicAcceptCall } from '../../actions/mechanic'
// import {
//   LoginForm
// } from '../components'
export class LoginContainer extends React.Component {

  render () {
    return (
      <div>
        <Login {...this.props} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    mech: state.mechanic
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      thelogin, mechanicLogin, mechanicAcceptCall
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

