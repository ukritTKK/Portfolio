import React from 'react'
import './style.css'
import userIcon from '../UI/Sidebar/img/userIcon.png'
let imageFileName = 'No image chosen'
class Settings extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      file: '',
      imagePreviewUrl: '',
      text: '',
      default: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this._handleImageChange = this._handleImageChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit (e) {
    e.preventDefault()
    // TODO: do something with -> this.state.file
  }
  _handleImageChange (e) {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      this.props.setimage(file, reader.result)
    }
    reader.readAsDataURL(file)
    imageFileName = file.name
  }

  checkNumeric (input) {
    let charCode = input.charCodeAt(0)
    if (charCode < 48 || charCode > 57) {
      return false
    }
    return true
  }

  handleChange (event) {
    if (event.target.name === 'Firstname') {
      this.props.thesettings(
        event.target.value,
        this.props.uset.lastname,
        this.props.uset.email,
        this.props.uset.mobile,
      )
    } else if (event.target.name === 'Lastname') {
      this.props.thesettings(
        this.props.uset.firstname,
        event.target.value,
        this.props.uset.email,
        this.props.uset.mobile,
      )
    } else if (event.target.name === 'Email') {
      this.props.thesettings(
        this.props.uset.firstname,
        this.props.uset.lastname,
        event.target.value,
        this.props.uset.mobile,
      )
    } else if (event.target.name === 'Mobile') {
      let length = event.target.value.length
      let isNumeric = this.checkNumeric(event.target.value.substr(length - 1, length))
      if (isNumeric) {
        this.props.thesettings(
          this.props.uset.firstname,
          this.props.uset.lastname,
          this.props.uset.email,
          event.target.value,
        )
      } else {
        event.target.value = event.target.value.substr(0, length - 1)
      }
    }
  }

  handlePress (event) {
    event.which = event.which || event.keyCode
    if (event.which === 13) {
      this.props.settings(
        this.props.uset.firstname,
        this.props.uset.lastname,
        this.props.uset.email,
        this.props.uset.mobile,
      )
    }
  }

  render () {
    const show = {display: 'block'}
    const notShow = {display: 'none'}
    let $imagePreview = this.props.uset.imagePreviewUrl
    let picDiv = <div className='pic_thumbnail_div' style={notShow}></div>
    if (this.props.uset.imagePreviewUrl) {
      $imagePreview = (<img style={show} className='pic_thumbnail' role='presentation' src={this.props.uset.imagePreviewUrl}/>)
      picDiv = <div className='pic_thumbnail_div'>{$imagePreview}</div>
    } else {
      picDiv = <img className='pic_thumbnail_div' src={userIcon} role='presentation'/>
    }
    return (
      <div id='wrapper'>
        <div className='col-2'></div>
        <div className='col-8 settings_content'>
          <p className='settings_headerText'>Settings</p>
          <p className='col-12 settings_divLabel'>Edit your profile</p>
          <div className='col-12 settings_div'>
            <div className='col-8 settings_infoDiv'>
              <p className='settings_typebox_label'>Avatar</p>
              <span>{picDiv}</span>
              <label className='col-6 custom_file_upload'>
                <input type='file' id='input' onChange={this._handleImageChange} onSubmit={this._handleSubmit}/>
                <span className='custom_upload_btn'>Browse</span>
                <span className='custom_file_name'>{imageFileName}</span>
              </label>
            </div>
            <div className='col-8 settings_infoDiv'>
              <span className='settings_namebox'>
                <p className='settings_typebox_label'>First name</p>
                <input type='text' name='Firstname' value={this.props.uset.firstname} className='col-12 settings_nametypebox' onChange={this.handleChange} />
              </span>
              <span className='settings_namebox'>
                <p className='settings_typebox_label'>Last name</p>
                <input type='text' name='Lastname' value={this.props.uset.lastname} className='col-12 settings_nametypebox' onChange={this.handleChange} />
              </span>
            </div>
            <div className='col-8 settings_infoDiv'>
              <p className='settings_typebox_label'>Email</p>
              <input type='text' name='Email' value={this.props.uset.email} className='col-12 settings_typebox' onChange={this.handleChange} />
            </div>
            <div className='col-8 settings_infoDiv'>
              <p className='settings_typebox_label'>Mobile</p>
            <input type='text' name='Mobile' value={this.props.uset.mobile} className='col-12 settings_typebox' maxLength='10' onChange={this.handleChange}/>
            </div>
            <button className='col-8 saveBtn' onClick={ () => {
              this.props.settings(this.props.uset.firstname,
              this.props.uset.lastname,
              this.props.uset.email,
              this.props.uset.mobile,
              )
              if (this.props.uset.imagePreviewUrl === '' || this.props.uset.default) {
                this.props.sendsettings('')
              } else {
                this.props.sendsettings(this.props.uset.imagePreviewUrl)
              }
            } } >Save</button>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
    )
  }
}

export default Settings
