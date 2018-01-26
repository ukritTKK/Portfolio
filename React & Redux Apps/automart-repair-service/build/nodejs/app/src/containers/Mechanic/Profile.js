import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getProfile,
  editProfile,
  editProfileImage
} from '../../actions/mechanic'

import { MechanicProfile } from '../../components'

class MechanicProfileContainer extends Component {
  componentWillMount () {
    if (this.props.auth.token) {
      this.props.getProfile(this.props.auth.token)
    }
  }

  render () {
    if (Object.keys(this.props.user.profile).length === 0) return <div />
    return (
      <div>
        <MechanicProfile {...this.props} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getProfile: (token) => {
      dispatch(getProfile(token))
    },
    editProfile: (formData, token) => {
      dispatch(editProfile(formData, token))
    },
    editProfileImage: (formData, token) => {
      dispatch(editProfileImage(formData, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MechanicProfileContainer)
