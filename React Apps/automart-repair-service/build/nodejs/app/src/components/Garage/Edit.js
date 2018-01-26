import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import Preview from '../Preview'

class GarageEdit extends Component {

  componentDidMount () {
    let $ = window.jQuery
    $('#tagsinputMec').tagsinput({
      typeahead: {
        source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
      }
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
        <form action="#" className="col-md-4 child m-l-100" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group form-group-default">
            <label>Name</label>
            <input type="text" className="form-control" defaultValue={this.props.garage.name} ref={node => { this.name = node }} autoFocus required/>
          </div>
          <div className="form-group form-group-default">
            <label>Tel</label>
            <input type="text" className="form-control" defaultValue={this.props.garage.tel} ref={node => { this.tel = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Rating</label>
            <input type="text" className="form-control" defaultValue={this.props.garage.rating} ref={node => { this.rating = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Address</label>
            <input type="text" className="form-control" defaultValue={this.props.garage.address} ref={node => { this.address = node }} required/>
          </div>
          <img alt="" id="preview" src={this.props.garage.image_url || 'http://fairwayshutters.com/wp-content/themes/dotcomlabs/skins/images/preview.png'} draggable="false" width={450} height={200} />
          <Preview/>
          <div className="form-group form-group-default">
            <label>LAT</label>
            <input type="text" className="form-control" defaultValue={this.props.garage.address_lat} ref={node => { this.lat = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>LNG</label>
            <input type="text" className="form-control" defaultValue={this.props.garage.address_lng} ref={node => { this.lng = node }} required/>
          </div>
          <div className="form-group form-group-default" style={{overflow: 'visible'}}>
            <label>MECHANIC LIST</label>
            <input id="tagsinputMec" type="text" data-provide="typeahead" defaultValue={this.props.garage.mechanic_id_list.map((mechanic) => (mechanic._id))} ref={node => { this.mechaniclist = node }}/>
          </div>
          <div className="form-group form-group-default" style={{overflow: 'visible'}}>
            <label>PART LIST</label>
              <input id="tagsinputPart" type="text" data-provide="typeahead" defaultValue={this.props.garage.part_id_list.map((part) => (part._id))} ref={node => { this.partlist = node }}/>
          </div>
          <div className="form-group form-group-default">
            <label>username</label>
            <input type="text" className="form-control" defaultValue={this.props.garage.user_id.username} disabled/>
          </div>
          <button type="submit" className="btn btn-success full-width">EDIT GARAGE</button>
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
    var image = document.getElementById('photo')
    var file = image.files[0]
    formData.append('file', file)
    formData.append('id', this.props.garage._id)
    if (file) {
      this.props.editGarageImage(formData, this.props.auth.token)
    }
    this.props.editGarage(
      this.props.garage._id,
      this.name.value,
      this.tel.value,
      this.rating.value,
      this.address.value,
      this.lat.value,
      this.lng.value,
      arrayMechanic,
      arrayPath,
      this.props.auth.token
    )
  }
}

export default GarageEdit
