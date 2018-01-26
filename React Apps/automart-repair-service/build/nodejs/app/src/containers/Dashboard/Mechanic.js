import React, { Component } from 'react'
import { connect } from 'react-redux'

class DashboardMechanic extends Component {
  render () {
    return (
      <div>
      <h5>123</h5>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMechanic)
