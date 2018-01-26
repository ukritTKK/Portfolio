import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Preview from '../Preview'

class CarEdit extends Component {

  componentDidUpdate () {
    if (this.props.success) {
      browserHistory.push('/admin/cars')
    }
  }

  render () {
    return (
        <div className="parent" style={{'height': '100%', 'paddingTop': '2%'}}>
          <form id="formsub" className="col-md-4 child" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group form-group-default">
              <label>CarBrand</label>
              <input type="text" className="form-control" defaultValue={this.props.car.car_brand} ref={node => { this.car_brand = node }} required/>
            </div>
            <div className="form-group form-group-default">
              <label>CarModel</label>
              <input type="text" className="form-control" defaultValue={this.props.car.car_model} ref={node => { this.car_model = node }} required/>
            </div>
            <img alt="" id="preview" src={this.props.car.image_url || 'http://fairwayshutters.com/wp-content/themes/dotcomlabs/skins/images/preview.png'} draggable="false" width={450} height={200} />
            <Preview/>
            <div className="form-group form-group-default">
              <label>Caryear</label>
              <input type="text" className="form-control" defaultValue={this.props.car.car_year} ref={node => { this.car_year = node }} required/>
            </div>
            <button type="submit" className="btn btn-success full-width">EDIT CAR</button>
          </form>
        </div>
      )
  }
  handleSubmit (e) {
    e.preventDefault()
    var formData = new FormData()
    formData.append('id', this.props.car._id)
    var image = document.getElementById('photo')
    var file = image.files[0]
    formData.append('file', file)

    if (file) {
      this.props.editCarImage(formData, this.props.auth.token)
    }

    this.props.editCar(
      this.props.car._id,
      this.car_brand.value,
      this.car_model.value,
      this.car_year.value,
      0,
      this.props.auth.token
    )
  }
}

export default CarEdit
