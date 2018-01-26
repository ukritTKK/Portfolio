import React from 'react'
import '../app.css'
import { NavLink } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import PropTypes from 'prop-types'
import '../stores/stores'

import SidebarContent from './UI/Sidebar/sidebar-content'
import TitlePanel from './UI/Title_Panel/title-panel'
// import menuIcon from './Map/img/menuIcon.png'
import menuIcon from './Map/img/menuIcon.webp'
import brandLogo from './UI/Title_Panel/img/automart.png'
// import downArrow from './UI/Title_Panel/img/down_arrow.png'
import loginButton from './UI/Title_Panel/img/login_button.png'
import signupButton from './UI/Title_Panel/img/signup_button.png'
// import userIcon from './UI/Sidebar/img/userIcon.png'

//  User FAB
import cancelMechanicImg from './Map/img/cancel.png'
import findLocationImg from './Map/img/adjust_location.png'
import viewQuotImg from './Map/img/find.png'

// Mech FAB
import createQuotImg from './Mechanic/img/add.png'
import editQuotImg from './Mechanic/img/edit.png'

class AppComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30
    }

    this.onSetOpen = this.onSetOpen.bind(this)
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleUserResetPosClick = this.handleUserResetPosClick.bind(this)
    this.handleUserCancelClick = this.handleUserCancelClick.bind(this)
    this.handleUserViewQuotClick = this.handleUserViewQuotClick.bind(this)
    this.handleMechResetPosClick = this.handleMechResetPosClick.bind(this)
    this.handleMechCreateQuotClick = this.handleMechCreateQuotClick.bind(this)
    this.handleMechEditQuotClick = this.handleMechEditQuotClick.bind(this)
    this.handleChildClick = this.handleChildClick.bind(this)
    this.handleDropdownClick = this.handleDropdownClick.bind(this)
  }

  handleUserResetPosClick () {
    this.props.onUserResetPosClick()
    // this.props.onRelocatePosClick()
  }
  handleMechResetPosClick () {
    // this.props.onMechResetPosClick()
    this.props.onRelocatePosClick()
  }

  handleUserCancelClick () {
    this.props.onUserCancelClick()
  }

  handleUserViewQuotClick () {
    this.props.onUserViewQuotClick()
  }

  handleMechCreateQuotClick () {
    this.props.onMechCreateQuotClick()
  }

  handleMechEditQuotClick () {
    this.props.onMechEditQuotClick()
  }

  handleChildClick (event) {
    this.props.onChildClick(event)
  }

  handleDropdownClick (event) {
    this.props.onDropdownClick(event)
  }

  onSetOpen (open) {
    this.setState({open: open})
  }

  handleMenuButtonClick (ev) {
    ev.preventDefault()
    this.onSetOpen(!this.state.open)
  }
  handleLogoutClick (ev) {
    ev.preventDefault()
    this.props.onLogoutClick()
  }

  getCookie (name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    } else return ''
  }

  checkUserType () {
    let that = this
    let isMechanic = this.getCookie('mechanic')
    let user = this.getCookie('username')
    let isUserSignedIn = localStorage.getItem('userSignedIn')
    let isMechSignedIn = localStorage.getItem('mechSignedIn')

    // if (user === '' && !isMechanic) {

    // } else if (isUserSignedIn && !isMechanic && window.location.pathname !== '/map') {
    //   // that.props.setUserStatus('')
    // } else if (isMechSignedIn && isMechanic) {

    // }

    let logOutBtn =
      <NavLink key='6' to='/login' onClick={this.handleLogoutClick}>
        Logout
      </NavLink>

    let automartLogo =
      <NavLink key='5' id='brandLink' to='/mechanic/login'>
        <img className='brandLogo2' src={brandLogo} alt=''/>
      </NavLink>

    let menu =
      <img src={menuIcon} onClick={this.handleMenuButtonClick} className='menuIcon' alt=''/>

    let headerContent
    if (user === '' && !isMechanic) {                          //  NO USERS LOGGED IN
      console.log('NOBODY LOGGED IN')
      if (window.location.pathname === '/login') {
        headerContent = (
          <div className='header_wrapper'>
            <div>
              {automartLogo}
            </div>
            <div>
              <NavLink key='6' activeClassName='active' to='/register'>
                {/* <button className='signupBtnCircle'>
                  <img className='signupBtnCircleImg' src={signupButton} role='presentation'/>
                </button> */}
                <button
                  className='fab-position mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect'
                >
                  <img src={signupButton} alt=''/>
                </button>
              </NavLink>
            </div>
          </div>
        )
      } else if (window.location.pathname === '/mechanic/login') {
        headerContent = (
          <div className='header_wrapper'>
            <div>
              {automartLogo}
            </div>
          </div>
        )
      } else if (window.location.pathname === '/register') {
        headerContent = (
          <div className='header_wrapper'>
            <div>
              {automartLogo}
            </div>
            <div>
              <NavLink key='7' activeClassName='active' to='/login'>
                {/* <button className='loginBtnCircle'>
                  <img className='loginBtnCircleImg' src={loginButton} role='presentation'/>
                </button> */}
                <button
                  className='fab-position mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect'
                >
                  <img src={loginButton} alt=''/>
                </button>
              </NavLink>
            </div>
          </div>
        )
      }
    } else if (isUserSignedIn && !isMechanic) {      //  USER LOGGED IN
      let picture = ''
      picture = this.getCookie('picture')
      // console.log('user picture: ' + picture)
      // console.log('USER SIGNED IN')
      let fabButton
      if (localStorage.getItem('mechanicID') === 'undefined' &&
          window.location.pathname === '/map') {
        fabButton =
          <button
            className='fab-position mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect'
            onClick={this.handleUserResetPosClick}>
            <img src={findLocationImg} alt='' className='material-icon-position'/>
          </button>
      } else if (localStorage.getItem('mechanicID') !== 'undefined' &&
                  window.location.pathname === '/map' && !this.props.header.isOfferedQuot) {
        fabButton =
          <button
            className='fab-position mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect'
            onClick={this.handleUserCancelClick}>
            <img src={cancelMechanicImg} alt='' className='material-icon-position'/>
          </button>
      } else if (localStorage.getItem('mechanicID') !== 'undefined' &&
                  window.location.pathname === '/map' && this.props.header.isOfferedQuot) {
        fabButton =
          <button
            className='fab-position mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect'
            onClick={this.handleUserViewQuotClick}>
            <img src={viewQuotImg} alt='' className='material-icon-position'/>
          </button>
      }

      // ================  Convert String to JSX DOM object ===================
      // let doc = '<button>This button</button>'
      // let JsDOMObj = <div dangerouslySetInnerHTML={{__html: doc}}></div>

      headerContent = (
        <div>
          <div style={ {position: 'relative'} }>
            <span>
              {/* { !this.state.docked &&
                <img src={menuIcon} onClick={this.handleMenuButtonClick}
                  className='menuIcon' alt=''/>
              } */}
              {menu}
            </span>
            <span className='dropdown' id='dropdown'
              onClick={(event) => { this.handleDropdownClick(event) }}>
              <img src={picture} className='titleUserIcon' alt=''/>
              <div className='dropdown-content' id='dropdown-content'>
                <NavLink key='7' activeClassName='active' to='/user'>My account</NavLink>
                <NavLink key='4' activeClassName='dropdownActive' to='/settings'>Setting</NavLink>
                {logOutBtn}
              </div>
            </span>
          </div>
          <div>
            <NavLink key='5' id='brandLink' to='/mechanic/login'>
              <img className='brandLogo' src={brandLogo} alt=''/>
            </NavLink>
          </div>
          <div className='userStatusText'>
            {that.props.header.userStatus}
          </div>
          <div className='belowUserStatusText'>
            {/* Text */}
          </div>
          {fabButton}
        </div>
      )
    } else if (isMechSignedIn && isMechanic) {                //  MECHANIC LOGGED IN
      let picture = ''
      picture = this.getCookie('picture')
      // console.log('MECH SIGNED IN')
      // console.log('LOCAL: ' + localStorage.getItem('mechanicID'))
      // console.log('ID: ' + this.props.header.CallerID)
      logOutBtn =
        <NavLink key='9' to='/mechanic/login' onClick={this.handleLogoutClick}>Logout</NavLink>
      let fabButton
      if (window.location.pathname === '/mechanic/map' && this.props.header.CallerID === '') {
        fabButton =
          <button
            className='fab-position mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect'
            onClick={this.handleMechResetPosClick}>
            <img src={findLocationImg} alt='' className='material-icon-position'/>
          </button>
      } else if (localStorage.getItem('mechanicID') !== 'undefined' &&
                  window.location.pathname === '/mechanic/map' && this.props.header.CallerID !== '' &&
                  !this.props.header.isOfferedQuot) {
        fabButton =
          <button
            className='fab-position mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect'
            onClick={this.handleMechCreateQuotClick}>
            <img src={createQuotImg} alt=''/>
          </button>
      } else if (localStorage.getItem('mechanicID') !== 'undefined' &&
                  window.location.pathname === '/mechanic/map' && this.props.header.CallerID !== '' &&
                  this.props.header.isOfferedQuot) {
        fabButton =
          <button
            className='fab-position mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect'
            onClick={this.handleMechEditQuotClick}>
            <img src={editQuotImg} alt=''/>
          </button>
      }

      headerContent = (
        <div>
          <div style={ {position: 'relative'} }>
            <span>
              {menu}
            </span>
            <span className='dropdown' id='dropdown'
              onClick={(event) => { this.handleDropdownClick(event) }}>
              <img src={picture} className='titleUserIcon' alt=''/>
              <div className='dropdown-content' id='dropdown-content'>
                <NavLink key='7' activeClassName='active' to='/user'>My account</NavLink>
                <NavLink key='4' activeClassName='dropdownActive' to='/mechanic/settings'>Setting</NavLink>
                {logOutBtn}
              </div>
            </span>
          </div>
          <div>
            <NavLink key='5' id='brandLink' to='/mechanic/login'>
              <img className='brandLogo' src={brandLogo} alt=''/>
            </NavLink>
          </div>
          {fabButton}
        </div>
      )
    }
    return headerContent
  }

  render () {
    let sidebarProps = {
      ...this.props.sidebarProps,
      sidebar: <SidebarContent/>,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen
    }

    return (
      <Sidebar className='Sidebar' {...sidebarProps}>
        <TitlePanel title={this.checkUserType()}/>
        <div className='appChildren' onClick={(event) => { this.handleChildClick(event) }}>
          {this.props.children}
        </div>
      </Sidebar>
    )
  }
}

AppComponent.propTypes = {
  style: PropTypes.object
}

export default AppComponent
