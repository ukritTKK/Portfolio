import React from 'react'
import {Register} from '../components/Register/Register'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {theregis, canregis} from '../actions/inputAction'
import { firebaseregister, firebaselogin } from '../actions/UserAction'

class RegisterContainer extends React.Component {
  render () {
    return (
      <div className='title'>
        <div>
          <Register {...this.props} {...this.state} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    mechanic: state.mechanic
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      theregis, canregis, firebaseregister, firebaselogin
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
