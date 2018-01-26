import React, { Component } from 'react'
import Chart from '../components/Chart'

class Main extends Component {

  render () {
    return (
      <div className="page-container">
        <div className="container p-t-30 p-b-30">
          <Chart/>
          <div className="col-md-12 text-center m-t-20 m-b-20">
            <button className="btn btn-cons" style={{'backgroundColor': '#2b303b', 'color': '#fff'}}><h4 className="text-white m-r-5">0</h4>ช่าง</button>
            <button className="btn btn-cons m-l-20" style={{'backgroundColor': '#2b303b', 'color': '#fff'}}><h4 className="text-white m-r-5">0</h4>อู่</button>
            <button className="btn btn-cons m-l-20" style={{'backgroundColor': '#2b303b', 'color': '#fff'}}><h4 className="text-white m-r-5">0</h4>เซอร์วิส</button>
            <button className="btn btn-cons m-l-20" style={{'backgroundColor': '#2b303b', 'color': '#fff'}}><h4 className="text-white m-r-5">0</h4>อะไหล่</button>
          </div>

          <div className="col-md-12 m-t-20">
            <h3>Report รายสัปดาห์</h3>
          </div>
          <table id="myDataTable" className="table table-hover" style={{'width': '100%'}}>
            <thead style={{'backgroundColor': '#2b303b'}}>
              <tr>
                <th style={{'color': '#fff'}}>ชื่อ</th>
                <th style={{'color': '#fff'}}>อู่ซ่อม</th>
                <th style={{'color': '#fff'}}>จำนวนบริการ</th>
                <th style={{'color': '#fff'}}>บริการครั้งล่าสุด</th>
                <th style={{'color': '#fff'}}>ยอดรวมทั้งหมด</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ชาญชัย เที่ยงธรรม</td>
                <td>อู่มีชัย</td>
                <td>12</td>
                <td>25 ม.ค. 2559</td>
                <td>5000 บาท</td>
              </tr>
            </tbody>
          </table>

          <div className="col-md-12 m-t-20">
            <h3>อะไหล่ขายดี รายสัปดาห์</h3>
          </div>
          <table id="myDataTable" className="table table-hover" style={{'width': '100%'}}>
            <thead style={{'backgroundColor': '#2b303b'}}>
              <tr>
                <th style={{'color': '#fff'}}>หมายเลข</th>
                <th style={{'color': '#fff'}}>ชื่ออะไหล่</th>
                <th style={{'color': '#fff'}}>ราคา</th>
                <th style={{'color': '#fff'}}>ยอดขาย</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>WH31U-82TAAA</td>
                <td>วาล์วน้ำ WH31U-82TAA</td>
                <td>1090 บาท</td>
                <td>150</td>
              </tr>
            </tbody>
          </table>

          <div className="col-md-12 m-t-20">
            <h3>Activity รายสัปดาห์</h3>
          </div>
          <table id="myDataTable" className="table table-hover" style={{'width': '100%'}}>
            <thead style={{'backgroundColor': '#2b303b'}}>
              <tr>
                <th style={{'color': '#fff'}}>วัน/เวลา</th>
                <th style={{'color': '#fff'}}>ช่างซ่อม</th>
                <th style={{'color': '#fff'}}>ลูกค้า</th>
                <th style={{'color': '#fff'}}>อู่</th>
                <th style={{'color': '#fff'}}>สถานะล่าสุด</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12 ม.ค. 2560 12:23</td>
                <td>ชาญชัย เที่ยงธรรม</td>
                <td>สมรักษ์ คำสิงค์</td>
                <td>อู่ชาญชัย</td>
                <td>ประเมินงาน</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Main
