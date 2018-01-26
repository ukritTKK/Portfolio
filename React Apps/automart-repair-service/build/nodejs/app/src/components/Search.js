import React, { Component } from 'react'
import { connect } from 'react-redux'
import {search} from '../actions/lists'

class Search extends Component {

  render () {
    return (
      <div className="page-container">
        <div className="search col-md-12 m-t-30 m-b-30">
          <div className="input-group">
              <input type="text"
                className="form-control"
                placeholder="ค้นหา"
                onChange={(e) => this.handleSearch(e)}
                />
              <span className="input-group-btn">
              <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  handleSearch (e) {
    this.props.search(e.target.value)
  }
}

function mapStateToProps (state) {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    search: (value) => {
      dispatch(search(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
