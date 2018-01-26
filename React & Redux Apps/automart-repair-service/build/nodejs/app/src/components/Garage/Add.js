import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import Preview from '../Preview'

class GarageAdd extends Component {

  componentDidMount () {
    let $ = window.jQuery
    $('#tagsinputMec').tagsinput({
      typeahead: {
        source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
      },
      freeInput: true
    })
    $('#tagsinputPart').tagsinput({
      typeahead: {
        source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
      }
    })
  }

  componentDidUpdate () {
    if (this.props.success) {
      browserHistory.push('/admin/garages')
    }
  }

  render () {
    return (
      <div className="parent" style={{'height': '100%', 'paddingTop': '2%', 'paddingBottom': '2%'}}>
        <form action="#" className="col-md-4 child" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group form-group-default">
            <label>Name</label>
            <input type="text" className="form-control" ref={node => { this.name = node }} autoFocus required/>
          </div>
          <div className="form-group form-group-default">
            <label>Tel</label>
            <input type="text" className="form-control" ref={node => { this.tel = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Rating</label>
            <input type="text" className="form-control" ref={node => { this.rating = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Address</label>
            <input type="text" className="form-control" ref={node => { this.address = node }} required/>
          </div>
          <img alt="" id="preview" src="http://fairwayshutters.com/wp-content/themes/dotcomlabs/skins/images/preview.png" draggable="false" width={450} height={200} />
          <Preview/>
          <div className="form-group form-group-default">
            <label>LAT</label>
            <input type="text" className="form-control" ref={node => { this.lat = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>LNG</label>
            <input type="text" className="form-control" ref={node => { this.lng = node }} required/>
          </div>
          <div className="form-group form-group-default" style={{overflow: 'visible'}}>
            <label>MECHANIC LIST</label>
            <input id="tagsinputMec" data-provide="typeahead" type="text" ref={node => { this.mechaniclist = node }} />
          </div>
          <div className="form-group form-group-default" style={{overflow: 'visible'}}>
            <label>PART LIST</label>
              <input id="tagsinputPart" data-provide="typeahead" type="text" ref={node => { this.partlist = node }} />
          </div>
          <div className="form-group form-group-default">
            <label>Email</label>
            <input type="email" className="form-control" ref={node => { this.username = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Password</label>
            <input type="password" className="form-control" ref={node => { this.password = node }} required/>
          </div>
          <button type="submit" className="btn btn-success full-width">ADD GARAGE</button>
        </form>
      </div>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    let arrayMechanic = []
    let arrayPath = []
    let cutMechhanic = this.mechaniclist.value.split(',')
    let cutPath = this.partlist.value.split(',')
    for (var i = 0; i < cutMechhanic.length; i++) {
      arrayMechanic.push(cutMechhanic[i])
    }
    for (i = 0; i < cutPath.length; i++) {
      arrayPath.push(cutPath[i])
    }
    var formData = new FormData()
    formData.append('name', this.name.value)
    formData.append('tel', this.tel.value)
    formData.append('rating', this.rating.value)
    formData.append('address', this.address.value)
    formData.append('address_lat', this.lat.value)
    formData.append('address_lng', this.lng.value)
    if (arrayMechanic.length > 0 && arrayMechanic[0] !== '') formData.append('mechanic_id_list', arrayMechanic)
    if (arrayPath.length > 0 && arrayPath[0] !== '') formData.append('part_id_list', arrayPath)
    formData.append('username', this.username.value)
    formData.append('password', this.password.value)
    var image = document.getElementById('photo')
    var file = image.files[0]
    formData.append('file', file)
    this.props.addGarage(formData, this.props.auth.token)
  }
}

export default GarageAdd
