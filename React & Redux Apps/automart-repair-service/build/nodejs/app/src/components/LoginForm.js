import React, {Component, PropTypes} from 'react'
import './Form.css'

class LoginForm extends Component {

  render () {
    return (
      <div className="parents">
      <div className="social-login flex">
        <h2 className="full-width text-center m-b-30">SIGN IN</h2>
          <button className="btn-social google">
            <span><i className="fa fa-google-plus"></i></span>
          </button>
          <button className="btn-social facebook m-l-15">
            <span><i className="fa fa-facebook"></i></span>
          </button>
          <div className="full-width text-center m-t-30"><h4>OR</h4></div>
        <form className="form-parent flex" action="#">
          <input type="text" className="form-input" placeholder="Phone number or email" style={{'width': '62%'}}></input>
          <input type="text" className="form-input" placeholder="Password" style={{'width': '62%'}}></input>
        <button type="submit" className="btn-social submit m-t-40" style={{'width': '62%'}}>SIGN IN</button>
        </form>
        </div>
      </div>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.login(this.login.value, this.password.value)
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
