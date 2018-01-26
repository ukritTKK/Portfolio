import React, {Component, PropTypes} from 'react'
import '../Form.css'
import logo from '../../pages/img/automart_black.png'
import { Link } from 'react-router'

class BackendLoginForm extends Component {

  render () {
    return (
      <div className="parent">
        <form action="#" className="col-md-4 child" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="banner">
            <img src={logo} alt="logo" className="brand" data-src={logo} data-src-retina={logo} width={130} height={22}/>
          </div>
        <div className="form-group form-group-default">
          <label>Username</label>
          <input type="text" className="form-control" ref={node => { this.login = node }} autoFocus required />
        </div>
        <div className="form-group form-group-default">
          <label>Password</label>
          <input type="password" className="form-control" ref={node => { this.password = node }} required />
        </div>
        <button type="submit" className="btn btn-success full-width">Login</button>
        <label className="regis p-t-5 pull-left text-red shake">{this.props.user.error}</label>
        <label className="regis p-t-5 pull-right"><Link to="register">Register?</Link></label>
        </form>
      </div>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.login(this.login.value, this.password.value)
  }
}

BackendLoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default BackendLoginForm
