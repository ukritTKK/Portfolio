import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  getGarage,
  getOnceGarage,
  deleteGarage
} from '../../actions/garage'

import {
  getMechanics
} from '../../actions/mechanic'

import {
  Search,
  Maps,
  GarageItemList
} from '../../components'

class Garage extends Component {
  componentWillMount () {
    this.props.getGarage(this.props.auth.token)
    this.props.getMechanics(this.props.auth.token, this.props.auth.user)
  }

  componentDidUpdate () {
    this.check()
  }

  check () {
    if (this.props.garage.deleted === true) {
      this.props.getGarage(this.props.auth.token)
    }
  }

  render () {
    var itemlist = (this.props.value === '') ? this.props.garage.data : this.props.garage.garages
    return (
      <div>
        <Search/>
        <div style={{height: '300px'}}>
          { this.props.garage.data.length > 0 ? <Maps garages={this.props.garage.data}/> : '' }
        </div>
          <div className="col-md-12 m-b-5">
          <Link to="/admin/garages/add">
            <button className="pull-right btn bg-primary-darker btn-primary m-r-20 m-t-30" type="button">
              <span><i className="text-white fa fa-plus"></i></span>
            </button>
          </Link>
          </div>
        <GarageItemList auth={this.props.auth} garages={itemlist} mechanic={this.props.mechanic.data} getOnceGarage={this.props.getOnceGarage} deleteGarage={this.props.deleteGarage}/>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    garage: state.garage,
    value: state.garage.value,
    mechanic: state.mechanic,
    auth: state.auth
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getGarage: (token) => {
      dispatch(getGarage(token))
    },
    getMechanics: (token, userRank) => {
      dispatch(getMechanics(token, userRank || '3'))
    },
    getOnceGarage: (id, token) => {
      dispatch(getOnceGarage(id, token))
    },
    deleteGarage: (id, token) => {
      dispatch(deleteGarage(id, token))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Garage)
