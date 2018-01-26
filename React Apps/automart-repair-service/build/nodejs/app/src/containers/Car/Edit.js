import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  editCar,
  editCarImage,
  getOnceCar
} from '../../actions/car'

import {
  CarEdit
} from '../../components'

class CarEditContainer extends Component {

  componentWillMount () {
    this.props.getOnceCar(this.props.params.id, this.props.auth.token)
  }

  render () {
    return (
      typeof this.props.car._id !== 'undefined' ? <CarEdit {...this.props} />
      : <div />
    )
  }

}

function mapStateToProps (state) {
  return {
    auth: state.auth,
    car: state.car.car,
    success: state.car.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editCar: (id, carBrand, carModel, carYear, userid, token) => {
      dispatch(editCar(id, carBrand, carModel, carYear, userid, token))
    },
    editCarImage: (data, token) => {
      dispatch(editCarImage(data, token))
    },
    getOnceCar: (id, token) => {
      dispatch(getOnceCar(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarEditContainer)
