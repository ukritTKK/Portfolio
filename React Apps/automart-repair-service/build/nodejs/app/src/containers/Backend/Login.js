import { connect } from 'react-redux'
import {login} from '../../actions/Login'
import {
  BackendLogin
} from '../../components'

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: (id, pass) => {
      dispatch(login(id, pass))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackendLogin)
