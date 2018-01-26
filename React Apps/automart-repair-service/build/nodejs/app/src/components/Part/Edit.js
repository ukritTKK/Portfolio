import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Preview from '../Preview'

class PartEdit extends Component {
  componentDidUpdate () {
    if (this.props.success) {
      browserHistory.push('/admin/parts')
    }
  }

  render () {
    return (
      <div className="parent" style={{'height': '100%', 'paddingTop': '2%'}}>
        <form action="#" className="col-md-4 child" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group form-group-default">
            <label>PartNumber</label>
            <input type="text" className="form-control" defaultValue={this.props.part.part_number} ref={node => { this.partnumber = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Name</label>
            <input type="text" className="form-control" defaultValue={this.props.part.name} ref={node => { this.name = node }} required/>
          </div>
          <img alt="" id="preview" src={this.props.part.image_url || 'http://fairwayshutters.com/wp-content/themes/dotcomlabs/skins/images/preview.png' } draggable="false" width={450} height={200} />
          <Preview />
          <div className="form-group form-group-default">
            <label>Price</label>
            <input type="text" className="form-control" defaultValue={this.props.part.price} ref={node => { this.price = node }} required/>
          </div>
          <div className="form-group form-group-default">
            <label>Amount</label>
            <input type="text" className="form-control" defaultValue={this.props.part.amount} ref={node => { this.amount = node }} required/>
          </div>
          <button type="submit" className="btn btn-success full-width">EDIT PART</button>
        </form>
      </div>
    )
  }
  handleSubmit (e) {
    e.preventDefault()
    let formData = new FormData()
    let image = document.getElementById('photo')
    let file = image.files[0]
    formData.append('id', this.props.part._id)
    formData.append('file', file)
    if (file) {
      this.props.editPartImage(formData, this.props.auth.token)
    }
    this.props.editPart(
      this.props.part._id,
      this.partnumber.value,
      this.name.value,
      this.price.value,
      this.amount.value,
      this.props.auth.token
    )
  }
}

PartEdit.propTypes = {
  editPart: PropTypes.func.isRequired
}

export default PartEdit
