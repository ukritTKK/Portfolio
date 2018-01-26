import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import cookie from 'react-cookie'

const user = cookie.load('user')
const visibility = (user === '3' || user === '2') ? 'show' : 'hide'

const MachanicItemList = ({mechanic, getOnceMechanic, banMechanic, getMechanics, auth}) => {
  const banned = (id, status) => {
    banMechanic(id, status, auth.token, auth.user)
    getMechanics(auth.token, auth.user)
  }

  const star = mechanic.map((mechanic) => {
    let rating = []
    for (let i = 0; i < 5; i++) {
      if (i < mechanic.rating) {
        rating.push(<i key={i} className="fa fa-star m-r-5" ></i>)
      } else {
        rating.push(<i key={i} className="fa fa-star-o m-r-5"></i>)
      }
    }
    return rating
  })
  let count = -1
  const machanicItemList = mechanic.map((mechanic) => (
    <div key={mechanic._id} className="card share share-self col1 m-r-20" data-social="item">
      <Link to={ auth.user === '2' ? '/garage/mechanics/edit/' + mechanic._id : '/admin/mechanics/edit/' + mechanic._id}>
        <div className="card-header clearfix">
            <div className="user-pic">
              <div className="userImage" style={{backgroundImage: 'url(' + mechanic.image_url + '?date=' + Date.now() + ')'}}></div>
            </div>
        </div>
        <div className="card-description">
            <h5>{mechanic.name}</h5>
            <h5>{mechanic.garage}</h5>
            <h5>{mechanic.tel}</h5>
            <h5 className={visibility}>{(mechanic.user_id.enabled === 0) ? <span style={{color: 'red'}}>Banned</span> : 'Active'}</h5>
        </div>
      </Link>
        <div className="card-footer clearfix">
          <ul className="reactions full-width">
            <li className="text-left m-r-35"><a href="#"><h5>จำนวนซ่อม : {mechanic.service_amount}</h5></a>
            </li>
            <li className="text-right">
              <div style={{display: 'none'}}>
              {count++}
              </div>
              {star[count]}
            </li>
          </ul>
          <Link to={ auth.user === '2' ? '/garage/mechanics/edit/' + mechanic._id : '/admin/mechanics/edit/' + mechanic._id}>
            <button className={'btn bg-primary-darker btn-primary m-l-5 pull-right' + visibility} type="button">
              <span><i className="fa fa-pencil"></i></span>
            </button>
          </Link>
          {
            (mechanic.user_id.enabled === 1) ? <button id="ban" className={'btn btn-danger pull-right ' + visibility} type="button" data-toggle="modal" data-target={'.' + mechanic._id}>
              <span><i className="fa fa-ban"></i></span>
            </button> : <button id="ban" className={'btn btn-default pull-right ' + visibility} type="button" data-toggle="modal" data-target={'.' + mechanic._id}>
              <span><i className="fa fa-ban"></i></span>
            </button>
          }
        </div>
        <div className={'modal fade ' + mechanic._id } tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                {
                  (mechanic.user_id.enabled === 1) ? <h4 className="modal-title" id="gridSystemModalLabel">Ban Mechanic</h4> : <h4 className="modal-title" id="gridSystemModalLabel">Unban Mechanic</h4>
                }
              </div>
              <div className="modal-body">
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                  {
                    (mechanic.user_id.enabled === 1) ? <button type="button" className="btn btn-danger pull-right" data-dismiss="modal" onClick={(e) => banned(mechanic.user_id._id, 0)}>BAN</button>
                  : <button type="button" className="btn btn-danger pull-right" data-dismiss="modal" onClick={(e) => banned(mechanic.user_id._id, 1)}>UNBAN</button>
                  }
              </div>
            </div>
          </div>
        </div>
    </div>
  ))
  return (
    <div className="page-container">
      <ul>
        {machanicItemList}
      </ul>
    </div>
  )
}

MachanicItemList.propTypes = {
  getOnceMechanic: PropTypes.func.isRequired
}

export default MachanicItemList
