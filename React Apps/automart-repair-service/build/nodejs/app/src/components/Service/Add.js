import React, {Component} from 'react'
class ServiceAdd extends Component {
  componentDidMount () {
    let $ = window.jQuery
    $('#tagsinputPart').tagsinput({
      typeahead: {
        source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
      }
    })
    $('#tagsinputRepair').tagsinput({
      typeahead: {
        source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
      }
    })
  }

  render () {
    return (
    <div className="parent"style={{'height': '100%', 'paddingTop': '2%', 'paddingLeft': '250px'}}>
      <form className="col-md-6 child" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group form-group-default">
          <label>User Id</label>
          <input type="text" className="form-control" ref={node => { this.userid = node }} autoFocus/>
        </div>
        <div className="form-group form-group-default">
          <label>Mechanic ID</label>
          <input type="text" className="form-control" ref={node => { this.mechanicid = node }} required/>
        </div>
        <div className="form-group form-group-default">
          <label>Promotion ID</label>
          <input type="text" className="form-control" ref={node => { this.promotion = node }} required/>
        </div>
        <div className="form-group form-group-default">
          <label>Car ID</label>
          <input type="text" className="form-control" ref={node => { this.car = node }} required/>
        </div>
        <div className="form-group form-group-default">
          <label>Carmiles</label>
          <input type="text" className="form-control" ref={node => { this.carmiles = node }} required/>
        </div>
        <div className="form-group form-group-default">
          <label>Car used Year</label>
          <input type="text" className="form-control" ref={node => { this.carused = node }} required/>
        </div>
        <div className="form-group form-group-default">
          <label>Price</label>
          <input type="text" className="form-control" ref={node => { this.price = node }} required/>
        </div>
        <div className="form-group form-group-default">
          <label>corrected Price</label>
          <input type="text" className="form-control" ref={node => { this.correctedprice = node }} required/>
        </div>
        <div className="form-group form-group-default">
          <label>Repair list</label>
          <input id="tagsinputRepair" type="text" className="form-control" ref={node => { this.repairlist = node }} required/>
        </div>
        <div className="form-group form-group-default">
          <label>part id list</label>
          <input id="tagsinputPart" type="text" className="form-control" ref={node => { this.partlist = node }} required/>
        </div>
        <button type="submit" className="btn btn-success full-width">Add Service</button>
      </form>
    </div>
  )
  }

  handleSubmit (e) {
    e.preventDefault()
    let serviceDate = '2016-06-03T10:34'
    let serviceOb = [{'status': 'received', 'date': '2016-06-03T10:34'}]
    let arrayRepair = []
    let arrayPart = []
    let cutRepair = this.repairlist.value.split(',')
    let cutPart = this.partlist.value.split(',')
    for (var i = 0; i < cutRepair.length; i++) {
      arrayRepair.push(cutRepair[i])
    }
    for (i = 0; i < cutPart.length; i++) {
      arrayPart.push(cutPart[i])
    }
    this.props.addService(
    this.userid.value,
    this.mechanicid.value,
    this.promotion.value,
    this.car.value,
    this.carmiles.value,
    this.carused.value,
    arrayPart,
    arrayRepair,
    serviceOb,
    this.price.value,
    13.296745,
    100.178454,
    serviceDate,
    this.correctedprice.value,
    this.props.auth.token
  )
  }
}
export default ServiceAdd
