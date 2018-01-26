import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import {
    NavLink
} from 'react-router-dom'
import userIcon from './img/userIcon.png'

function getCookie (cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const SidebarContent = (props) => {
  // const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar
  // let user = ''
  let picture = ''
  // let mech = ''
  let mech = getCookie('mechanic')
  let user = getCookie('username')
  let isUserSignedIn = localStorage.getItem('userSignedIn')
  let isMechSignedIn = localStorage.getItem('mechSignedIn')
  let sidebarContent = [
    <span key='sb1' className='userSidebar'>
      <NavLink activeClassName='sbLinkActive' style={ {visibility: 'hidden'} } to='/user' className='sidebarLink2'>{user}</NavLink>
      <img src={picture} className='userIcon' alt=''></img>
    </span>,
    <div key='sb7' className='sidebarDivider' />,
    <NavLink key='sb3' exact activeClassName='sbLinkActive' to='/map' className='sidebarLink'>Map</NavLink>,
    <NavLink key='sb4' activeClassName='sbLinkActive' to='/payment' className='sidebarLink'>Payment</NavLink>,
    <NavLink key='sb5' activeClassName='sbLinkActive' to='/history' className='sidebarLink'>History</NavLink>
    // <NavLink key='sb6' activeClassName='active' to='/notification' className='sidebarLink' >Notification</NavLink>,
    // <div key='sb7' className='sidebarDivider' />,
    // <NavLink key='sb8' activeClassName='sbLinkActive' to='/settings' className='sidebarLink' >Settings</NavLink>,
    // <NavLink key='sb62' className='sidebarLink' activeClassName='sbLinkActive2' to='/'
    //     onClick={ () => {
    //       firebase.auth().signOut().then(function () {
    //         alert('You have signed out.')
    //       }).catch(function () {
    //         alert('Sign out failed.')
    //       })
    //       document.cookie = 'username=; picture=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    //     }}
    //   >Logout</NavLink>
  ]
  if (isUserSignedIn === true || !mech) {       //  User logged in
    sidebarContent = [
      <span key='sb1' className='userSidebar'>
        <NavLink activeClassName='sbLinkActive' style={ {visibility: 'hidden'} } to='/user' className='sidebarLink2'>{user}</NavLink>
        <img src={picture} className='userIcon' alt=''></img>
      </span>,
      <div key='sb7' className='sidebarDivider' />,
      <NavLink key='sb3' id='sidebar-link' exact activeClassName='sbLinkActive' to='/map' className='sidebarLink'>Map</NavLink>,
      <NavLink key='sb4' id='sidebar-link' activeClassName='sbLinkActive' to='/payment' className='sidebarLink'>Payment</NavLink>,
      <NavLink key='sb5' id='sidebar-link' activeClassName='sbLinkActive' to='/history' className='sidebarLink'>History</NavLink>

    ]
  } else if (isMechSignedIn === true || mech) {  // Mechanic logged in
    sidebarContent = [
      <span key='sb1' className='userSidebar'>
        <NavLink activeClassName='sbLinkActive' style={ {visibility: 'hidden'} } to='/user' className='sidebarLink2'>{user}</NavLink>
        <img src={picture} className='userIcon' alt=''></img>
      </span>,
      <div key='sb7' className='sidebarDivider' />,
      <NavLink key='sb3' exact activeClassName='sbLinkActive' to='/mechanic/map' className='sidebarLink'>Map</NavLink>
    ]
  }
  if (user === '') {
    picture = userIcon
  } else {
    user = getCookie('username')
    picture = getCookie('picture')
    mech = getCookie('mechanic')
  }
  return (
    <div className='sidebar_container'>
      <div className='sidebarContent'>
        {sidebarContent}
      </div>
    </div>
  )
}

SidebarContent.propTypes = {
  style: PropTypes.object
}

export default SidebarContent
