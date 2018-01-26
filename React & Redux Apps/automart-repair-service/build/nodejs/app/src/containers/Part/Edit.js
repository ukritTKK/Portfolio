import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  editPart,
  editPartImage,
  getOncePart
} from '../../actions/part'

import {
  PartEdit
} from '../../components'

class PartEditContainer extends Component {
  componentWillMount () {
    this.props.getOncePart(this.props.params.id, this.props.auth.token)
  }

  render () {
    return (
      typeof this.props.part._id !== 'undefined' ? <PartEdit {...this.props} />
      : <div />
    )
  }

}

function mapStateToProps (state) {
  return {
    part: state.part.part,
    auth: state.auth,
    success: state.part.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editPart: (id, partnumber, name, price, amount, token) => {
      dispatch(editPart(id, partnumber, name, price, amount, token))
    },
    editPartImage: (formData, token) => {
      dispatch(editPartImage(formData, token))
    },
    getOncePart: (id, token) => {
      dispatch(getOncePart(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartEditContainer)
