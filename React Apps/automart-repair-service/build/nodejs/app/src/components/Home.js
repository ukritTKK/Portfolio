import React, { Component } from 'react'
import './style.css'
import pin from '../pages/img/pin.png'
import google from '../pages/img/googleplay.png'
import apple from '../pages/img/applestore.png'
import { Maps } from './'
// import { Link } from 'react-router'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      aaa: ''
    }
  }

  componentDidMount () {
    let $ = window.jQuery
    $(window).scroll(function () {
      var scroll = $(window).scrollTop()
      if (scroll > 220) {
        $('header').addClass('header-down')
        $('button').addClass('button-black')
        $('.brands').addClass('brand-black')
      } else if (scroll < 20) {
        $('header').removeClass('header-down')
        $('button').removeClass('button-black')
        $('.brands').removeClass('brand-black')
      }
    })
  }
  render () {
    let mockMapData = [{
      address: 'กรุงเทพ',
      address_lat: '133.33333',
      address_lng: '15.55555'
    }]
    return (
      <div id='home_wrapper'>
        <section className="once">
          <section className="container jump">
            <div className="jumpbrotron col-md-6">
              <div className="postlog">
                <div>
                    <h3>ได้ช่างซ่อมรถในนาทีเดียว</h3>
                      <p>เพียงเรียกช่างซ่อมรถผ่าน AUTOMART คุณจะได้รับบริการซ่อมจากช่างที่ใกล้คุณที่สุด
                      ในเวลาและสถานที่คุณเลือกได้ ไม่วุ่นวายเพราะเราจัดการให้หมดทุกอย่าง</p>
                </div>
                <div>
                    <h3>สมาร์ท ปลอดภัย ได้มาตราฐาน</h3>
                      <p>เราคัดกรองช่างซ่อมที่มีความสามารถ จากเครือข่ายอู่ซ่อมรถของเรา
                      รวมถึงอะไหร่ทั้งหมดได้มาตราฐานจาก AUTOMART ทำให้คุณหมดกังวลจากปัญหาหลังการซ่อม
                      </p>
                </div>
                <div>
                    <h3>รถของคุณ กับการดูแลที่คุณเลือกได้</h3>
                      <p>ช่างของเราจะเข้าไปประเมินการซ่อมให้รถคุณถึงที่ โดยคุณสามารถเลือกอะไหร่ได้เอง
                      เมื่อทำการนัดหมายสำเร็จแล้ว ช่างจะเข้าไปซ่อมรถของคุณให้ ตามที่คุณเลือกไว้เลย</p>
                </div>
              </div>
              <div className="store-img">
                <div className="col-md-3 p-l-0"><img src={apple} width="120px" height="40px" alt=""/></div>
                <div className="col-md-3 p-l-0"><img src={google} width="120px" height="40px" alt=""/></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="jumpimage">
              </div>
            </div>
          </section>
        </section>
          <section id="two" className='flex'>
            <div className="slogan">
              <h5>บริการซ่อม</h5>
              <h3>จบในการซ่อมเพียงครั้งเดียว</h3>
              <p>หมดกังวล ด้วยการันตีคุณภาพบริการและอะไหร่หลังการซ่อม
              บริการที่เรามอบให้คุณจะถูกเลือกให้เหมาะสมกับประวัติรถของคุณ
              โดยคุณไม่จำเป็นต้องมัดจำ และพกเงินสดให้วุ่นวาย
              ทั้งหมดจะถูกหักจากบัตรเครดิตหลังช่างได้เข้ามาซ่อมเสร็จเรียบร้อย
              </p>
            </div>
            <div className="slogan-img">
            </div>
          </section>
          <section id="three" className="flex">
            <div className="slogan-imgtwo">
            </div>
            <div className="slogan">
              <h5>อะไหร่รถยนต์</h5>
              <h3>มั่นใจอะไหร่แท้ ราคาคุณภาพ</h3>
              <p>เราคัดสรรค์อะไหร่คุณภาพดี ในราคาพิเศษ ในทุกการบริการ
                คุณสามารถเลือกเกรดของอะไหร่ได้ในราคาที่คุณพอใจไปจนถึง
                เกรดพรีเมี่ยม และยังมีการประกันอะไหร่ให้คุณอุ่นใจอีกด้วย
              </p>
            </div>
          </section>
          <section id="map" className="flex">
            <div className="slogan">
              <h5>เครือข่ายอู่ซ่อมรถ</h5>
              <h3>ออฟฟิตหรือบ้าน เราบริการคุณในทุกที่</h3>
              <p>อู่ซ่อมรถที่เข้าร่วมโครงการกับเรากว่า 300 แห่ง จะมีการเทรนพนักงาน
                และช่างซ่อมให้ได้มาตราฐานและยังใช้อะไหร่ราคามาตราฐาน
                จึงหมดห่วงเรื่องโกงราคาอะไหร่และบริการซ่อมที่ไม่ได้คุณภาพ
              </p>
            </div>
            <div style={{height: '500px', width: '65%'}}>
            <Maps garages={mockMapData} />
            </div>
          </section>
          <section id="suggest" className="flex">
            <div>
              <div className="text-center"><h3>ผู้ช่วยรถที่ทุกคนต้องมี</h3></div>
              <div className="tools flex text-center">
                <div><img src='/images/app.png' width="250" height="400" alt=""/><h4>ประวัติส่วนตัว</h4></div>
                <div><img src='/images/app2.png' width="250" height="400" alt=""/><h4>รายการซ่อม</h4></div>
                <div><img src='/images/app3.png' width="250" height="400" alt=""/><h4>ความคืบหน้า</h4></div>
                <div><img src='/images/app4.png' width="250" height="400" alt=""/><h4>รายการบัญชี</h4></div>
            </div>
            </div>
          </section>
          <section id="footer">
            <div className="flex container">
            <div className="location">
              <img className="pin" src={pin} alt="" width="270" height="300"/>
            </div>
            <div className="footer-content">
              <h3>เรียกช่างเข้าไปตรวจสภาพรถและประเมินราคาซ่อม</h3>
                <select className="select-box" defaultValue=''>
                  <option value disabled>เลือกเขตที่ต้องการใช้บริการ</option>
                  <option value>กรุงเทพ</option>
                  <option value>กรุงเทพ</option>
                  <option value>กรุงเทพ</option>
                </select>
              <p>*รับฟรีส่วนลด 500 บาท สำหรับการเรียกใช้บริการครั้งแรกในปี 2560</p>
              <ul>
                <li>บริการซ่อม</li>
                <li>อะไหร่รถยนต์</li>
                <li>เครือข่ายอู่ซ่อมรถ</li>
                <li>ติดต่อเรา</li>
              </ul>
            </div>
            </div>
          </section>
      </div>
    )
  }
}

export default Home
