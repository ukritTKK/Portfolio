import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  getParts,
  getOncePart,
  deletePart,
  addPartToGarage,
  deletePartToGarage
} from '../../actions/part'

import {
  Search,
  PartItemList
} from '../../components'

class Part extends Component {

  componentWillMount () {
    this.props.getParts(this.props.auth.token, this.props.auth.user)
  }

  componentDidUpdate () {
    this.check()
  }

  check () {
    if (this.props.part.deleted === true) {
      return this.props.getParts(this.props.auth.token, this.props.auth.user)
    }
  }

  render () {
    var itemlist = (this.props.value === '') ? this.props.part.data : this.props.part.parts
    return (
      <div>
        <Search/>
          {
            this.props.auth.user === '3' &&
            <div className="col-md-12 m-b-5">
              <Link to="/admin/parts/add">
                <button className="pull-right btn bg-primary-darker btn-primary m-r-20" type="button">
                  <span><i className="text-white fa fa-plus"></i></span>
                </button>
              </Link>
            </div>
          }
        <PartItemList auth={this.props.auth} getOncePart={this.props.getOncePart} deletePart={this.props.deletePart} parts={itemlist} addPartToGarage={this.props.addPartToGarage} deletePartToGarage={this.props.deletePartToGarage}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    part: state.part,
    value: state.part.value,
    auth: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getParts: (token, userRank) => {
      dispatch(getParts(token, userRank || '3'))
    },
    getOncePart: (id, token, userRank) => {
      dispatch(getOncePart(id, token, userRank || '3'))
    },
    deletePart: (id, token, userRank) => {
      dispatch(deletePart(id, token, userRank || '3'))
    },
    addPartToGarage: (partId, token) => {
      dispatch(addPartToGarage(partId, token))
    },
    deletePartToGarage: (partId, token) => {
      dispatch(deletePartToGarage(partId, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Part)
