import React from 'react'
import './style.css'
import Modal from 'react-modal'
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'
import GoogleMap from 'react-google-map'
import GoogleMapLoader from 'react-google-maps-loader'
import ReactDatalist from 'react-datalist'

import trackerIcon from './img/circle_pin.png'
// import userPhoto from '../../components/Map/img/uvuv.jpg'
import contactIcon from './img/contact.png'
import cancelButton from './img/cancel_icon.png'
import pinnedPickup from './img/tracker.png'
import addBtnImg from './img/add_icon.png'
import deleteOrderImg from './img/delete_circle.png'

const MY_API_KEY = 'AIzaSyCnaiqR36Mg9fTiCBVpYdRoZNnv8bPargE'
// let userCurrentLat
// let userCurrentLng
let shouldRerender = true
class MechanicMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      MechLat: 0,
      MechLng: 0,
      isMatched: false,
      userFirstName: '',
      userLastName: '',
      mobileNum: '',
      userOrder: '',
      matchedPickupLat: 0,
      matchedPickupLng: 0,
      mechStatus: this.props.mech.mechStatus,
      orderName: '',
      orderQty: 0,
      contentList: [],
      catalogue: [],
      firebaseCatalogue: [],
      sumPrice: 0,
      offeredQuot: false,
      PhotoURL: ''
    }
    this.handleReqClose = this.handleReqClose.bind(this)
    this.handleReqOpen = this.handleReqOpen.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getCtrl = this.getCtrl.bind(this)
    this.onInputChanged = this.onInputChanged.bind(this)
    // this.checkNumeric = this.checkNumeric.bind(this)
    // this.getMechsCurrentLocation = this.getMechsCurrentLocation.bind(this)
    // this.setMechsCurrentLocation = this.setMechsCurrentLocation.bind(this)
  }

  componentDidMount () {
    // this.props.setCurrentLatLng()
    // setInterval(() => {
    //   this.props.setCurrentLatLng()
    // }, 1500000)
  }

  getCtrl (Controller) {
    // Controller.setFilter('SSS')
    // console.log(Controller.getState())
  }

  onInputChanged (event) {
    console.log('typed! ' + event.target.value)
  }

  shouldComponentUpdate () {
    return shouldRerender
  }

  handleReqClose () {
    shouldRerender = true
    this.props.inputChange('', 0)
    this.props.mechCloseModal()
  }
  handleReqOpen () {
    shouldRerender = true
    this.props.mechOpenModal()
  }
  checkNumeric (event) {
    let charCode = event.charCodeAt(0)
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      return false
    }
    return true
  }
  handleInputChange (event) {
    shouldRerender = false
    // let length = event.target.value.length
    let value = event.target.value
    // if (event.target.list === 'orderName') {
    //   this.props.inputChange(value, this.props.mech.orderQty)
    // } else
    if (event.target.name === 'orderQty') {
      // this.props.inputChange(this.props.mech.orderName, value)
      let length = event.target.value.length
      let isNumeric = this.checkNumeric(value.substr(length - 1, length))
      if (isNumeric) {
        this.props.inputChange(this.props.mech.orderName, value)
      } else {
        event.target.value = value.substr(0, length - 1)
      }
    } else {
      this.props.inputChange(value, this.props.mech.orderQty)
    }
  }
  handleAddClick () {
    // let name = document.getElementById('orderNameInput')
    let price = document.getElementById('orderQtyInput')
    if (this.props.mech.orderName !== '' && price.value !== '') {
      shouldRerender = true
      // name.value = ''
      this.props.resetOrderName()
      price.value = ''
      if (this.props.mech.offeredQuot) {
        this.props.addContentToList(this.props.mech.firebaseCatalogue, this.props.mech.orderName,
          this.props.mech.orderQty, this.props.mech.sumPrice
        )
        this.setCatalogue(this.props.mech.firebaseCatalogue)
      } else {
        this.props.addContentToList(this.props.mech.contentList, this.props.mech.orderName,
          this.props.mech.orderQty, this.props.mech.sumPrice
        )
        this.setCatalogue(this.props.mech.contentList)
      }
    } else { alert('Please enter both order description and price.') }
  }

  handleOfferClick () {
    this.props.onOfferClick(this.props.mech.contentList)
    this.handleReqClose()
  }

  // getMechsCurrentLocation () {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.setMechsCurrentLocation)
  //   }
  // }
  // setMechsCurrentLocation (position) {
  //   userCurrentLat = parseFloat(position.coords.latitude)
  //   userCurrentLng = parseFloat(position.coords.longitude)
  //   // localStorage.setItem('firstLoadLats', userCurrentLat)
  //   // localStorage.setItem('firstLoadLngs', userCurrentLng)
  // }

  handleRemoveClick (event) {
    if (this.props.mech.offeredQuot) {
      this.props.removeContentFromList(this.props.mech.firebaseCatalogue,
        this.props.mech.sumPrice, event.target.id)
      this.setCatalogue(this.props.mech.firebaseCatalogue)
    } else {
      this.props.removeContentFromList(this.props.mech.contentList,
        this.props.mech.sumPrice, event.target.id)
      this.setCatalogue(this.props.mech.contentList)
    }
  }

  setCatalogue (list) {
    let i
    let array = []
    for (i = 0; i < list.length; i++) {
      array[i] = (
        <div className='Modal--createquot--list--each' key={i} id={'listEach:' + i}>
          <div className='orderName--each'>{list[i].orderName}</div>
          <div className='orderQty--each'>{list[i].orderQty}</div>
          <img src={deleteOrderImg} id={i} className='orderDelete--img' alt=''
            onClick={(event) => { this.handleRemoveClick(event) }}/>
        </div>
      )
    }
    this.props.setCatalogueComponent(array)
  }

  getModalComponent () {
    if (this.props.mech.showModal && !this.props.mech.isMatched &&
        !this.props.mech.offeredQuot) {
      return (
        <div id='MechanicMap--wrapper'>
          <Modal
            isOpen={this.props.mech.showModal}
            className='Modal--waitaccept'
            overlayClassName='Modal--waitaccept--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--waitaccept--content'>
              <div className='Modal--waitaccept--header'>

              </div>
              <div className='Modal--waitaccept--body'>
                <Spinner name='wave' fadeIn='quarter' color='#F4F142'
                  className='Modal--waitaccept--spinner'
                  style={ {width: '128px', height: '128px'} }
                />
                <div className='Modal--waitaccept--body--text'>
                  You are being call by a customer. Would you like to accept the call?
                </div>
              </div>
              <div className='Modal--waitaccept--footer'>
                <div>
                  <button className='Modal--waitaccept--accept--btn'
                    onClick={() => { this.props.mechanicAcceptCall() } }>Accept</button>
                  <button className='Modal--waitaccept--cancel--btn'
                    onClick={() => { this.props.mechanicCancelCall() } }>Dismiss</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )
    } else if (this.props.mech.showModal && this.props.mech.isMatched &&
                !this.props.mech.offeredQuot) {
      let mockParts = ['Air duct', 'Air intake housing', 'Air intake manifold', 'Crank case',
        'Crank pulley', 'Distributor', 'Distributor cap', 'Drive belt', 'Engine block',
        'Engine cradle', 'Engine shake damper and vibration absorber', 'Engine valve', 'Fan belt',
        'Gudgeon pin (wrist pin)', 'Harmonic balancer', 'Heater', 'Mounting', 'Piston',
        'Poppet valve', 'PCV valve (positive crankcase ventilation valve)', 'Pulley part',
        'Rocker arm', 'Rocker cover', 'Starter motor', 'Turbocharger and supercharger',
        'Tappet', 'Timing tape', 'Valve cover', 'Valve housing', 'Valve spring', 'Valve stem seal',
        'Water pump pulley']
      return (
        <div id='MechanicMap--wrapper'>
          <Modal
            isOpen={this.props.mech.showModal}
            className='Modal--createquot'
            overlayClassName='Modal--createquot--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--createquot--content'>
              <div className='Modal--createquot--header'>
                {/* <div className='Modal--createquot--close'
                  onClick={this.handleReqClose}>&times;
                </div> */}
              </div>
              <div className='Modal--createquot--body'>
                <p className='Modal--createquot--body--headerText'>Catalogue</p>
                <div className='Modal--createquot--createDiv'>
                  {/* <input className='Modal--createquot--input' name='orderName' id='orderNameInput'
                    onChange={this.handleInputChange} placeholder='Replacement parts, Services'
                    autoFocus /> */}
                  <ReactDatalist list='fruits' options={mockParts} placeholder='Replacement parts, Services'
                    className='Modal--createquot--input' name='orderName' id='orderNameInput'
                    getController={this.getCtrl} onInputChange={this.handleInputChange}
                  />
                  &times;
                  <input type='text' className='Modal--createquot--priceinput' name='orderQty'
                    id='orderQtyInput' onChange={this.handleInputChange}
                    placeholder='Quantity' maxLength='7' />
                  <button className='Modal--createquot--plusbtn' onClick={this.handleAddClick}>
                    <img src={addBtnImg} alt=''/>
                  </button>
                </div>
                <div className='Modal--createquot--list'>
                  <div className='list--header'>
                    <div className='list--header--desc'>Description</div>
                    <div className='list--header--price'>Price</div>
                  </div>
                  {
                    this.props.mech.catalogue
                  }
                  <div style={ {width: '60%', display: 'inline-block'} }/>
                  <div className='priceSummary'>{this.props.mech.sumPrice}</div>
                </div>
              </div>
              <div className='Modal--createquot--footer'>
                <div>
                  <button className='Modal--createquot--accept--btn'
                    onClick={() => {
                      this.handleOfferClick()
                    }}
                  >Offer</button>
                  <button className='Modal--createquot--cancel--btn'
                    onClick={this.handleReqClose}>Cancel</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )
    } else if (this.props.mech.showModal && this.props.mech.isMatched &&
                this.props.mech.offeredQuot) {
      let mockParts = ['Air duct', 'Air intake housing', 'Air intake manifold', 'Crank case',
        'Crank pulley', 'Distributor', 'Distributor cap', 'Drive belt', 'Engine block',
        'Engine cradle', 'Engine shake damper and vibration absorber', 'Engine valve', 'Fan belt',
        'Gudgeon pin (wrist pin)', 'Harmonic balancer', 'Heater', 'Mounting', 'Piston',
        'Poppet valve', 'PCV valve (positive crankcase ventilation valve)', 'Pulley part',
        'Rocker arm', 'Rocker cover', 'Starter motor', 'Turbocharger and supercharger',
        'Tappet', 'Timing tape', 'Valve cover', 'Valve housing', 'Valve spring', 'Valve stem seal',
        'Water pump pulley']
      return (
        <div id='MechanicMap--wrapper'>
          <Modal
            isOpen={this.props.mech.showModal}
            className='Modal--createquot'
            overlayClassName='Modal--createquot--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal--createquot--content'>
              <div className='Modal--createquot--header'>
              </div>
              <div className='Modal--createquot--body'>
                <p className='Modal--createquot--body--headerText'>Catalogue</p>
                <div className='Modal--createquot--createDiv'>
                  {/* <input className='Modal--createquot--input' name='orderName' id='orderNameInput'
                    onChange={this.handleInputChange} placeholder='Replacement parts, Services'
                    autoFocus /> */}
                  <span>
                    <ReactDatalist list='fruits' options={mockParts} placeholder='Replacement parts, Services'
                      className='Modal--createquot--input' name='orderName' id='orderNameInput'
                      getController={this.getCtrl} onInputChange={this.handleInputChange}
                    />
                    &times;
                    <input type='text' className='Modal--createquot--priceinput' name='orderQty'
                      id='orderQtyInput' onChange={this.handleInputChange}
                      placeholder='Quantity' maxLength='7' />
                    <button className='Modal--createquot--plusbtn' onClick={this.handleAddClick}>
                      <img src={addBtnImg} alt=''/>
                    </button>
                  </span>
                </div>
                <div className='Modal--createquot--list'>
                  <div className='list--header'>
                    <div className='list--header--desc'>Description</div>
                    <div className='list--header--price'>Price</div>
                  </div>
                  {
                    this.props.mech.catalogue
                  }
                  <div style={ {width: '60%', display: 'inline-block'} }/>
                  <div className='priceSummary'>{this.props.mech.sumPrice}</div>
                </div>
              </div>
              <div className='Modal--createquot--footer'>
                <div>
                  <button className='Modal--createquot--accept--btn'
                    onClick={() => {
                      this.handleOfferClick()
                    }}
                  >Offer</button>
                  <button className='Modal--createquot--cancel--btn'
                    onClick={this.handleReqClose}>Cancel</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )
    }
  }

  getBottomDivComponent (userInfoBOTTOMDiv) {
    userInfoBOTTOMDiv.className = 'col-5 userInfo_BOTTOMDiv'

    let userHeader = document.createElement('div')
    userHeader.className = 'userHeader'
    let userHeaderText = document.createElement('div')
    userHeaderText.className = 'userHeaderText'
    userHeaderText.innerText = 'User'
    userHeader.appendChild(userHeaderText)

    let userCancelButton = document.createElement('img')
    userCancelButton.className = 'userCancel'
    userCancelButton.title = 'Dismiss this user'
    userCancelButton.src = cancelButton
    userCancelButton.addEventListener('click', () => {
      this.props.mechanicCancelCall()
    })
    let createQuotationBtn = document.createElement('button')
    createQuotationBtn.className = 'createQuatation--button'
    createQuotationBtn.innerText = 'Create quotation'
    if (this.props.mech.offeredQuot) {
      createQuotationBtn.innerText = 'Edit quotation'
    }
    createQuotationBtn.addEventListener('click', () => {
      if (this.props.mech.offeredQuot) {
        this.props.getCatalogueFromFirebase()
        this.setCatalogue(this.props.mech.firebaseCatalogue)
      }
      this.props.mechOpenModal()
    })
    userHeader.appendChild(createQuotationBtn)
    userHeader.appendChild(userCancelButton)

    let userInfo = document.createElement('div')
    userInfo.className = 'userInfo'
    let userPhotoDiv = document.createElement('span')
    userPhotoDiv.className = 'userPhotoDiv'
    let userPhotoThumbnail = document.createElement('img')
    // userPhotoThumbnail.src = userPhoto
    userPhotoThumbnail.src = this.props.mech.customerPhotoURL
    userPhotoThumbnail.className = 'userPhoto'
    userPhotoDiv.appendChild(userPhotoThumbnail)
    let userInfoTextDiv = document.createElement('span')
    userInfoTextDiv.className = 'userInfoTextDiv'

    let userInfoTextInnerDiv = document.createElement('div')
    userInfoTextInnerDiv.className = 'userInfoTextInnerDiv'

    let userInfoText1 = document.createElement('div')
    userInfoText1.className = 'userInfoText'
    let userName = document.createElement('span')
    userName.className = 'userName'
    userName.innerText = this.props.mech.userFirstName + ' ' + this.props.mech.userLastName
    userInfoText1.appendChild(userName)
    userInfoTextInnerDiv.appendChild(userInfoText1)

    let userInfoText2 = document.createElement('div')
    userInfoText2.className = 'userInfoText'
    let userContactIcon = document.createElement('img')
    userContactIcon.src = contactIcon
    userInfoText2.appendChild(userContactIcon)
    let userInfo2 = document.createElement('span')
    userInfo2.innerText = 'Contact: '
    userInfo2.className = 'userContactText'
    let userMobileNum = document.createElement('span')
    userMobileNum.innerText = this.props.mech.mobileNum
    userInfoText2.appendChild(userInfo2)
    userInfoText2.appendChild(userMobileNum)
    userInfoTextInnerDiv.appendChild(userInfoText2)

    let userInfoText3 = document.createElement('div')
    userInfoText3.className = 'userInfoText'
    let userInfo3 = document.createElement('span')
    userInfo3.innerText = 'Service requested: '
    userInfo3.className = 'userInfoBold'
    let userOrder = document.createElement('span')
    userOrder.innerText = this.props.mech.userOrder
    userInfoText3.appendChild(userInfo3)
    userInfoText3.appendChild(userOrder)
    userInfoTextInnerDiv.appendChild(userInfoText3)

    userInfoTextDiv.appendChild(userInfoTextInnerDiv)

    userInfo.appendChild(userInfoTextDiv)
    userInfo.appendChild(userPhotoDiv)
    userInfoBOTTOMDiv.appendChild(userHeader)
    userInfoBOTTOMDiv.appendChild(userInfo)
  }

  getToggleBtnComponent (userInfoBOTTOMDiv) {
    userInfoBOTTOMDiv.className = 'col-3 toggleActiveBtnDiv'
    let toggleActiveBtn = document.createElement('button')
    toggleActiveBtn.className = 'col-12 toggleActiveBtn'
    toggleActiveBtn.innerText = localStorage.getItem('toggleActive')
    toggleActiveBtn.title = 'Click to change to Active status'
    toggleActiveBtn.addEventListener('click', () => {
      this.props.toggleActive()
      setTimeout(() => {
        toggleActiveBtn.innerText = localStorage.getItem('toggleActive')
      }, 500)
    })

    userInfoBOTTOMDiv.appendChild(toggleActiveBtn)
  }

  render () {
    // let i
    // for (i = 0; i < this.props.mech.contentList.length; i++) {
    //   console.log('contentList[' + i + ']: ' + this.props.mech.contentList[i].orderName + ' ' +
    //     this.props.mech.contentList[i].orderQty)
    // }

    let that = this
    // console.log('showModal: ' + this.props.mech.showModal)
    // console.log('isMatched: ' + this.props.mech.isMatched)
    let cachedMechPositionLat = parseFloat(this.props.mech.MechLat)
    let cachedMechPositionLng = parseFloat(this.props.mech.MechLng)
    let cachedPickupPositionLat = parseFloat(this.props.mech.matchedPickupLat)
    let cachedPickupPositionLng = parseFloat(this.props.mech.matchedPickupLng)
    let coors = [
      {
        title: 'User\'s location',
        position: {
          lat: cachedMechPositionLat,
          lng: cachedMechPositionLng },
        onLoaded: (googleMaps, map, marker) => {
          marker.setIcon(trackerIcon)
        }
      },
      {
        title: 'Pickup location',
        position: {
          lat: cachedPickupPositionLat,
          lng: cachedPickupPositionLng
        },
        onLoaded: (googleMaps, map, marker) => {
          marker.setIcon(pinnedPickup)
          if (this.props.mech.isMatched) {
            marker.setPosition(new googleMaps.LatLng(
              this.props.mech.matchedPickupLat, this.props.mech.matchedPickupLng)
            )
          } else {
            marker.setPosition(new googleMaps.LatLng(0, 0))
          }
        }
      }
    ]
    const Map = ({googleMaps}) => (
      <div className='map' id='map_wrapper'>
        <GoogleMap
          googleMaps={googleMaps}
          coordinates={coors}
          center={
          { lat: cachedMechPositionLat,
            lng: cachedMechPositionLng } }
          zoom={14}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          disableDefaultUI={true}
          zoomControl={true}
          preserveViewport={true}
          onLoaded={(googleMaps, map, marker) => {
            // function onFabClickListener () {
            //   firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/UI').on('child_changed', function (snapshot) {
            //     let isResetClick = snapshot.val()
            //     if (isResetClick === true) {
            //       map.panTo(new googleMaps.LatLng(cachedMechPositionLat, cachedMechPositionLng))
            //       that.props.resetFindPosBtn()
            //     }
            //   })
            // }
            // onFabClickListener()

            // console.log(':::1 ' + this.props.mech.isResetPositionClick)
            // console.log(':::2 ' + shouldRerender)
            if (this.props.mech.isResetPositionClick) {
              map.panTo(new googleMaps.LatLng(cachedMechPositionLat, cachedMechPositionLng))
            }

            // this.getMechsCurrentLocation()
            if (this.props.mech.isMatched) {
              let userInfoBOTTOMDiv = document.createElement('div')
              that.getBottomDivComponent(userInfoBOTTOMDiv)
              // console.log('User\'s Pickup Location : ' +
              //   this.props.mech.matchedPickupLat + ' ' + this.props.mech.matchedPickupLng
              // )
              map.controls[googleMaps.ControlPosition.BOTTOM_CENTER].push(userInfoBOTTOMDiv)
            } else {
              let userInfoBOTTOMDiv = document.createElement('div')
              that.getToggleBtnComponent(userInfoBOTTOMDiv)
              map.controls[googleMaps.ControlPosition.BOTTOM_CENTER].push(userInfoBOTTOMDiv)
            }
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

MechanicMap.propTypes = {
  googleMaps: PropTypes.object.isRequired
}

export default GoogleMapLoader(MechanicMap, {
  libraries: ['places', 'geometry'],
  key: MY_API_KEY
})
