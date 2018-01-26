import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  editGarage,
  editGarageImage,
  getOnceGarage
} from '../../actions/garage'

import {
  GarageEdit
} from '../../components'

class GarageEditContainer extends Component {

  componentWillMount () {
    this.props.getOnceGarage(this.props.params.id, this.props.auth.token)
  }

  render () {
    return (
      typeof this.props.garage._id !== 'undefined' ? <GarageEdit {...this.props} />
      : <div />
    )
  }

}

function mapStateToProps (state) {
  return {
    garage: state.garage.garage,
    auth: state.auth,
    success: state.garage.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editGarage: (id, name, tel, rating, address, lat, lng, mechniclist, partlist, token) => {
      dispatch(editGarage(id, name, tel, rating, address, lat, lng, mechniclist, partlist, token))
    },
    editGarageImage: (data, token) => {
      dispatch(editGarageImage(data, token))
    },
    getOnceGarage: (id, token) => {
      dispatch(getOnceGarage(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GarageEditContainer)
