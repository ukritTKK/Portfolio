import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ServiceLog, Search } from '../../components'
import { getService, getOnceServiceId, getOnceService } from '../../actions/service'

class ServiceLogContainer extends Component {

  componentDidMount () {
    this.props.getService(this.props.auth.token, this.props.auth.user)
  }

  render () {
    var itemlist = (this.props.value === '') ? this.props.service.data : this.props.service.services
    return (
      <div>
        <Search/>
        <ServiceLog service={itemlist} getOnceServiceId={this.props.getOnceServiceId} getOnceService={this.props.getOnceService}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    service: state.service,
    value: state.service.value,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getService: (token, userRank) => {
      dispatch(getService(token, userRank || '3'))
    },
    getOnceServiceId: (token, userRank) => {
      dispatch(getOnceServiceId(token, userRank || '3'))
    },
    getOnceService: (token, userRank) => {
      dispatch(getOnceService(token, userRank || '3'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceLogContainer)
