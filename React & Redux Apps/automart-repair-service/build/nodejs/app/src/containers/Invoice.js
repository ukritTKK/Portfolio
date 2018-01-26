import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Invoice from '../components/Invoice/Invoice'

export class InvoiceContainer extends React.Component {

  render () {
    return (
      <Invoice />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer)
