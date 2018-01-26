import React, {Component} from 'react'

let $ = window.jQuery

class Preview extends Component {
  render () {
    return (
      <div>
        <br/>
        <div className="form-group form-group-default">
            <label>Image</label>
            <input type='file' id="photo" onChange={(e) => this.handleChange(e)}/>
        </div>
      </div>
    )
  }
  handleChange (e) {
    let img = document.getElementById('photo')
    this.readURL(img)
  }
  readURL (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()
      reader.onload = (e) => {
        $('#preview').attr('src', e.target.result)
      }
      reader.readAsDataURL(input.files[0])
    }
  }
}

export default Preview
