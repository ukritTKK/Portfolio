import React, {Component} from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import {
  getMechanics,
  getOnceMechanic,
  banMechanic
} from '../../actions/mechanic'

import {
  MechanicItemList,
  Search
} from '../../components'

class Mechanic extends Component {
  componentDidMount () {
    this.props.getMechanics(this.props.auth.token, this.props.auth.user)
  }

  render () {
    var itemlist = (this.props.value === '') ? this.props.mechanic.data : this.props.mechanic.mechanics
    return (
      <div>
        <Search/>
          <div className="col-md-12 m-b-5">
              <button className="pull-right btn bg-primary-darker btn-primary m-r-20" type="button">
                <span><i className="text-white fa fa-plus"></i></span>
              </button>
          </div>
         <MechanicItemList auth={this.props.auth} getMechanics={this.props.getMechanics} getOnceMechanic={this.props.getOnceMechanic} mechanic={itemlist} banMechanic={this.props.banMechanic}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    value: state.mechanic.value,
    mechanic: state.mechanic,
    data: state.mechanic.data,
    auth: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getMechanics: (token, userRank) => {
      dispatch(getMechanics(token, userRank))
    },
    getOnceMechanic: (id, token, userRank) => {
      dispatch(getOnceMechanic(id, token, userRank))
    },
    banMechanic: (id, status, token, userRank) => {
      dispatch(banMechanic(id, status, token, userRank))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mechanic)
