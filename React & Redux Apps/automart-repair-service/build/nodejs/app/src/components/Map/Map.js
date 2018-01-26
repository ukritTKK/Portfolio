import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import GoogleMap from 'react-google-map'
import GoogleMapLoader from 'react-google-maps-loader'

import pickupIcon from './img/tracker.png'
import trackerIcon from './img/circle_pin.png'
import placeMarkerIcon from './img/place_marker.png'
import xBtn from './img/x_button_16.png'
import findIcon from './img/find_icon.png'
import goIcon from './img/go_icon.png'
import successIcon from './img/success_icon.png'
// import mechanicPhoto from './img/uvuv.jpg'
import notAvailImg from './img/not_avail_img.png'
import perkIcon from './img/perks_icon.png'
import star0 from './img/star_0.png'
import star1 from './img/star_1.png'
import star2 from './img/star_2.png'
import star3 from './img/star_3.png'
import star4 from './img/star_4.png'
import star5 from './img/star_5.png'
// import findLocationImage from './img/locate_position.png'
import serviceAutoImg from './img/mechanic_inspect.png'
// import cancelMechanicImg from './img/cancel_mechanic.png'
import visaLogo from './img/visa_32.png'
import mastercardLogo from './img/mastercard_32.png'

import firebase from 'firebase'
import Modal from 'react-modal'
import Spinner from 'react-spinkit'
import Rating from './Rating'
import validator from 'card-validator'

const MY_API_KEY = 'AIzaSyCnaiqR36Mg9fTiCBVpYdRoZNnv8bPargE'
const desCoordRef = firebase.database().ref('coordinates/testpos')

let pickupLat = -1
let pickupLng = -1
let shouldRerender = true
let date = new Date()
date.setDate(date.getDate() + 30)

let mechid = []
let isMatching = true
let reserved = []

let deslat = 0
let deslng = 0

//    Read from GPS
let userCurrentLat
let userCurrentLng

function CalcDistance (result) {
  let routeDistance = 0
  let route = result.routes[0]
  for (let i = 0; i < route.legs.length; i++) {
    routeDistance += route.legs[i].distance.value
  }
  routeDistance /= 1000
  return routeDistance
}

class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      distance: [],
      username: null,
      isMatched: false,
      lat: -1,
      lng: -1,
      loading: true,
      ShowModal: false,
      mecaavailable: true,
      mechid: '',
      mechName: '',
      mechPerks: '',
      mechRating: '',
      mechCarModel: '',
      mechPlateNum: '',
      mechGarageName: '',
      mechGarageOpen: '',
      mechGarageClose: '',
      showServiceSelectModal: false,
      serviceType: '',
      offeredQuot: false,
      catalogue: [],
      firebaseCatalogue: [],
      paymentProcess: false,
      paymentComplete: false,
      givenRating: 0,
      isResetPosClick: false

    }
    this.getDesLocat = this.getDesLocat.bind(this)
    this.getUsersCurrentLocation = this.getUsersCurrentLocation.bind(this)
    this.setUsersCurrentLocation = this.setUsersCurrentLocation.bind(this)
    this.handleReqClose = this.handleReqClose.bind(this)
    this.handleReqOpen = this.handleReqOpen.bind(this)
    this.checkMechAvail = this.checkMechAvail.bind(this)
    this.setModalTimeout = this.setModalTimeout.bind(this)
    this.handleOrderClick = this.handleOrderClick.bind(this)
    this.handleChooseServiceClose = this.handleChooseServiceClose.bind(this)
    this.handleServiceClickAuto = this.handleServiceClickAuto.bind(this)
    this.handleServiceClickManual = this.handleServiceClickManual.bind(this)
    this.onServiceLoad = this.onServiceLoad.bind(this)
    this.handleAcceptQuotClick = this.handleAcceptQuotClick.bind(this)
    this.handlePaymentClick = this.handlePaymentClick.bind(this)
    this.handleBackClick = this.handleBackClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleFinishClick = this.handleFinishClick.bind(this)
    this.handleSelectCardClick = this.handleSelectCardClick.bind(this)
  }

  componentDidMount () {
    let that = this
    let mechID = localStorage.getItem('mechanicID')
    if (that.props.umap.mechid !== undefined) {
      let ref = firebase.database().ref('/mechanic/' + mechID + '/Service')
      ref.on('child_changed', function (snapshot) {
        let changedPost = snapshot.val()
        if (changedPost === 0) {
          window.location.reload()
        }
      })
    }
    that.setCards(that.props.umap.firebaseCards)

    // console.log('1 second')
    that.props.setCurrentLatLng()
    setInterval(() => {
      // console.log('15 seconds')
      that.props.setCurrentLatLng()
    }, 1500000)
  }

  shouldComponentUpdate () {
    return shouldRerender
  }

  handleReqClose () {
    // console.log('props: ' + (this.props.umap.givenRating + 1000))
    isMatching = false
    document.cookie = 'picklat=' + pickupLat + '; expires=' + date + ';path=/'
    document.cookie = 'picklng=' + pickupLng + '; expires=' + date + ';path=/'
    this.props.closemodal()
    shouldRerender = true
    // window.location = '/map'
  }
  handleChooseServiceClose () {
    isMatching = false
    this.props.closeChooseServiceModal()
    shouldRerender = true
  }
  handleReqOpen () {
    isMatching = true
    shouldRerender = true
    this.props.openmodal()
  }
  handleServiceClickAuto () {
    if (localStorage.getItem('serviceType') === 'manual') {
      this.props.setServiceType('Auto')
      let x = document.getElementById('Modal--services')
      let y = document.getElementById('Modal--services2')
      let color = '#E0ECFF'
      let colorWhite = '#EEEEEE'
      let border = '1px solid #0047BA'
      let borderDefault = '1px solid #A4A8A6'
      // console.log('color: ' + x.style.backgroundColor)
      // console.log('color2: ' + x.style.getPropertyValue('background-color'))
      // console.log('color3: ' + x.style.cssText)
      if (x.style.backgroundColor === color) {
        y.style.backgroundColor = colorWhite
        y.style.border = borderDefault
      } else {
        x.style.backgroundColor = color
        x.style.border = border
        y.style.backgroundColor = colorWhite
        y.style.border = borderDefault
      }
      setTimeout(() => {
        console.log('service type: ' + this.props.umap.serviceType)
      }, 1)
    }
    localStorage.setItem('serviceType', 'auto')
  }
  handleServiceClickManual () {
    if (localStorage.getItem('serviceType') === 'auto') {
      this.props.setServiceType('Manual')
      let x = document.getElementById('Modal--services')
      let y = document.getElementById('Modal--services2')
      let color = '#E0ECFF'
      let colorWhite = '#EEEEEE'
      let border = '1px solid #0047BA'
      let borderDefault = '1px solid #A4A8A6'
      if (y.style.backgroundColor === color) {
        x.style.backgroundColor = colorWhite
      } else {
        y.style.backgroundColor = color
        y.style.border = border
        x.style.backgroundColor = colorWhite
        x.style.border = borderDefault
      }
      setTimeout(() => {
        console.log('service type: ' + this.props.umap.serviceType)
      }, 1)
    }
    localStorage.setItem('serviceType', 'manual')
  }
  onServiceLoad () {
    let x = document.getElementById('Modal--services')
    let y = document.getElementById('Modal--services2')
    x.style.setProperty('background-color', '#E0ECFF')
    y.style.setProperty('background-color', '#EEEEEE')

    // x.style.setProperty('border', '1px solid #0DE579')
    x.style.setProperty('border', '1px solid #0047BA')
    y.style.setProperty('border', '1px solid #A4A8A6')

    this.props.setServiceType('Auto')
    localStorage.setItem('serviceType', 'auto')
  }
  handleAcceptQuotClick () {
    this.props.onAcceptQuotClick()
    this.props.closemodal()
    this.props.openmodal()
    shouldRerender = true
  }
  handlePaymentClick () {
    if (this.props.umap.selectedCardID === '') {
      alert('Please select your credit/debit card first.')
    } else {
      let firebaseCard = this.props.umap.firebaseCards[this.props.umap.selectedCardID]
      let card = {
        name: firebaseCard.name,
        number: firebaseCard.num,
        expiration_month: firebaseCard.expM,
        expiration_year: firebaseCard.expY,
        security_code: firebaseCard.cvv
      }
      this.props.onPaymentClick(card)
      this.props.closemodal()
      this.props.openmodal()
      shouldRerender = true
    }
  }
  handleBackClick () {
    this.props.onBackClick()
    this.props.closemodal()
    this.props.openmodal()
    shouldRerender = true
  }
  handleNextClick () {
    this.props.onNextClick()
    this.props.closemodal()
    this.props.openmodal()
    shouldRerender = true
  }
  handleFinishClick () {
    this.props.onFinishClick(this.props.umap.givenRating)
    this.props.closemodal()
    setTimeout(() => {
      this.props.resetFirebaseData()
    }, 500)
    shouldRerender = true
  }

  handleSelectCardClick (event) {
    this.props.onSelectCardClick(event, this.props.umap.firebaseCards.length)
  }

  setModalTimeout () {
    setTimeout(() => {
      window.location.reload()
      isMatching = false
      document.cookie = 'picklat=' + pickupLat + '; expires=' + date + ';path=/'
      document.cookie = 'picklng=' + pickupLng + '; expires=' + date + ';path=/'
      this.props.closemodal()
    }, 2000)
  }

  setCatalogue (list) {
    let i
    let array = []
    for (i = 0; i < list.length; i++) {
      array[i] = (
        <div className='Modal--viewQuot--list--each' key={i} id={'listEach:' + i}>
          <div className='orderName--each'>{list[i].orderName}</div>
          <div className='orderQty--each'>{list[i].orderQty}</div>
        </div>
      )
    }
    this.props.setCatalogueComponent(array)
  }

  setCards (list) {
    let i
    let array = []
    for (i = 0; i < list.length; i++) {
      let cardType
      let cardTypeClass = ''
      let numValidation = validator.number(list[i].num)
      if (numValidation.isPotentiallyValid && numValidation.isValid) {
        if (numValidation.card.type === 'visa') {
          cardType = <img src={visaLogo} role='presentation' />
          cardTypeClass = 'Modal--choosepayment--cardType--visa'
        } else if (numValidation.card.type === 'master-card') {
          cardType = <img src={mastercardLogo} role='presentation' />
          cardTypeClass = 'Modal--choosepayment--cardType--mastercard'
        }
      }
      let cardNum = list[i].num
      let j
      for (j = 0; j < cardNum.length - 4; j++) {
        cardNum = cardNum.replace(cardNum[j], '*')
      }
      cardNum = cardNum.substr(0, 4) + ' ' + cardNum.substr(4)
      cardNum = cardNum.substr(0, 9) + ' ' + cardNum.substr(9)
      cardNum = cardNum.substr(0, 14) + ' ' + cardNum.substr(14)

      array[i] = (
        <div className='Modal--choosepayment--cards--each' key={i} id={'card:' + i}
          onClick={this.handleSelectCardClick}>
          <div className={cardTypeClass} id={'cardChild:' + i}/>
          <div className='Modal--choosepayment--cardcontent' id={'cardChild:' + i}>
            <div className='Modal--choosepayment--cardLogoDiv' id={'cardChild:' + i}>
              <div className='Modal--choosepayment--cardLogo' id={'cardChild:' + i}>{cardType}</div>
            </div>
            <div className='Modal--choosepayment--cardInfoDiv' id={'cardChild:' + i}>
              <p className='Modal--choosepayment--cardInfoDiv--cardType' id={'cardChild:' + i}>{numValidation.card.niceType}</p>
              <p style={ {height: '50%', width: '100%'} } id={'cardChild:' + i}>
                <span className='Modal--choosepayment--cardInfoDiv--cardNum' id={'cardChild:' + i}>{cardNum}</span>
                <span style={ {position: 'absolute', right: '5%'} } id={'cardChild:' + i}>Exp: {list[i].expM}/{list[i].expY}</span>
              </p>
            </div>
          </div>
        </div>
      )
    }
    this.props.setCardsComponent(array)
  }

  getmechanic (directionsService, directionsDisplay) {
    let i = 0
    let lat = []
    let lng = []
    let that = this
    let distance = []
    let count = 0
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Location').once('value').then(function (snapshot) {
      pickupLat = snapshot.val().PickupLatitude
      pickupLng = snapshot.val().PickupLongitude
    })
    firebase.database().ref('/mechanic/').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        lat[i] = childSnapshot.val().location.latitude
        lng[i] = childSnapshot.val().location.longitude
        mechid[i] = childSnapshot.key
        i++
      })
    }).then(() => {
      function sortMechanicDistance (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
          distance[i] = CalcDistance(directionsDisplay.getDirections())
        } else if (status === 'OVER_QUERY_LIMIT') {
          console.log('Directions request failed due to ' + status)
        } else {
          console.log(status)
        }
        count++
        if (count === mechid.length) {
          let temp = -1
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < i; j++) {
              if (distance[i] < distance[j]) {
                temp = distance[i]
                distance[i] = distance[j]
                distance[j] = temp
                temp = mechid[i]
                mechid[i] = mechid[j]
                mechid[j] = temp
              }
            }
          }
          console.log(distance)
          that.props.getmechanic(distance)
          that.handleReqOpen()
          that.checkMechAvail()
        }
      }
      for (let i = 0; i < mechid.length; i++) {
        directionsService.route({
          origin: {lat: pickupLat, lng: pickupLng},
          // destination: (new googleMaps.LatLng(deslat, deslng)),
          destination: {lat: lat[i], lng: lng[i]},
          travelMode: 'DRIVING',
          optimizeWaypoints: true
        }, function (response, status) {
          sortMechanicDistance(response, status)
        })
        shouldRerender = false
      }
    })
    shouldRerender = false
  }

  getDesLocat (callback) {
    let deslocat = {
      lat: 0,
      lng: 0
    }
    desCoordRef.on('value', function (snapshot) {
      deslocat.lat = snapshot.val().lat
      deslocat.lng = snapshot.val().lng
      callback(deslocat)
    })
  }

//    Read from GPS
  getUsersCurrentLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setUsersCurrentLocation)
    }
  }
// Get from DB
  setUsersCurrentLocation (position) {
    userCurrentLat = parseFloat(position.coords.latitude)
    userCurrentLng = parseFloat(position.coords.longitude)
    console.log(userCurrentLat + ' ' + userCurrentLng)
    localStorage.setItem('firstLoadLat', userCurrentLat)
    localStorage.setItem('firstLoadLng', userCurrentLng)
  }
  getModalComponent () {
    // console.log('showService: ' + this.props.umap.showServiceSelectModal)
    // console.log('showModal: ' + this.props.umap.ShowModal)
    if (this.props.umap.showServiceSelectModal && this.props.umap.ShowModal) {
      return (
        <div>
          <Modal
            isOpen={this.props.umap.ShowModal}
            className='col-9 Modal--service--select'
            overlayClassName='Modal--service--select--overlay'
            contentLabel='Choose Service Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--service--select--content'>
              <div className='Modal--service--select--header'>
                <div className='Modal--service--select--close' onClick={this.handleChooseServiceClose}>&times;</div>
              </div>
              <div className='Modal--service--select--body'>
                <p className='Modal--service--guideText'>Please choose which service you want to order</p>
                <div className='Modal--services' id='Modal--services'
                  onLoad={this.onServiceLoad} onClick={this.handleServiceClickAuto}>
                  <div className='Modal--service--name--text'>Inspect & Repair</div>
                  <img className='Modal--service--inspect--image' alt='' src={serviceAutoImg}/>
                </div>
                <div className='Modal--services' id='Modal--services2'
                  onLoad={this.onServiceLoad} onClick={this.handleServiceClickManual}>
                  <div className='Modal--service--name--text'>Manually select services</div>
                  <div className='col-12 Modal--service--manual'>
                    <div style={ {position: 'relative'} }>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices1' className='service-checkbox'
                          id='checkbox1'/>
                        <div className='service-choice-text'>Repair car</div>
                      </div>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices2' className='service-checkbox'
                          id='checkbox2'/>
                        <div className='service-choice-text'>Need car part(s)</div>
                      </div>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices3' className='service-checkbox'
                          id='checkbox3'/>
                        <div className='service-choice-text'>Need tow car</div>
                      </div>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices4' className='service-checkbox'
                          id='checkbox4'/>
                        <div className='service-choice-text'>Need driver</div>
                      </div>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices5' className='service-checkbox'
                          id='checkbox5'/>
                        <div className='service-choice-text'>Align wheel(s)</div>
                      </div>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices6' className='service-checkbox'
                          id='checkbox6'/>
                        <div className='service-choice-text'>Replace tire(s)</div>
                      </div>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices7' className='service-checkbox'
                          id='checkbox7'/>
                        <div className='service-choice-text'>Replace engine fluid</div>
                      </div>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices8' className='service-checkbox'
                          id='checkbox8'/>
                        <div className='service-choice-text'>Tune up</div>
                      </div>
                      <div className='service-choice'>
                        <input type='checkbox' name='service-choices9' className='service-checkbox'
                          id='checkbox9'/>
                        <div className='service-choice-text'>Not sure what happened, Need mechanic to check</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='Modal--service--select--footer'>
                <div>
                  <button className='Modal--service--select--order--btn' onClick={this.handleOrderClick}>Order</button>
                  <button className='Modal--service--select--btn' onClick={this.handleChooseServiceClose}>Close</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )
    } else if (this.props.umap.ShowModal && !this.props.umap.offeredQuot) {
      return (
        <div>
          <Modal
            isOpen={this.props.umap.ShowModal}
            onAfterOpen={this.setModalTimeout}
            className='col-6 Modal--matching'
            overlayClassName='Modal--matching--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--matching--content'>
              <div className='Modal--matching--header'>
                <div className='Modal--matching--close' onClick={this.handleReqClose}>&times;</div>
              </div>
              <div className='Modal--matching--body'>
                {this.props.umap.output}
              </div>
              <div className='Modal--matching--footer'>
                <div>
                  <button className='Modal--matching--btn' onClick={this.handleReqClose}>Cancel</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )
    } else if (this.props.umap.ShowModal && this.props.umap.acceptQuotClick &&
              !this.props.umap.paymentProcess && !this.props.umap.paymentComplete) {
      shouldRerender = false
      // console.log('CARDS: ' + this.props.umap.firebaseCards)
      return (
        <div>
          <Modal
            isOpen={this.props.umap.ShowModal}
            className='Modal--viewQuot'
            overlayClassName='Modal--viewQuot--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--viewQuot--content'>
              <div className='Modal--choosepayment--header'>
                <p className='Modal--choosepayment--headerText'>Choose your payment method</p>
              </div>
              <div className='Modal--choosepayment--body'>
                {this.props.umap.cards}
              </div>
              <div className='Modal--choosepayment--footer'>
                <button className='Modal--choosepayment--continue--btn'
                  onClick={this.handlePaymentClick}>Checkout</button>
                <button className='Modal--choosepayment--back--btn'
                  onClick={this.handleBackClick}>Back</button>
                <form id='checkout-form' action='/api/omise' method='POST'>
                  <input type='hidden' name='omiseToken'/>
                  <input type='text' id='checkout-form-number' data-name='cardNumber'
                    value='' style={ {visibility: 'hidden'} }/>
                  <input type='text' id='checkout-form-name' data-name='nameOnCard'
                    value='' style={ {visibility: 'hidden'} }/>
                  <input type='text' id='checkout-form-expm' data-name='expiryMonth'
                    value='' style={ {visibility: 'hidden'} }/>
                  <input type='text' id='checkout-form-expy' data-name='expiryYear'
                    value='' style={ {visibility: 'hidden'} }/>
                  <input type='text' id='checkout-form-code' data-name='securityCode'
                    value='' style={ {visibility: 'hidden'} }/>
                  <button type='button' id='checkout-form-button' style={ {visibility: 'hidden'} }/>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      )
    } else if (this.props.umap.ShowModal && this.props.umap.paymentProcess) {
      return (
        <div>
          <Modal
            isOpen={this.props.umap.ShowModal}
            // onAfterOpen={this.setModalTimeout}
            className='col-6 Modal--paying'
            overlayClassName='Modal--paying--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--paying--content'>
              <div className='Modal--paying--header'>
              </div>
              <div className='Modal--paying--body'>
                <img src={successIcon} className='successImg' alt=''/>
                <div className='Modal--paying--body--text'>
                  Transaction completed
                </div>
              </div>
              <div className='Modal--paying--footer'>
                <button className='Modal--paying--btn'
                  onClick={this.handleNextClick}>Continue</button>
              </div>
            </div>
          </Modal>
        </div>
      )
    } else if (this.props.umap.ShowModal && this.props.umap.paymentComplete) {
      shouldRerender = false
      return (
        <div>
          <Modal
            isOpen={this.props.umap.ShowModal}
            className='col-6 Modal--paying'
            overlayClassName='Modal--paying--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--paying--content'>
              <div className='Modal--paying--header'>
              </div>
              <div className='Modal--paying--body'>
                <p className='Modal--viewQuot--body--headerText'>Rate this mechanic</p>
                <Rating {...this.props}>
                  {this.props.children}
                </Rating>
                <div className='Modal--paying--body--text'>
                  Your responses will be used to improve our service providing.
                </div>
              </div>
              <div className='Modal--paying--footer'>
                <button className='Modal--paying--btn'
                  onClick={this.handleFinishClick}>Finish</button>
              </div>
            </div>
          </Modal>
        </div>
      )
    } else if (this.props.umap.ShowModal && this.props.umap.offeredQuot) {
      return (
        <div>
          <Modal
            isOpen={this.props.umap.ShowModal}
            className='Modal--viewQuot'
            overlayClassName='Modal--viewQuot--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--viewQuot--content'>
              <div className='Modal--viewQuot--header'>
              </div>
              <div className='Modal--viewQuot--body'>
                <p className='Modal--viewQuot--body--headerText'>Catalogue</p>
                <div className='Modal--viewQuot--list'>
                  <div className='list--header'>
                    <div className='list--header--desc'>Description</div>
                    <div className='list--header--price'>Price</div>
                  </div>
                  {
                    this.props.umap.catalogue
                  }
                  <div style={ {width: '60%', display: 'inline-block'} }/>
                  <div className='priceSummary'>0</div>
                </div>
              </div>
              <div className='Modal--viewQuot--footer'>
              <div className='byClicking--text'>By clicking 'Accept', you will proceed to a payment process.</div>
                <div>
                  <button className='Modal--viewQuot--accept--btn'
                    onClick={this.handleAcceptQuotClick}
                  >Accept</button>
                  <button className='Modal--viewQuot--cancel--btn'
                    onClick={this.handleReqClose}>Cancel</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )
    }
  }
  handleOrderClick () {
    this.props.checkChosenService()
    this.props.closemodal()       //  close choose servicee type modal
    this.props.openmodal()        //  and open complete modal
    // this.getmechanic(this.props.umap.directionsService, this.props.umap.directionsDisplay)
    shouldRerender = true
  }
  getCookie (cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
  checkMechAvail () {
    // console.log(this.props.umap.distance)
    console.log(this.props.umap.distance + ' ' + this.props.umap.distance.length + '[] and length')
    let j = 0
    let that = this
    function checkMechanicActive (snapshot, i) {
      if (snapshot.val().Service.Status === 'Active' && snapshot.val().Service.State === 0) {
        // this checks that whether mechanic is active or not and whether currently accepted a call or not
        reserved[i] = false     //  if yes, reserve = false
      } else {
        reserved[i] = true      //  if not, reserve = true
      }
    }
    function fetchMechanic (i) {
      if (i === mechid.length - 1) {
        while (j < mechid.length) {
          if (isMatching) {
            let output = (
              <div>
                <Spinner name='double-bounce' color='#0047BA' className='Modal--matching--spinner' style={ {width: '128px', height: '128px'} }/>
                <div className='Modal--matching--body--text'>
                  Finding mechanic...
                </div>
              </div>
            )
            that.props.Loading(output)
          }
          if (reserved[j] === false) {    //  if a mechanic is still available
            firebase.database().ref('/mechanic/' + mechid[j] + '/Service').update({
              CallerID: firebase.auth().currentUser.uid,
              State: 3
            })
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').update({
              MechanicID: mechid[j]
            })
            isMatching = false
            let output = (                       //  found-a-mechanic modal
              <div>
                <img src={successIcon} className='successImg' alt=''/>
                <div className='Modal--matching--body--text'>
                  You've paired with a mechanic!
                </div>
              </div>
            )
            that.props.MechAva(output, mechid[j])
            break
          } else {                                //  No-mechanic-available modal
            j++
            if (j === mechid.length) {
              let output = (
                <div>
                  <img className='not_available_img' src={notAvailImg} alt=''/>
                  <div className='Modal--matching--body--text'>
                    No mechanic is avaliable at this time. Please try again later
                  </div>
                </div>
              )
              // localStorage.setItem('userStatusText', '')
              that.props.setUserStatus('')
              isMatching = false
              that.props.NoMechAva(output)
            }
          }
        }
        shouldRerender = false
      } else {
        let output = (
          <div>
            <Spinner name='double-bounce' color='#0047ba' className='Modal--matching--spinner' style={ {width: '128px', height: '128px'} }/>
            <div className='Modal--matching--body--text'>
             Loading...
           </div>
          </div>
        )
        that.props.Loading(output)
        isMatching = false
      }
    }
    for (let i = 0; i < mechid.length; i++) {
      // console.log(mechid[i])
      firebase.database().ref('/mechanic/' + mechid[i]).once('value', function (snapshot) {
        checkMechanicActive(snapshot, i)
      }).then(() => {
        fetchMechanic(i)
      })
      shouldRerender = false
    }
  }

  render () {
    let that = this
    // if (pickupLat !== '-1') {
    //   shouldRerender = false
    // } else {
    //   shouldRerender = true
    // }
    if (this.props.umap.ShowModal) {
      shouldRerender = true
    } else {
      shouldRerender = false
    }

    localStorage.setItem('mechanicID', that.props.umap.mechid)

    // console.log(this.props.umap.distance)
    // Upper Control =================================================
    // let upperControlDiv = document.createElement('div')
    // upperControlDiv.className = 'col-6 upperControl--div'
    // upperControlDiv.appendChild(searchDiv)
    // =====================================================================================

    //  Top Right Control =============================================
    let topRightControlDiv = document.createElement('div')
    topRightControlDiv.className = 'topRightControl--div'

    // let findLocationButton = document.createElement('button')
    // findLocationButton.className = 'topRightControl--button'

    // let findLocationImg = document.createElement('img')
    // findLocationImg.src = findLocationImage
    // findLocationImg.className = 'findLocationImg'
    // findLocationButton.appendChild(findLocationImg)

    // let cancelMechanicButton = document.createElement('button')
    // cancelMechanicButton.className = 'cancelMechanicButton'
    // let cancelMechanicIcon = document.createElement('img')
    // cancelMechanicIcon.src = cancelMechanicImg
    // cancelMechanicIcon.className = 'cancelMechanicIcon'
    // cancelMechanicButton.appendChild(cancelMechanicIcon)
    // cancelMechanicButton.addEventListener('click', () => {
    //   this.props.resetFirebaseData()
    // })
    // =====================================================================================

    //  Bottom Control ================================================
    let bottomControlDiv = document.createElement('div')
    bottomControlDiv.className = 'col-4 bottomControl--div'
    let searchDiv = document.createElement('div')
    searchDiv.className = 'searchDiv'
    let searchInput = document.createElement('input')
    searchInput.placeholder = 'Search my places'
    searchInput.className = 'searchBox'
    let xButton = document.createElement('img')
    xButton.className = 'xImg'
    xButton.src = xBtn
    xButton.title = 'Clear search'
    let findImg = document.createElement('img')
    findImg.className = 'findImg'
    findImg.src = findIcon
    findImg.title = 'Find entered places'
    searchDiv.appendChild(searchInput)
    searchDiv.appendChild(findImg)
    searchDiv.appendChild(xButton)
    // let centerControlUI = document.createElement('button')
    // centerControlUI.className = 'centerControlUI'
    // centerControlUI.title = 'Click to recenter the map'
    // let centerControlText = document.createElement('div')
    // centerControlText.className = 'centerControlText'
    // centerControlText.innerHTML = 'Find My Location'
    // let setMarkerUI = document.createElement('button')
    // setMarkerUI.className = 'setMarkerUI'
    // setMarkerUI.title = 'Click to manually set where you want to meet a mechanic'
    // let setMarkerText = document.createElement('div')
    // setMarkerText.className = 'setMarkerText'
    // setMarkerText.innerHTML = 'Set Service Location'
    let findMatchBtn = document.createElement('button')
    findMatchBtn.className = 'findMatchBtn'
    findMatchBtn.title = 'Start matching with mechanic'
    let findMatchBtnText = document.createElement('span')
    findMatchBtnText.innerHTML = 'Find Automart Staff'
    let goImg = document.createElement('img')
    goImg.className = 'goImg'
    goImg.src = goIcon
    findMatchBtn.appendChild(findMatchBtnText)
    findMatchBtn.appendChild(goImg)
    bottomControlDiv.appendChild(searchDiv)
    // bottomControlDiv.appendChild(centerControlUI)
    // bottomControlDiv.appendChild(setMarkerUI)
    // =====================================================================================

    //  Mechanic Info ================================================
    let mechanicInfoBOTTOMDiv = document.createElement('div')
    mechanicInfoBOTTOMDiv.className = 'col-5 mechanicInfo_BOTTOMDiv'
    let mechanicHeader = document.createElement('div')
    mechanicHeader.className = 'mechanicHeader'
    let mechanicHeaderText = document.createElement('div')
    mechanicHeaderText.className = 'mechanicHeaderText'
    mechanicHeaderText.innerText = 'Mechanic'
    mechanicHeader.appendChild(mechanicHeaderText)

    let mechanicInfo = document.createElement('div')
    mechanicInfo.className = 'mechanicInfo'
    let mechanicPhotoDiv = document.createElement('span')
    mechanicPhotoDiv.className = 'mechanicPhotoDiv'
    let mechanicPhotoThumbnail = document.createElement('img')
    // mechanicPhotoThumbnail.src = mechanicPhoto
    mechanicPhotoThumbnail.className = 'mechanicPhoto'
    mechanicPhotoDiv.appendChild(mechanicPhotoThumbnail)
    let mechanicInfoTextDiv = document.createElement('span')
    mechanicInfoTextDiv.className = 'mechanicInfoTextDiv'

    let mechanicInfoTextInnerDiv = document.createElement('div')
    mechanicInfoTextInnerDiv.className = 'mechInfoTextInnerDiv'

    let mechanicInfoText = document.createElement('div')
    mechanicInfoText.className = 'mechanicInfoText'
    let mechName = document.createElement('span')
    mechName.className = 'mechanicName'
    mechanicInfoText.appendChild(mechName)
    mechanicInfoTextInnerDiv.appendChild(mechanicInfoText)

    let mechanicInfoText1 = document.createElement('div')
    mechanicInfoText1.className = 'mechanicInfoText'
    let mechPerksIcon = document.createElement('img')
    mechPerksIcon.className = 'mechanicPerksIcon'
    mechPerksIcon.src = perkIcon
    mechanicInfoText1.appendChild(mechPerksIcon)
    let mechPerks = document.createElement('span')
    mechPerks.className = 'mechanicPerksText'
    mechanicInfoText1.appendChild(mechPerks)
    mechanicInfoTextInnerDiv.appendChild(mechanicInfoText1)

    let mechanicInfoText2 = document.createElement('div')
    mechanicInfoText2.className = 'mechanicInfoText'
    let mechsRate = document.createElement('img')
    mechsRate.className = 'mechanicsRate'
    let mechanicNotRatedText = document.createElement('div')
    mechanicInfoTextInnerDiv.appendChild(mechanicInfoText2)

    let mechanicInfoText3 = document.createElement('div')
    mechanicInfoText3.className = 'mechanicInfoText'
    let mechInfo3 = document.createElement('span')
    mechInfo3.innerText = 'Operated by'
    mechanicInfoText3.appendChild(mechInfo3)
    mechanicInfoTextInnerDiv.appendChild(mechanicInfoText3)

    let mechanicInfoText4 = document.createElement('div')
    mechanicInfoText4.className = 'mechanicInfoText'
    let mechGarageName = document.createElement('span')

    let garageOpenClose = document.createElement('span')
    mechanicInfoText4.appendChild(mechGarageName)
    mechanicInfoText4.appendChild(garageOpenClose)
    mechanicInfoTextInnerDiv.appendChild(mechanicInfoText4)

    if (this.props.umap.offeredQuot) {        // if a mechanic offered user a quotation
      // localStorage.setItem('userStatusText', 'Mechanic has offered you a price quotation')
      let viewQuotationBtn = document.createElement('button')
      viewQuotationBtn.className = 'viewQuatation--button'
      viewQuotationBtn.innerText = 'View quotation'
      viewQuotationBtn.addEventListener('click', () => {
        this.props.getCatalogueFromFirebase()
        this.setCatalogue(this.props.umap.firebaseCatalogue)
        setTimeout(() => {
          this.handleReqOpen()
        }, 1000)
      })
      // mechanicHeader.appendChild(viewQuotationBtn)
    }

    mechanicInfoTextDiv.appendChild(mechanicInfoTextInnerDiv)

    mechanicInfo.appendChild(mechanicInfoTextDiv)
    mechanicInfo.appendChild(mechanicPhotoDiv)
    mechanicInfoBOTTOMDiv.appendChild(mechanicHeader)
    mechanicInfoBOTTOMDiv.appendChild(mechanicInfo)
    // =====================================================================================

    // Cache location
    // localStorage.setItem('firstLoadLat', 13.806014)
    // localStorage.setItem('firstLoadLng', 100.567660)

    let cachedLocationLat = parseFloat(localStorage.getItem('firstLoadLat'))
    let cachedLocationLng = parseFloat(localStorage.getItem('firstLoadLng'))
    // let cachedLocationLat = 13.806014
    // let cachedLocationLng = 100.567660

    let cachedPickupLat = parseFloat(localStorage.getItem('pickupLat'))
    let cachedPickupLng = parseFloat(localStorage.getItem('pickupLng'))
    // let cachedPickupLat = 13.816014
    // let cachedPickupLng = 100.557660
    let cachedPickupPlace = localStorage.getItem('pickupPlace')

    // const oriURL = {lat: 13.806014, lng: 100.567660}
    // const desURL = {lat: 13.756802, lng: 100.568274}
    // const reqURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + String(oriURL.lat) + ',' + String(oriURL.lng) + '&destinations=' + String(desURL.lat) + ',' + String(desURL.lng) + '&key=' + String(MY_API_KEY)

    // let distance = 0
    // let isPickupBtnOn = false

    let coors = [         //  an array of pins
      {
        title: 'User\'s location',
        position: {
          lat: cachedLocationLat,
          lng: cachedLocationLng
        },
        onLoaded: (googleMaps, map, marker) => {
          this.getUsersCurrentLocation()    //  assign userCurrentLat & userCurrentLng using location read from GPS
          this.getDesLocat(function (deslocat) {
            deslat = deslocat.lat
            deslng = deslocat.lng
            console.log('deslatlng: ' + deslat + ' ' + deslng)
          })
          // marker.setAnimation(googleMaps.Animation.BOUNCE)
          marker.setIcon(trackerIcon)
          marker.setPosition(new googleMaps.LatLng(cachedLocationLat, cachedLocationLng))

          // googleMaps.event.addListener(marker, 'mouseover', () => {
          //   marker.setAnimation(null)
          // })

          // googleMaps.event.addListener(marker, 'mouseout', () => {
          //   marker.setAnimation(googleMaps.Animation.BOUNCE)
          // })
        }
      },
      {
        title: 'Pickup location',
        position: {
          lat: cachedPickupLat,
          lng: cachedPickupLng
        },
        draggable: true,
        onLoaded: (googleMaps, map, marker) => {
          let geocoder = new googleMaps.Geocoder()
          marker.setIcon(pickupIcon)
          if (this.props.umap.isMatched) {
            marker.draggable = false
          }
          if (this.getCookie('picklat') !== -1) {         //    if did set location
            map.addListener('click', function (event) {
              // if (isPickupBtnOn) {
              //   marker.setPosition(event.latLng)
              //   isPickupBtnOn = false
              //   that.props.setlocation(event.latLng.lat(), event.latLng.lng())
              //   geocoder.geocode({'location': event.latLng}, function (results, status) {
              //     if (status === 'OK') {
              //       searchInput.value = results[0].formatted_address
              //       localStorage.setItem('pickupPlace', results[0].formatted_address)
              //       xButton.style = 'visibility: visible'
              //     }
              //   })
              // }
              if (!that.props.umap.isMatched) {
                marker.setPosition(event.latLng)
                // isPickupBtnOn = false
                that.props.setlocation(event.latLng.lat(), event.latLng.lng())
                geocoder.geocode({'location': event.latLng}, function (results, status) {
                  if (status === 'OK') {
                    searchInput.value = results[0].formatted_address
                    localStorage.setItem('pickupPlace', results[0].formatted_address)
                    xButton.style = 'visibility: visible'
                  }
                })
              }
            })
          } else {          //    if did NOT set location
            map.addListener('click', function (event) {
              if (!that.props.umap.ShowModal) {
                marker.setIcon(pickupIcon)
                marker.setPosition(new googleMaps.LatLng(pickupLat, pickupLng))
                // isPickupBtnOn = false
              }
            })
          }
          marker.addListener('dragend', function (event) {
            that.props.setlocation(event.latLng.lat(), event.latLng.lng())
            localStorage.setItem('pickupLat', event.latLng.lat())
            localStorage.setItem('pickupLng', event.latLng.lng())
            geocoder.geocode({'location': event.latLng}, function (results, status) {
              if (status === 'OK') {
                searchInput.value = results[0].formatted_address
                localStorage.setItem('pickupPlace', results[0].formatted_address)
                xButton.style = 'visibility: visible'
              }
            })
          })
        }
      }
    ]
    const Map = ({googleMaps}) => (
      <div className='map' id='map_wrapper'>
        <GoogleMap
          googleMaps={googleMaps}
          coordinates={coors}
          center={
          { lat: cachedLocationLat,
            lng: cachedLocationLng }
          }
          zoom={14}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          disableDefaultUI={true}
          zoomControl={true}
          preserveViewport={true}
          onLoaded={(googleMaps, map, marker) => {
            function onFabClickListener () {
              firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/UI').on('child_changed', function (snapshot) {
                let isResetClick = snapshot.val()
                if (isResetClick === true) {
                  // console.log('resetPos: ' + isResetClick)
                  map.panTo(new googleMaps.LatLng(cachedLocationLat, cachedLocationLng))
                  that.props.resetFindPosBtn()
                }
              })

              firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').on('child_changed', function (snapshot) {
                let viewClick = snapshot.val()
                if (viewClick === true) {
                  that.props.getCatalogueFromFirebase()
                  setTimeout(() => {
                    that.setCatalogue(that.props.umap.firebaseCatalogue)
                    that.handleReqOpen()
                  }, 250)
                  that.props.resetViewQuotBtn()
                }
              })
            }
            onFabClickListener()

            // shouldRerender = true
            // console.log('1:: ' + this.props.umap.isResetPositionClick)
            // console.log('2:: ' + that.props.umap.isResetPositionClick)
            // console.log('3:: ' + shouldRerender)
            // if (that.props.umap.isResetPositionClick) {
            //   console.log('umap haha:')
            //   map.panTo(new googleMaps.LatLng(cachedLocationLat, cachedLocationLng))
            // }

            // function CalcAndDispRoute (directionsService, directionsDisplay, event) {
            //   directionsService.route({
            //     origin: {lat: cachedLocationLat, lng: cachedLocationLng},
            //     // destination: (new googleMaps.LatLng(deslat, deslng)),
            //     destination: (new googleMaps.LatLng(that.getCookie('picklat'), that.getCookie('picklng'))),
            //     travelMode: 'DRIVING',
            //     optimizeWaypoints: true
            //   }, function (response, status) {
            //     if (status === 'OK') {
            //       directionsDisplay.setOptions({ preserveViewport: true })
            //       directionsDisplay.setDirections(response)
            //     } else {
            //       console.log('Directions request failed due to ' + status)
            //     }
            //   })
            // }
            // function CalcDistance (result) {
            //   let routeDistance = 0
            //   let route = result.routes[0]
            //   for (let i = 0; i < route.legs.length; i++) {
            //     routeDistance += route.legs[i].distance.value
            //   }
            //   routeDistance /= 1000
            //   // distance = routeDistance
            // }

            // function CenterControl (bottomControlDiv, map) {
            //   bottomControlDiv.appendChild(centerControlUI)
            //   centerControlUI.appendChild(centerControlText)
            //   centerControlUI.addEventListener('click', function () {
            //     map.panTo(new googleMaps.LatLng(cachedLocationLat, cachedLocationLng))
            //   })
            // }
            // function SetPickup (bottomControlDiv) {
            //   bottomControlDiv.appendChild(setMarkerUI)
            //   setMarkerUI.appendChild(setMarkerText)
            //   setMarkerUI.addEventListener('click', function () {   //  when click 'Set Pickup Location' button
            //     if (!isPickupBtnOn) {           //  btn: On
            //       setMarkerText.innerHTML = 'Select a Location...'
            //       setMarkerUI.style.border = '2px solid #E5BB12'
            //       setMarkerUI.style.backgroundColor = '#E5BB12'
            //       isPickupBtnOn = true
            //     } else if (isPickupBtnOn) {
            //       setMarkerText.innerHTML = 'Set Service Location'
            //       setMarkerUI.style.border = '2px solid #191919'
            //       setMarkerUI.style.backgroundColor = '#191919'
            //       isPickupBtnOn = false
            //     }
            //   })
            // }
            map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)

            //    Draw Route ===================================================
            let directionsService = new googleMaps.DirectionsService()
            let directionsDisplay = new googleMaps.DirectionsRenderer({
              draggable: false
            })
            // ====================================================================================

            //    Center Control Button ===================================
            // CenterControl(bottomControlDiv, map)
            // findLocationButton.addEventListener('click', () => {
            //   map.panTo(new googleMaps.LatLng(cachedLocationLat, cachedLocationLng))
            // })
            // ====================================================================================

            //      Set Pickup Button ======================================
            // SetPickup(bottomControlDiv)

            bottomControlDiv.appendChild(findMatchBtn)

            if (this.props.umap.isMatched) {
              mechName.innerText = this.props.umap.mechName
              mechPerks.innerText = this.props.umap.mechPerks
              if (this.props.umap.mechRating) {
                let rating = Math.round(parseFloat(this.props.umap.mechRating))
                if (rating === 5) {
                  mechsRate.src = star5
                } else if (rating === 4) {
                  mechsRate.src = star4
                } else if (rating === 3) {
                  mechsRate.src = star3
                } else if (rating === 2) {
                  mechsRate.src = star2
                } else if (rating === 1) {
                  mechsRate.src = star1
                } else if (rating === 0) {
                  mechsRate.src = star0
                }
                mechanicInfoText2.appendChild(mechsRate)
              } else {
                mechanicNotRatedText.innerText = 'Mechnanic has not been rated yet'
                mechanicNotRatedText.className = 'mechanicNotRated'
                mechanicInfoText2.appendChild(mechanicNotRatedText)
              }
              // mechRating.innerText = this.props.umap.mechRating
              mechGarageName.innerText = this.props.umap.mechGarageName + ' '
              garageOpenClose.innerText = '(Open ' + this.props.umap.mechGarageOpen + ' to ' +
                this.props.umap.mechGarageClose + ')'
              // mechCarModel.innerText = this.props.umap.mechCarModel
              // mechPlateNumber.innerText = this.props.umap.mechPlateNum
              // topRightControlDiv.appendChild(cancelMechanicButton)
              setTimeout(() => {
                mechanicPhotoThumbnail.src = this.props.umap.mechanicPhotoURL
              }, 1250)
              map.controls[googleMaps.ControlPosition.TOP_RIGHT].push(topRightControlDiv)
              map.controls[googleMaps.ControlPosition.BOTTOM_CENTER].push(mechanicInfoBOTTOMDiv)
            } else {
              // map.controls[googleMaps.ControlPosition.TOP_CENTER].push(upperControlDiv)
              // topRightControlDiv.appendChild(findLocationButton)
              map.controls[googleMaps.ControlPosition.TOP_RIGHT].push(topRightControlDiv)
              map.controls[googleMaps.ControlPosition.BOTTOM_CENTER].push(bottomControlDiv)
            }
            // ====================================================================================

            //      Search Box ============================================
            let searchUI = new googleMaps.places.SearchBox(searchInput)
            searchInput.value = cachedPickupPlace
            map.addListener('bounds_changed', function () {
              searchUI.setBounds(map.getBounds())
            })
            xButton.addEventListener('click', function () {
              searchInput.value = ''
              xButton.style = 'visibility: hidden'
            })

            let placeMarkers = []
            searchUI.addListener('places_changed', function () {
              xButton.style = 'visibility: visible'
              let places = searchUI.getPlaces()
              // console.log('places count = ' + places.length)
              if (places.length === 0) { return }
              placeMarkers.forEach(function (marker) {
                marker.setMap(null)
              })
              placeMarkers = []
              let bounds = new googleMaps.LatLngBounds()
              // if (!places[0].geometry) {
              //   alert('no geometry.')
              //   return
              // }
              // placeMarkers.push(new googleMaps.Marker({
              //   map: map,
              //   icon: placeMarkerIcon,
              //   title: places[0].name,
              //   position: places[0].geometry.location
              // }))
              // if (places[0].geometry.viewport) {
              //   bounds.union(places[0].geometry.viewport)
              // } else {
              //   bounds.extend(places[0].geometry.location)
              // }
              places.forEach(function (place) {
                if (!place.geometry) {
                  alert('Returned places contains no geometry.')
                  return
                }
                // let placeIcon = {
                //   // url: place.icon,     in case you wanna change place icon
                //   size: new googleMaps.Size(96, 96),
                //   origin: new googleMaps.Point(0, 0),
                //   anchor: new googleMaps.Point(17, 34),
                //   scaledSize: new googleMaps.Size(25, 25)
                // }
                placeMarkers.push(new googleMaps.Marker({
                  map: map,
                  icon: placeMarkerIcon,
                  title: place.name,
                  position: place.geometry.location
                }))
                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport)
                } else {
                  bounds.extend(place.geometry.location)
                }
              })
              map.fitBounds(bounds)
            })
            // ====================================================================================

            findMatchBtn.addEventListener('click', function (event) {
              pickupLat = cachedPickupLat
              pickupLng = cachedPickupLng
              // that.props.openmodal()
              that.props.openChooseServiceModal(directionsService, directionsDisplay)
              that.handleReqOpen()
              // if (!modalClick && pickupLat !== -1) {
              //   that.getmechanic(directionsService, directionsDisplay)
              //   shouldRerender = false
              // }
              shouldRerender = false
              that.getmechanic(directionsService, directionsDisplay)
            })
            map.addListener('click', function (event) {
              /* if (isPickupBtnOn) {
                that.props.setlocation(event.latLng.lat(), event.latLng.lng())
              //  that.handleReqOpen()
                shouldRerender = true
              //  CalcAndDispRoute(directionsService, directionsDisplay, event)
                setMarkerText.innerHTML = 'Set Service Location'
                setMarkerUI.style.border = '2px solid #191919'
                setMarkerUI.style.backgroundColor = '#191919'
                localStorage.setItem('pickupLat', event.latLng.lat())
                localStorage.setItem('pickupLng', event.latLng.lng())
              } */

              if (!that.props.umap.isMatched) {
                that.props.setlocation(event.latLng.lat(), event.latLng.lng())
                // shouldRerender = true
                //  CalcAndDispRoute(directionsService, directionsDisplay, event)
                localStorage.setItem('pickupLat', event.latLng.lat())
                localStorage.setItem('pickupLng', event.latLng.lng())
              }
            })
            // shouldRerender = false
          }}
        />
        {
          this.getModalComponent()
        }
      </div>
    )
    return (
      <Map {...this.props}/>
    )
  }
}

Map.propTypes = {
  googleMaps: PropTypes.object.isRequired
}

export default GoogleMapLoader(Map, {
  libraries: ['places', 'geometry'],
  key: MY_API_KEY
})

// export default Map

            // let newPos = new googleMaps.LatLng(13.766336, 100.570486)
            // let strPos = marker.getPosition()

            // let desLocat = new googleMaps.LatLng(deslat, deslng)
            // let strPos = new googleMaps.LatLng(userCurrentLat, userCurrentLng)

            // let animateMoveto = function(desLocat, strPos) {
            //     let str_lats = marker.getPosition().lat()
            //     let str_lngs = marker.getPosition().lng()
            //     // let str_lats = strPos.lat()
            //     // let str_lngs = strPos.lng()
            //     let deslats = deslat
            //     let deslngs = deslng
            //     window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
            //     window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFram

            //         if (deslngs > str_lngs) {
            //     if (Math.abs(deslngs - str_lngs) > 180) {
            //             deslngs -= 360
            //     }
            //     else {
            //             deslngs += 360
            //         }
            //     }

            //     let animateStep = function(marker, startTime) {
            //         let elapsedTime = (new Date()).getTime() - startTime
            //         let optionDuration = 1000.0    //    moving marker within this time (1000 => 1 second)
            //         let durationRatio = elapsedTime / optionDuration // 0 - 1
            //         let easingDurationRatio = durationRatio
            //     let deltaPosition
            //         if ( durationRatio < 1.0 ) {
            //             deltaPosition = new googleMaps.LatLng( str_lats + ((deslats - str_lats)*easingDurationRatio),
            //                                                       str_lngs + ((deslngs - str_lngs)*easingDurationRatio))

            //             if (window.requestAnimationFrame) {
            //                 marker.AT_animationHandler = window.requestAnimationFrame(function() {animateStep(marker, startTime)})
            //             }
            //             else {
            //                 marker.AT_animationHandler = setTimeout(function() {animateStep(marker, startTime)}, 17)
            //             }
            //     }
            //         else {
            //             deltaPosition = new googleMaps.LatLng( str_lats + (deslats - str_lats)*easingDurationRatio,
            //                                                       str_lngs + (deslngs - str_lngs)*easingDurationRatio)
            //         }
            //     marker.setPosition(deltaPosition)
            //     // map.setCenter(marker.getPosition())
            //     }

            //       if (window.cancelAnimationFrame) {
            //         window.cancelAnimationFrame(marker.AT_animationHandler)
            //     }
            //     else {
            //         clearTimeout(marker.AT_animationHandler)
            //     }

            //     animateStep( marker, (new Date()).getTime() )
            // }
