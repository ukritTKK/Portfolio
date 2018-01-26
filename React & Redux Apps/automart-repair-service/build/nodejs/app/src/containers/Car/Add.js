import { connect } from 'react-redux'
import { addCar } from '../../actions/car'
import {
  CarAdd
} from '../../components'

function mapStateToProps (state) {
  return {
    auth: state.auth,
    success: state.car.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCar: (formData, token) => {
      dispatch(addCar(formData, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarAdd)
