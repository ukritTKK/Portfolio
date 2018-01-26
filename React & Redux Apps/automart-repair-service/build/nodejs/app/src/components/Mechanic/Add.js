// import React, { Component } from 'react'
// import { browserHistory } from 'react-router'
// import Preview from '../Preview'

// class MechanicAdd extends Component {

//   componentDidMount () {
//     let $ = window.jQuery
//     $('#inputGarageID').typeahead({
//       local: ['Amsterdam', 'Sysney']
//     })
//   }
//   componentDidUpdate () {
//     if (this.props.success) {
//       if (this.props.auth.user === '2') browserHistory.push('/garage/mechanics')
//       else browserHistory.push('/admin/mechanics')
//     }
//   }

//   render () {
//     return (
//       <div className="parent" style={{'height': '100%', 'paddingTop': '2%'}}>
//         <form className="col-md-4 child" onSubmit={(e) => this.handleSubmit(e)}>
//           {
//             this.props.auth.user === '3' &&
//             <div className="form-group form-group-default" style={{overflow: 'visible'}}>
//               <label>GarageId</label>
//               <input id="inputGarageID" data-provide="typeahead" type="text" className="form-control" ref={node => { this.garageid = node }} autoFocus required/>
//             </div>
//           }
//           <div className="form-group form-group-default">
//             <label>Name</label>
//             <input type="text" className="form-control" ref={node => { this.name = node }} required/>
//           </div>
//           <div className="form-group form-group-default">
//             <label>Tel</label>
//             <input type="text" className="form-control" ref={node => { this.tel = node }} required/>
//           </div>
//           <img alt="" id="preview" src="http://fairwayshutters.com/wp-content/themes/dotcomlabs/skins/images/preview.png" draggable="false" width={450} height={200} />
//           <Preview/>
//           <div className="form-group form-group-default">
//             <label>Rating</label>
//             <input type="text" className="form-control" ref={node => { this.rating = node }} required/>
//           </div>
//           <div className="form-group form-group-default">
//             <label>Email</label>
//             <input type="text" className="form-control" ref={node => { this.username = node }} required/>
//           </div>
//           <div className="form-group form-group-default">
//             <label>Password</label>
//             <input type="password" className="form-control" ref={node => { this.password = node }} required/>
//           </div>
//           <button type="submit" className="btn btn-success full-width">Add Mechanic</button>
//         </form>
//       </div>
//     )
//   }
//   handleSubmit (e) {
//     e.preventDefault()
//     var formData = new FormData()
//     if (this.props.auth.user === '3') formData.append('garage_id', this.garageid.value)
//     formData.append('name', this.name.value)
//     formData.append('tel', this.tel.value)
//     var image = document.getElementById('photo')
//     var file = image.files[0]
//     formData.append('file', file)
//     formData.append('rating', this.rating.value)
//     formData.append('username', this.username.value)
//     formData.append('password', this.password.value)
//     this.props.addMechanic(formData, this.props.auth.token, this.props.auth.user)
//   }
// }

// export default MechanicAdd

import React from 'react'
import {NavLink} from 'react-router-dom'

export class Mechanic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      repassword: '',
      mobile: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }
  handleChange (event) {
    if (event.target.name === 'User') {
      this.props.theregis(
        event.target.value,
        this.props.user.password,
        this.props.user.repassword,
        this.props.user.mobile
        )
    } else if (event.target.name === 'Pass') {
      this.props.theregis(
        this.props.user.username,
        event.target.value,
        this.props.user.repassword,
        this.props.user.mobile
        )
    } else if (event.target.name === 'REPass') {
      this.props.theregis(
        this.props.user.username,
        this.props.user.password,
        event.target.value,
        this.props.user.mobile
        )
    } else if (event.target.name === 'Mobile') {
      this.props.theregis(
        this.props.user.username,
        this.props.user.password,
        this.props.user.repassword,
        event.target.value,
        )
    }
  }

  handlePress (event) {
    event.which = event.which || event.keyCode
    if (event.which === 13) {
      this.props.mechanicRegister(this.props.user.username, this.props.user.password, this.props.user.repassword, this.props.user.mobile)
    }
  }

  render () {
    return (
      <div id='wrapper'>
        <div className='col-4'></div>
        <div className='col-4 sign_up_content'>
          <p className='signup_headerText'>Sign Up</p>
          {/* <form action='' id='uesr_login_form'>
            <input type='text' placeholder='E-mail or username' className='typebox' name='User' onChange={this.handleChange}/>
            <input type='password' placeholder='Password' className='typebox'name='Pass' onChange={this.handleChange}/>
            <input type='password' placeholder='Re-enter password' className='typebox'name='REPass' onChange={this.handleChange}/>
          </form> */}
          <div style={ {marginTop: '24px'} }>
            <input type="text" className="form-input" placeholder="Email" style={{'width': '100%'}} name='User' onChange={this.handleChange}/>
            <input type="password" className="form-input" placeholder="Password" style={{'width': '100%'}} name='Pass' onChange={this.handleChange}/>
            <input type="password" className="form-input" placeholder="Re enter password" style={{'width': '100%'}} name='REPass' onChange={this.handleChange}/>
            <input type="text" className="form-input" placeholder="Mobile number" style={{'width': '100%'}} name='Mobile' onChange={this.handleChange}/>
          </div>
          <button className='col-12 signupBtn' onClick={ () => { this.props.mechanicRegister(this.props.user.username, this.props.user.password, this.props.user.repassword, this.props.user.mobile) } }><span className='signup--text'>Sign Up</span></button>
          <p className='col-12 signUpDivider'/>
          <div className='col-12'><p className='guideText'>Already have an account? <span><NavLink key='10' activeClassName='active' to='/login' id='signUpLink'>Log In</NavLink></span></p></div>
        </div>
        <div className='col-4'></div>
      </div>
    )
  }
}
