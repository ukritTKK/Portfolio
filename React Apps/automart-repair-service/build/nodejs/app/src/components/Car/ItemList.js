import React from 'react'
import { Link } from 'react-router'

const CarItemList = ({cars, getOnceCar, deleteCar, auth}) => {
  const deleteOnceCar = (id) => {
    deleteCar(id, auth.token)
  }
  const carsItemList = cars.map((cars) =>
  <div key={cars._id} className="card share share-self col1 m-r-20" data-social="item">
    <Link to={'/admin/cars/edit/' + cars._id}>
      <div className="card-header clearfix">
        <div className="user-pic">
          <div className="userImage" style={{backgroundImage: 'url(' + cars.image_url + '?date=' + Date.now() + ')'}}></div>
        </div>
      </div>
      <div className="card-description">
          <h5>{cars.car_model}</h5>
          <h5>{cars.car_brand}</h5>
          <h5>{cars.car_year}</h5>
      </div>
    </Link>
      <div className="card-footer clearfix">
          <ul className="reactions">
            <Link to={'/admin/cars/edit/' + cars._id}>
              <button className="btn bg-primary-darker btn-primary" type="button">
                <span><i className="fa fa-pencil"></i></span>
              </button>
            </Link>
            <button className="btn btn-danger m-l-5" type="button" data-toggle="modal" data-target={ '.' + cars._id }>
              <span><i className="fa fa-trash"></i></span>
            </button>
          </ul>
      </div>
      <div className={'modal fade ' + cars._id } tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="gridSystemModalLabel">Delete Car?</h4>
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger pull-right" data-dismiss="modal" onClick={(e) => deleteOnceCar(cars._id)}
>DELETE</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  )

  return (
    <div className="page-container">
      <ul>
        {carsItemList}
      </ul>
    </div>
  )
}

export default CarItemList
