import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Preview from '../Preview'

class PartAdd extends Component {
  componentDidUpdate () {
    if (this.props.success) {
      browserHistory.push('/admin/parts')
    }
  }

  render () {
    return (
      <div className="parent" style={{'height': '100%', 'paddingTop': '2%'}}>
        <form id="formsub" className="col-md-4 child" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group form-group-default">
            <label>PartNumber</label>
            <input type="text" className="form-control" ref={node => { this.partnumber = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Name</label>
            <input type="text" className="form-control" ref={node => { this.name = node }} required/>
          </div>
          <img alt="" id="preview" src="http://fairwayshutters.com/wp-content/themes/dotcomlabs/skins/images/preview.png" draggable="false" width={450} height={200} />
          <Preview />
          <div className="form-group form-group-default">
            <label>Price</label>
            <input type="text" className="form-control" ref={node => { this.price = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Amount</label>
            <input type="text" className="form-control" ref={node => { this.amount = node }} required/>
          </div>
          <button type="submit" className="btn btn-success full-width">ADD PART</button>
        </form>
      </div>
    )
  }
  handleSubmit (e) {
    e.preventDefault()
    var formData = new FormData()
    formData.append('part_number', this.partnumber.value)
    formData.append('name', this.name.value)
    formData.append('price', this.price.value)
    formData.append('amount', this.amount.value)
    var image = document.getElementById('photo')
    var file = image.files[0]
    formData.append('file', file)
    this.props.addPart(formData, this.props.auth.token)
  }
}

PartAdd.propTypes = {
  addPart: PropTypes.func.isRequired
}

export default PartAdd
