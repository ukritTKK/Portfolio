import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Preview from '../Preview'

class MechanicEdit extends Component {
  componentDidMount () {
    let $ = window.jQuery
    $('#inputGarageID').tagsinput({
      typeahead: {
        source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
      }
    })
  }
  componentDidUpdate () {
    if (this.props.success) {
      if (this.props.auth.user === '3') browserHistory.push('/admin/mechanics')
      else browserHistory.push('/garage/mechanics')
    }
  }

  render () {
    return (
      <div className="parent" style={{'height': '100%', 'paddingTop': '2%'}}>
        <form action="#" className="col-md-4 child" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group form-group-default" style={{overflow: 'visible'}}>
            <label>GarageId</label>
            <input id="inputGarageID" type="text" className="form-control" defaultValue={this.props.mechanic.garage_id._id} ref={node => { this.garageid = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Name</label>
            <input type="text" className="form-control" defaultValue={this.props.mechanic.name} ref={node => { this.name = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Tel</label>
            <input type="text" className="form-control" defaultValue={this.props.mechanic.tel} ref={node => { this.tel = node }} required/>
          </div>
          <img alt="" id="preview" src={this.props.mechanic.image_url || 'http://fairwayshutters.com/wp-content/themes/dotcomlabs/skins/images/preview.png'} draggable="false" width={450} height={200} />
          <Preview/>
          <div className="form-group form-group-default">
            <label>Rating</label>
            <input type="text" className="form-control" defaultValue={this.props.mechanic.rating} ref={node => { this.rating = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Email</label>
            <input type="text" className="form-control" defaultValue={this.props.mechanic.user_id.username} disabled/>
          </div>
          <button type="submit" className="btn btn-success full-width">Edit Mechanic</button>
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
    formData.append('id', this.props.mechanic._id)
    if (file) {
      this.props.editMechanicImage(formData, this.props.auth.token)
    }
    this.props.editMechanic(
      this.props.mechanic._id,
      this.garageid.value,
      this.name.value,
      this.tel.value,
      this.rating.value,
      this.props.auth.token,
      this.props.auth.user
    )
  }
}

export default MechanicEdit
