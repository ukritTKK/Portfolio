import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ServiceEdit } from '../../components'
import { getOnceService } from '../../actions/service'

class ServiceEditContainer extends Component {
  componentWillMount () {
    // this.props.getOnceService(this.props.params.id)
  }
  render () {
    return (
      <ServiceEdit {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    parts: state.parts,
    service: state.service.service_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOnceService: (id) => {
      dispatch(getOnceService(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEditContainer)
