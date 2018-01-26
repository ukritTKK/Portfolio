import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Service
} from '../../components'
import {
  getServiceById
} from '../../actions/service'

class ServiceDetailContainer extends Component {
  componentDidMount () {
    this.props.getServiceById(this.props.params.id, this.props.auth.token, this.props.auth.user)
  }
  render () {
    let { service } = this.props.service
    // if (typeof service._id === 'undefined') {
    //   return <div />
    // }
    return (
      <div>
        <Service service={service} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
    service: state.service,
    garages: state.garages
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getServiceById: (serviceId, token, userType) => {
      dispatch(getServiceById(serviceId, token, userType))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailContainer)
