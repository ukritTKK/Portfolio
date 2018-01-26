import React from 'react'
import { Link } from 'react-router'

const GarageItemList = ({garages, getOnceGarage, deleteGarage, mechanic, auth}) => {
  const deleteOnceGarage = (id) => {
    deleteGarage(id, auth.token)
  }
  const garageItemList = garages.map((garages) =>
  <div key={garages._id} className="card share share-self col1 m-r-20" data-social="item">
      <div className="card-header clearfix">
          <div className="user-pic" data-toggle="modal" data-target={'.in' + garages._id}>
            <img role="presentation" data-src-retina={garages.image_url + '?date=' + Date.now()} data-src={garages.image_url + '?date=' + Date.now()} src={garages.image_url + '?date=' + Date.now()}/>
          </div>
      </div>
      <div className="card-description">
          <h5>{garages.name}</h5>
          <h5>{garages.address}</h5>
          <h5>{garages.tel}</h5>
      </div>
      <div className="card-footer clearfix">
          <ul className="reactions">
            <Link to={'/admin/garages/edit/' + garages._id }>
              <button className="btn bg-primary-darker btn-primary" type="button">
                <span><i className="fa fa-pencil"></i></span>
              </button>
            </Link>
            <button className="btn btn-danger m-l-5" type="button" data-toggle="modal" data-target={'.' + garages._id}>
              <span><i className="fa fa-trash"></i></span>
            </button>
          </ul>
      </div>
      <div className={'modal fade ' + garages._id } tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="gridSystemModalLabel">Delete Garage?</h4>
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger pull-right" data-dismiss="modal" onClick={(e) => deleteOnceGarage(garages._id)}
>DELETE</button>
            </div>
          </div>
        </div>
      </div>

    <div className={'modal fade in' + garages._id} tabIndex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="gridSystemModalLabel">Mechanic In Garage</h4>
          </div>
          <div className="modal-body">
            <div className="row">
              {
                mechanic.filter((mechanic, index) => garages._id === mechanic.garage_id._id).map((mechanic) => (
                  <div key={mechanic._id} className="card share share-self coll" data-social="item">
                    <div className="card-header clearfix">
                        <div className="user-pic">
                          <div className="userImage" style={{backgroundImage: 'url(' + mechanic.image_url + '?date=' + Date.now() + ')'}}></div>
                        </div>
                    </div>
                    <div className="card-description">
                        <h5>{mechanic.name}</h5>
                        <h5>{mechanic.garage}</h5>
                        <h5>{mechanic.tel}</h5>
                        <h5>{(mechanic.enabled === 0) ? 'Banned' : 'Active'}</h5>
                    </div>
                    <div className="card-footer clearfix">
                      <ul className="reactions full-width">
                        <li className="text-left m-r-35"><a href="#"><h5>จำนวนซ่อม : {mechanic.service_amount}</h5></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )

  return (
    <div className="page-container m-t-30 col-md-12">
      <ul>
        {garageItemList}
      </ul>
    </div>
  )
}

export default GarageItemList
