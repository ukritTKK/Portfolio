import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const PartItemList = ({parts, getOncePart, deletePart, auth, addPartToGarage, deletePartToGarage}) => {
  const deleteOncePart = (id) => {
    deletePart(id, auth.token)
  }
  const partItemList = parts.map((parts) =>
  <div key={parts._id} className="card share share-self col1 m-r-20" data-social="item">
    <Link to={'/admin/parts/edit/' + parts._id}>
      <div className="card-header clearfix">
          <div className="user-pic">
            <img role="presentation" data-src-retina={parts.image_url} data-src={parts.image_url} src={parts.image_url}/>
          </div>
      </div>
      <div className="card-description">
          <h5>{parts.name}</h5>
          <h5>{parts.part_number}</h5>
          <h5>{parts.price} THB</h5>
      </div>
    </Link>
      <div className="card-footer clearfix">
      {
        auth.user === '3' ? <ul className="reactions">
        <Link to={'/admin/parts/edit/' + parts._id}>
            <button className="btn bg-primary-darker btn-primary" type="button">
              <span><i className="fa fa-pencil"></i></span>
            </button>
        </Link>
          <button className="btn btn-danger m-l-5" type="button" data-toggle="modal" data-target={'.' + parts._id}>
            <span><i className="fa fa-trash"></i></span>
          </button>
        </ul>
        : <ul className="reactions">
          {
            parts.exist ? <button className="btn bg-primary-darker btn-danger" onClick={deletePartToGarage.bind(this, parts._id, auth.token)} type="button">
              <span><i className="fa fa-minus"></i></span>
            </button>
            : <button className="btn bg-primary-darker btn-primary" onClick={addPartToGarage.bind(this, parts._id, auth.token)} type="button">
              <span><i className="fa fa-plus"></i></span>
            </button>
          }
        </ul>
      }
      </div>
      <div className={'modal fade ' + parts._id } tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="gridSystemModalLabel">Delete Part?</h4>
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
              <div>
                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger pull-right" data-dismiss="modal" onClick={(e) => deleteOncePart(parts._id)}>DELETE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )

  return (
    <div className="page-container">
      <ul>
        {partItemList}
      </ul>
    </div>
  )
}
PartItemList.propTypes = {
  parts: PropTypes.array.isRequired
}

export default PartItemList
