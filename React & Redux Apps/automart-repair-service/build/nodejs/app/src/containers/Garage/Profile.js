import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GarageProfile } from '../../components'
import {
  getGarageProfile,
  editGarageProfile,
  editGarageProfileImage
} from '../../actions/garage'

class GarageProfileContainer extends Component {
  componentWillMount () {
    if (this.props.auth.token) {
      this.props.getGarageProfile(this.props.auth.token)
    }
  }

  render () {
    if (Object.keys(this.props.user.profile).length === 0) return <div />
    return (
      <div>
        <GarageProfile {...this.props} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    auth: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getGarageProfile: (token) => {
      dispatch(getGarageProfile(token))
    },
    editGarageProfile: (formData, token) => {
      dispatch(editGarageProfile(formData, token))
    },
    editGarageProfileImage: (formData, token) => {
      dispatch(editGarageProfileImage(formData, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GarageProfileContainer)
