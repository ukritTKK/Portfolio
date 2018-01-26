import React, { Component } from 'react'
import { connect } from 'react-redux'

class DashboardGarage extends Component {
  render () {
    return (
      <div className="page-container">
        <div className="col-md-12 m-b-5">
          <h5>123</h5>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGarage)
