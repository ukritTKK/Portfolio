import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  editMechanic,
  editMechanicImage,
  getOnceMechanic
} from '../../actions/mechanic'

import {
  MechanicEdit
} from '../../components'

class MechanicEditContainer extends Component {

  componentWillMount () {
    this.props.getOnceMechanic(this.props.params.id, this.props.auth.token, this.props.auth.user)
  }

  render () {
    return (
      typeof this.props.mechanic._id !== 'undefined' ? <MechanicEdit {...this.props} />
      : <div />
    )
  }

}

function mapStateToProps (state) {
  return {
    mechanic: state.mechanic.mechanic,
    auth: state.auth,
    success: state.mechanic.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editMechanic: (id, garageid, name, tel, rating, serviceAmount, token, userRank) => {
      dispatch(editMechanic(id, garageid, name, tel, rating, serviceAmount, token, userRank))
    },
    editMechanicImage: (formData, token) => {
      dispatch(editMechanicImage(formData, token))
    },
    getOnceMechanic: (id, token, userRank) => {
      dispatch(getOnceMechanic(id, token, userRank))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MechanicEditContainer)
