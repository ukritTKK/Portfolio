import { connect } from 'react-redux'
import { ServiceAdd } from '../../components'
import { addService } from '../../actions/service'

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addService: (userid, mechanicid, promotion, car, carmile, caruse, arraypart, arrayrepair, serviceob, price, lat, lng, date, correctprice, token) => {
      dispatch(addService(userid, mechanicid, promotion, car, carmile, caruse, arraypart, arrayrepair, serviceob, price, lat, lng, date, correctprice, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAdd)
