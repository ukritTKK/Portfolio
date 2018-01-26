import { connect } from 'react-redux'
import { addGarage } from '../../actions/garage'
import {
  GarageAdd
} from '../../components'

function mapStateToProps (state) {
  return {
    auth: state.auth,
    success: state.garage.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addGarage: (data, token) => {
      dispatch(addGarage(data, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GarageAdd)
