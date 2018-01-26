import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  Search,
  CarItemList
} from '../../components'

import {
  getCars,
  getOnceCar,
  deleteCar
} from '../../actions/car'

class Car extends Component {
  componentWillMount () {
    this.props.getCars(this.props.auth.token)
  }

  componentDidUpdate () {
    this.check()
  }

  check () {
    if (this.props.cars.deleted === true) {
      this.props.getCars(this.props.auth.token)
    }
  }

  render () {
    var itemlist = (this.props.value === '') ? this.props.cars.data : this.props.cars.cars
    return (
      <div>
        <Search/>
        <div className="col-md-12 m-b-5">
          <Link to="/admin/cars/add">
            <button className="pull-right btn bg-primary-darker btn-primary m-r-20" type="button">
              <span><i className="text-white fa fa-plus"></i></span>
            </button>
          </Link>
        </div>
        <CarItemList auth={this.props.auth} getOnceCar={this.props.getOnceCar} deleteCar={this.props.deleteCar} cars={itemlist}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
    cars: state.car,
    value: state.car.value
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCars: (token) => {
      dispatch(getCars(token))
    },
    getOnceCar: (id, token) => {
      dispatch(getOnceCar(id, token))
    },
    deleteCar: (id, token) => {
      dispatch(deleteCar(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Car)
