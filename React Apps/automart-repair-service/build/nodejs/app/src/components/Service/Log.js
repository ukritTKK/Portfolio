import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

const ServiceLog = ({service, getOnceServiceId, getOnceService}) => {
  const BillingList = service.map((service) =>
    <tr key={service._id}>
      <td>{new Date(moment(service.status_list.slice(-1)[0].date)).toUTCString()}</td>
      <td>{service._id.substring(18, 25)}</td>
      <td>{(service.userName) ? service.userName : service.username}</td>
      <td>{service.repair_list.map((service) => <li key={service}>{service}</li>)}</td>
      <td><div className="status noto-bold">{service.status_list.slice(-1)[0].status}</div></td>
      <td>
        <Link to={'/mechanic/services/detail/' + service._id}>
          <button className="btn bg-primary-darker btn-primary" type="button">
            <span><i className="fa fa-file-text-o"></i></span>
          </button>
        </Link>
      </td>
    </tr>
  )

  return (
      <div>
        <div className="page-container">
        <table id="myDataTable" className="table table-hover">
          <thead>
            <tr>
              <th style={{width: '20%'}}>วันที่/เวลา</th>
              <th style={{width: '10%'}}>ID</th>
              <th style={{width: '25%'}}>ชื่อผู้รับบริการ</th>
              <th style={{width: '25%'}}>รายการซ่อม</th>
              <th style={{width: '20%'}}>สถานะ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {BillingList}
          </tbody>
        </table>
      </div>
      </div>
    )
}

export default ServiceLog
