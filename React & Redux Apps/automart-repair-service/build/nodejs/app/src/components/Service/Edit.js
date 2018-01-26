import React, { Component } from 'react'

class editService extends Component {
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
    <div className="parent" style={{'height': '100%', 'paddingTop': '2%', 'paddingLeft': '250px'}}>
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
        <button type="submit" className="btn btn-success full-width">EDIT Service</button>
      </form>
    </div>
  )
  }
}

export default editService
