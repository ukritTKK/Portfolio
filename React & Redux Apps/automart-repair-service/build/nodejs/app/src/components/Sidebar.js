import React, { Component } from 'react'
import { Link } from 'react-router'
import logo from '../pages/img/automart.png'
import cookie from 'react-cookie'
import {connect} from 'react-redux'
import { logout } from '../actions/Login'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menu: ''
    }
  }
  isMenu (menu) {
    this.setState({menu: menu})
  }
  isActive (value) {
    return (value === this.state.menu) ? 'active' : 'default'
  }
  logingout () {
    this.props.logout()
  }
  render () {
    const logoutstyle = {
      cursor: 'pointer',
      bottom: '0',
      position: 'absolute',
      width: '100%',
      marginBottom: '30px'
    }

    const user = cookie.load('user')
    let session = (user === '3') ? 'admin' : (user === '1') ? 'mechanic' : 'garage'
    if (user === '3') {
      return (
        <div className="page-sidebar" data-pages="sidebar">
          <div id="appMenu" className="sidebar-overlay-slide from-top">
          </div>
          <div className="sidebar-header">
            <img src={logo} alt="logo" className="brand" data-src={logo} data-src-retina={logo} width={130} height={22}/>
            <div className="sidebar-header-controls">
            </div>
          </div>
          <div className="sidebar-menu m-t-30">
            <ul className="menu-items">
              <li className={this.isActive('summary')}>
                <Link to="/admin" onClick={this.isMenu.bind(this, 'summary')}>
                  <span className="title">SUMMARY</span>
                </Link>
                <span className="icon-thumbnail"><i className="pg-grid"></i></span>
              </li>
              <li className={this.isActive('parts')}>
                <Link to={'/' + session + '/parts'} onClick={this.isMenu.bind(this, 'parts')}>
                  <span className="title">PARTS</span>
                </Link>
                {this.props.children}
                <span className="icon-thumbnail"><i className="fa fa-cogs"></i></span>
              </li>
              <li className={this.isActive('mech')}>
                <Link to={'/' + session + '/mechanics'} onClick={this.isMenu.bind(this, 'mech')}>
                  <span className="title">MECHANIC</span>
                </Link>
                <span className="icon-thumbnail"><i className="fa fa-group"></i></span>
              </li>
              <li className={this.isActive('garage')}>
                <Link to={'/' + session + '/garages'} onClick={this.isMenu.bind(this, 'garage')}>
                  <span className="title">GARAGE</span>
                </Link>
                <span className="icon-thumbnail"><i className="fa fa-wrench"></i></span>
              </li>
              <li className={this.isActive('car')}>
                <Link to={'/' + session + '/cars'} onClick={this.isMenu.bind(this, 'car')}>
                  <span className="title">CAR</span>
                </Link>
                <span className="icon-thumbnail"><i className="fa fa-car"></i></span>
              </li>
              <li>
                <Link className="text-center" style={logoutstyle} onClick={(e) => this.logingout(e)}>
                  <span className="title">LOGOUT</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    } else if (user === '2') {
      return (
        <div className="page-sidebar" data-pages="sidebar">
          <div id="appMenu" className="sidebar-overlay-slide from-top">
          </div>
          <div className="sidebar-header">
            <img src={logo} alt="logo" className="brand" data-src={logo} data-src-retina={logo} width={130} height={22}/>
            <div className="sidebar-header-controls">
            </div>
          </div>
          <div className="sidebar-menu m-t-30">
            <ul className="menu-items">
              <li className={this.isActive('service')}>
                <Link to={'/' + session + '/services'} onClick={this.isMenu.bind(this, 'service')}>
                  <span className="title">SERVICE</span>
                </Link>
                <span className="icon-thumbnail"><i className="fa fa-cogs"></i></span>
              </li>
              <li className={this.isActive('mechanic')}>
                <Link to={'/' + session + '/mechanics'} onClick={this.isMenu.bind(this, 'mechanic')}>
                  <span className="title">MECHANIC</span>
                  </Link>
                  <span className="icon-thumbnail"><i className="fa fa-group"></i></span>
                </li>
              <li>
                <Link to={'/' + session + '/parts'} className={this.isActive('part')} onClick={this.isMenu.bind(this, 'part')}>
                  <span className="title">PARTS</span>
                </Link>
                <span className="icon-thumbnail"><i className="fa fa-cogs"></i></span>
              </li>
              <li className={this.isActive('profile')}>
                <Link to={'/' + session + '/profile'} onClick={this.isMenu.bind(this, 'profile')}>
                  <span className="title">PROFILE</span>
                </Link>
                <span className="icon-thumbnail"><i className="pg-grid"></i></span>
              </li>
              <li>
                <Link className="text-center" style={logoutstyle} onClick={(e) => this.logingout(e)}>
                  <span className="title">LOGOUT</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    } else if (user === '1') {
      return (
        <div className="page-sidebar" data-pages="sidebar">
          <div id="appMenu" className="sidebar-overlay-slide from-top">
          </div>
          <div className="sidebar-header">
            <img src={logo} alt="logo" className="brand" data-src={logo} data-src-retina={logo} width={130} height={22}/>
            <div className="sidebar-header-controls">
            </div>
          </div>
          <div className="sidebar-menu m-t-30">
            <ul className="menu-items">
              <li className={this.isActive('parts')}>
                <Link to={'/' + session + '/services'} onClick={this.isMenu.bind(this, 'parts')}>
                  <span className="title">SERVICE</span>
                </Link>
                {this.props.children}
                <span className="icon-thumbnail"><i className="fa fa-cogs"></i></span>
              </li>
              <li className={this.isActive('car')}>
                <Link to={'/' + session + '/profile'} onClick={this.isMenu.bind(this, 'car')}>
                  <span className="title">PROFILE</span>
                </Link>
                <span className="icon-thumbnail"><i className="fa fa-car"></i></span>
              </li>
              <li>
                <Link className="text-center" style={logoutstyle} onClick={(e) => this.logingout(e)}>
                  <span className="title">LOGOUT</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }
}
const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
