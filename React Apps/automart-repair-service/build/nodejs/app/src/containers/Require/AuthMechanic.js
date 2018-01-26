import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount () {
      const userType = cookie.load('user')
      if (userType !== '1' && !this.props.authenticated === true) {
        this.context.router.push('/backend/login')
      }
    }
    componentWillUpdate (nextProps) {
      if (nextProps.authenticated === false) {
        browserHistory.push('/login')
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps (state) {
    return {
      authenticated: state.auth.authenticated,
      user: state.user
    }
  }

  return connect(mapStateToProps)(Authentication)
}
