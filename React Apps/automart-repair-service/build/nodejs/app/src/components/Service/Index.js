import React, { Component } from 'react'
import { Maps } from '../'

class Service extends Component {
  render () {
    let { service } = this.props
    console.log(service)
    let mockMapData = [{
      address: 'กรุงเทพ',
      address_lat: service.location_lat,
      address_lng: service.location_lng
    }]
    return (
      <div className="page-container">
        <div className="jumbotron" data-pages="">
          <div className="container-fluid container-fixed-lg sm-p-l-20 sm-p-r-20">
            <div className="inner">
              <ul className="breadcrumb">
                <li>
                  <p>ID:159483</p>
                </li>
                <li>วันที่เวลา : 10/08/2016 10:21</li>
                <li>ช่างID : 19483</li>
                <li>Status : </li>
              </ul>
            </div>
          </div>
        </div>
        <section id="one" className="container-fluid p-t-30">
          <div className="page-content-wrapper">
            <div className="card share share-self col1" data-social="item">
                <div className="card-header clearfix">
                    <div className="user-pic">
                      <div className="userImage" style={{backgroundImage: 'url(/uploads/mechanic/images/mech1.jpg)'}}></div>
                    </div>
                </div>
                <div className="card-description">
                    <h5>thanapong ngampong</h5>
                    <h5>ford ranger'98</h5>
                    <h5>098-888-8888</h5>
                </div>
                <div className="card-footer clearfix">
                  <ul className="reactions full-width">
                    <li className="text-left m-r-35"><a href="#"><h5>จำนวนซ่อม : 3</h5></a>
                    </li>
                    <li className="text-right">
                      <div style={{display: 'none'}}>
                      </div>
                      <i className="fa fa-star m-r-5" ></i>
                      <i className="fa fa-star m-r-5" ></i>
                      <i className="fa fa-star m-r-5" ></i>
                      <i className="fa fa-star m-r-5" ></i>
                      <i className="fa fa-star m-r-5" ></i>
                    </li>
                  </ul>
                </div>
            </div>
            <div className="card share share-self col1 m-l-10 m-r-10" data-social="item">
                <div className="card-header clearfix">
                    <div className="user-pic">
                      <div className="userImage" style={{backgroundImage: 'url(/uploads/mechanic/images/mech2.jpg)'}}></div>
                    </div>
                </div>
                <div className="card-description">
                    <h5>thanawat mangnee</h5>
                    <h5>Toyotacare</h5>
                    <h5>089-999-9999</h5>
                </div>
                <div className="card-footer clearfix">
                  <ul className="reactions full-width">
                    <li className="text-left m-r-35"><a href="#"><h5>จำนวนซ่อม : 3</h5></a>
                    </li>
                    <li className="text-right">
                      <div style={{display: 'none'}}>
                      </div>
                      <i className="fa fa-star m-r-5" ></i>
                      <i className="fa fa-star m-r-5" ></i>
                      <i className="fa fa-star m-r-5" ></i>
                      <i className="fa fa-star m-r-5" ></i>
                      <i className="fa fa-star m-r-5" ></i>
                    </li>
                  </ul>
                </div>
            </div>
            <div className="col-md-5 padding-0" style={{height: '465px'}}>
              <Maps garages={mockMapData} />
            </div>
        </div>
      </section>
          <div className="">
            <div className="jumbotron" data-pages="">
              <div className="container-fluid container-fixed-lg sm-p-l-20 sm-p-r-20">
                <div className="inner">
                  <ul className="step text-center">
                    <li>
                      <div className="content-bread"><h6>เปิดงาน</h6><h5>02/08/2016</h5></div>
                    </li>
                    <li>
                      <div className="content-bread"><h6>ประเมินงาน</h6><h5>03/08/2016</h5></div>
                    </li>
                    <li>
                      <div className="content-bread"><h6>เสนอราคา</h6><h5>05/08/2016</h5></div>
                    </li>
                    <li>
                      <div className="content-bread"><h6>ซ่อม</h6><h5>05/08/2016</h5></div>
                    </li>
                    <li>
                      <div className="content-bread"><h6>ปิดงาน</h6><h5>05/08/2016</h5></div>
                    </li>
                    <li>
                      <div className="content-bread"><h6>ยกเลิกงาน</h6><h5>05/08/2016</h5></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            <section id="three">
            <div className="container-fluid m-b-20">
                  <div className="content-fix col-md-6 text-center p-t-40">
                  <h2 className="m-b-20">รายการซ่อม</h2>
                  <div className="fix center-margin">
                    <ul className="text-left">
                      <li><h5><i className="fa fa-times m-r-10"></i>หม้อน้ำเสีย</h5></li>
                      <li><h5><i className="fa fa-times m-r-10"></i>แบตเตอรี่ไม่ชาร์จไฟ</h5></li>
                      <li><h5><i className="fa fa-times m-r-10"></i>สายพานไทมมิ่งขาด</h5></li>
                    </ul>
                  </div>
                </div>
                <div className="content-fix col-md-6 text-center p-t-40">
                <h2 className="m-b-20">รถของผู้ใช้</h2>
                <div className="col-md-6">
                    <div id="card-car" style={{backgroundImage: 'url(/uploads/car/images/car1.jpg)'}}>
                    </div>
                </div>
                <div className="col-md-2 center-margin">
                  <div className="card-car-body fix">
                    <ul className="text-left">
                      <li><h5 className="bold">120</h5></li>
                      <li><h5 className="bold">23000</h5></li>
                      <li><h5 className="bold">6</h5></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 text-left">
                  <div className="card-car-body fix">
                    <ul>
                      <li><h5>ไมล์</h5></li>
                      <li><h5>กิโลเมตร</h5></li>
                      <li><h5>อายุการใช้งาน</h5></li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
          </section>
          <div className="">
            <section id="four" className="container-fluid">
              <div className="card share share-self col1 m-r-25" data-social="item">
                  <div className="card-header clearfix">
                      <div className="user-pic">
                        <div className="userImage" style={{backgroundImage: 'url(/uploads/part/images/part1.jpg)'}}></div>
                      </div>
                  </div>
                  <div className="card-description">
                      <h5>ฝาหม้อน้ำ แสดงอุณหภูมิ 1.1บาร์</h5>
                      <h5>ฝาหม้อน้ำ</h5>
                      <h5>700 THB</h5>
                  </div>
                  <div className="card-footer clearfix">
                      <ul className="reactions">
                        <button className="btn btn-warning btn-animated from-left fa fa-check" type="button">
                          <span>เปลี่ยน</span>
                        </button>
                      </ul>
                  </div>
              </div>
              <div className="card share share-self col1 m-r-25" data-social="item">
                  <div className="card-header clearfix">
                      <div className="user-pic">
                        <div className="userImage" style={{backgroundImage: 'url(/uploads/part/images/part1.jpg)'}}></div>
                      </div>
                  </div>
                  <div className="card-description">
                      <h5>วาล์วน้ำ WH31U-82TAA</h5>
                      <h5>วาล์วน้ำ</h5>
                      <h5>1090 THB</h5>
                  </div>
                  <div className="card-footer clearfix">
                      <ul className="reactions">
                        <button className="btn btn-warning btn-animated from-left fa fa-check" type="button">
                          <span>เปลี่ยน</span>
                        </button>
                      </ul>
                  </div>
              </div>
              <div className="card share share-self col1 m-r-25" data-social="item">
                  <div className="card-header clearfix">
                      <div className="user-pic">
                        <div className="userImage" style={{backgroundImage: 'url(/uploads/part/images/part3.jpg)'}}></div>
                      </div>
                  </div>
                  <div className="card-description">
                      <h5>พัดลมหม้อน้ำ 10นิ้ว 12V90W</h5>
                      <h5>เพิ่มเติม</h5>
                      <h5>620 THB</h5>
                  </div>
                  <div className="card-footer clearfix">
                      <ul className="reactions">
                        <button className="btn btn-warning btn-animated from-left fa fa-check" type="button">
                          <span>เปลี่ยน</span>
                        </button>
                      </ul>
                  </div>
              </div>
              <div className="card share share-self col1 m-r-25" data-social="item">
                  <div className="card-header clearfix">
                      <div className="user-pic">
                        <div className="userImage" style={{backgroundImage: 'url(/uploads/part/images/part2.jpg)'}}></div>
                      </div>
                  </div>
                  <div className="card-description">
                      <h5>E1 ปั๊มน้ำ GWS-16A S/K</h5>
                      <h5>ปั๊มน้ำ</h5>
                      <h5>780 THB</h5>
                  </div>
                  <div className="card-footer clearfix">
                      <ul className="reactions">
                        <button className="btn btn-warning btn-animated from-left fa fa-check" type="button">
                          <span>เปลี่ยน</span>
                        </button>
                      </ul>
                  </div>
              </div>
            </section>
            <div className="panel panel-default panel-condensed relative padding-20">
              <div className="panel-heading">
                  <div className="panel-title top-left semi-bold">ค่าซ่อม
                  </div>
                  <div className="panel-title top-right">8000 THB
                  </div>
              </div>
          </div>
            <div className="panel panel-default panel-condensed relative padding-20">
              <div className="panel-heading text-danger">
                  <div className="panel-title top-left semi-bold">ส่วนลด
                  </div>
                  <div className="panel-title top-right">- 8000 THB
                  </div>
              </div>
          </div>
          <div className="panel panel-default panel-condensed relative padding-20">
            <div className="panel-heading text-danger">
                <div className="panel-title top-left semi-bold">ปรับราคา
                </div>
                <div className="panel-title top-right">- 1000 THB
                </div>
            </div>
        </div>
        <div className="panel panel-default panel-condensed relative padding-20">
          <div className="panel-heading text-danger">
              <div className="panel-title top-left semi-bold">VAT 7%
              </div>
              <div className="panel-title top-right">- 700 THB
              </div>
          </div>
      </div>
        <div className="panel panel-default panel-condensed relative padding-20">
          <div className="panel-heading">
              <div className="panel-title top-left"><h5 className="bold m-t-0 m-b-0">รวมทั้งหมด</h5>
              </div>
              <div className="panel-title top-right">7000 THB
              </div>
          </div>
      </div>
        <div className="panel panel-default panel-condensed relative padding-20">
          <div className="panel-heading">
              <div className="panel-title top-left">Billing
              </div>
            </div>
            <div className="panel-body">
            <pre>Apppi
                99/133 Ladprao 18
                Jompol Bangkok</pre>
            </div>
      </div>
      <div className="panel panel-default panel-condensed relative padding-20">
        <div className="panel-heading">
            <div className="panel-title top-left">อู่ได้รับเงิน
            </div>
            <div className="panel-title top-right">7000 THB
            </div>
        </div>
    </div>
        </div>
      </div>
    )
  }
}

export default Service
