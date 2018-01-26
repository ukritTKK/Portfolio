import React from 'react'
import './style.css'
import userIcon from '../UI/Sidebar/img/userIcon.png'

class MechanicSettingsComponent extends React.Component {

  constructor (props) {
    super(props)
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this._handleImageChange = this._handleImageChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit (e) {
    e.preventDefault()
  }
  _handleImageChange (e) {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      this.props.setMechImage(file, reader.result)
    }
    reader.readAsDataURL(file)
    this.props.setImageFileName(file.name)
  }
  handleChange (event) {
    if (event.target.name === 'Firstname') {
      this.props.editMechSettings(
        event.target.value,
        this.props.mset.lastName,
        this.props.mset.email,
        this.props.mset.mobile,
      )
    } else if (event.target.name === 'Lastname') {
      this.props.editMechSettings(
        this.props.mset.firstName,
        event.target.value,
        this.props.mset.email,
        this.props.mset.mobile,
      )
    } else if (event.target.name === 'Email') {
      this.props.editMechSettings(
        this.props.mset.firstName,
        this.props.mset.lastName,
        event.target.value,
        this.props.mset.mobile,
      )
    } else if (event.target.name === 'Mobile') {
      this.props.editMechSettings(
        this.props.mset.firstName,
        this.props.mset.lastName,
        this.props.mset.email,
        event.target.value,
      )
    }
  }

  handlePress (event) {
    event.which = event.which || event.keyCode
    if (event.which === 13) {
      this.props.SubmitMechSettings(
        this.props.mset.firstName,
        this.props.mset.lastName,
        this.props.mset.email,
        this.props.mset.mobile,
      )
    }
  }

  render () {
    let $imagePreview = this.props.mset.imagePreviewUrl
    let picDiv = <img className='pic_thumbnail_div' src={userIcon} role='presentation'/>
    if (this.props.mset.imagePreviewUrl) {
      $imagePreview = (<img style={ {display: 'block'} } className='pic_thumbnail' role='presentation' src={this.props.mset.imagePreviewUrl}/>)
      picDiv = <div className='pic_thumbnail_div'>{$imagePreview}</div>
    } else {
      picDiv = <img className='pic_thumbnail_div' src={userIcon} role='presentation'/>
    }
    return (
      <div id='wrapper'>
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
                <span className='custom_file_name'>{this.props.mset.imageFileName}</span>
              </label>
            </div>
            <div className='col-8 settings_infoDiv'>
              <span className='settings_namebox'>
                <p className='settings_typebox_label'>First name</p>
                <input type='text' name='Firstname' value={this.props.mset.firstName} className='col-12 settings_nametypebox' onChange={this.handleChange} />
              </span>
              <span className='settings_namebox'>
                <p className='settings_typebox_label'>Last name</p>
                <input type='text' name='Lastname' value={this.props.mset.lastName} className='col-12 settings_nametypebox' onChange={this.handleChange} />
              </span>
            </div>
            <div className='col-8 settings_infoDiv'>
              <p className='settings_typebox_label'>Email</p>
              <input type='text' name='Email' value={this.props.mset.email} className='col-12 settings_typebox' onChange={this.handleChange} />
            </div>
            <div className='col-8 settings_infoDiv'>
              <p className='settings_typebox_label'>Mobile</p>
              <input type='number' name='Mobile' value={this.props.mset.mobile} className='col-12 settings_typebox' maxLength='10' onChange={this.handleChange} />
            </div>
            <button className='col-8 saveBtn' onClick={ () => {
              this.props.SubmitMechSettings(this.props.mset.firstName,
              this.props.mset.lastName,
              this.props.mset.email,
              this.props.mset.mobile,
              )
              if (this.props.mset.imagePreviewUrl === '' || this.props.mset.default) {
                this.props.uploadMechImage('')
              } else {
                this.props.uploadMechImage(this.props.mset.imagePreviewUrl)
              }
            } } >Save</button>
          </div>
        </div>
      </div>
    )
  }
}

export default MechanicSettingsComponent
