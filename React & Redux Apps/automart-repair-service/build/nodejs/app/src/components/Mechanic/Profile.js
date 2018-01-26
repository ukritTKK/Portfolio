import React, { Component } from 'react'
import Preview from '../Preview'

class MechanicProfile extends Component {
  render () {
    let { profile } = this.props.user
    return (
      <div className="parent" style={{'height': '100%', 'paddingTop': '2%'}}>
        <form action="#" className="col-md-4 child" onSubmit={(e) => this.handleSubmit(e)}>
          <img alt="" id="preview" src={profile.image_url || 'http://fairwayshutters.com/wp-content/themes/dotcomlabs/skins/images/preview.png'} draggable="false" width={450} height={200} />
          <Preview/>
          <div className="form-group form-group-default">
            <label>Name</label>
            <input type="text" className="form-control" ref={node => { this.name = node }} autoFocus required defaultValue={profile.name}/>
          </div>
          <div className="form-group form-group-default">
            <label>Tel</label>
              <input type="text" className="form-control" ref={node => { this.tel = node }} defaultValue={profile.tel} />
          </div>
          <div className="form-group form-group-default">
            <label>Garage</label>
            <input type="text" className="form-control" ref={node => { this.garage = node }} required defaultValue={profile.garage_id._id}/>
          </div>
          <button type="submit" className="btn btn-success full-width">EDIT PROFILE</button>
        </form>
      </div>
    )
  }
  handleSubmit (e) {
    e.preventDefault()
    var formData = new FormData()
    var image = document.getElementById('photo')
    var file = image.files[0]
    formData.append('file', file)
    if (file) {
      this.props.editProfileImage(formData, this.props.auth.token)
    }
    this.props.editProfile({
      name: this.name.value,
      tel: this.tel.value,
      garage_id: this.garage.value
    }, this.props.auth.token)
  }
}

export default MechanicProfile
