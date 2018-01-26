import React, {Component, PropTypes} from 'react'
import './Form.css'

class RegisterForm extends Component {

  handleSubmit (e) {
    e.preventDefault()
    this.props.postRegister(this.login.value, this.password.value)
  }

  render () {
    return (
      <div className="parents">
      <div className="social-login flex">
        <h2 className="full-width text-center m-b-30">REGISTER</h2>
          <button className="btn-social google">
            <span><i className="fa fa-google-plus"></i></span>
          </button>
          <button className="btn-social facebook m-l-15">
            <span><i className="fa fa-facebook"></i></span>
          </button>
          <div className="full-width text-center m-t-30"><h4>OR</h4></div>
        <form className="form-parent flex" action="#">
          <input type="text" className="form-input m-r-20" placeholder="First Name" style={{'width': '30%'}}></input>
          <input type="text" className="form-input" placeholder="Last Name" style={{'width': '30%'}}></input>
          <input type="text" className="form-input" placeholder="Email" style={{'width': '62%'}}></input>
          <input type="text" className="form-input" placeholder="Mobile Number" style={{'width': '62%'}}></input>
          <input type="text" className="form-input" placeholder="Password" style={{'width': '62%'}}></input>
          <button type="submit" className="btn-social submit m-t-40" style={{'width': '62%'}}>REGISTER</button>
        </form>
        </div>
      </div>
    )
  }
}

RegisterForm.propTypes = {
  postRegister: PropTypes.func.isRequired
}

export default RegisterForm
