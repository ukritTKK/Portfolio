import React from 'react'
import MechanicMap from '../../components/Mechanic/Map'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { mechanicLogin, mechanicAcceptCall, mechModal, mechCloseModal, mechOpenModal,
  getMechsCurrentLocation, mechanicCancelCall, getCallerData, getCallersPickupLocation,
  toggleActive, inputChange, addContentToList, setCatalogueComponent, removeContentFromList,
  getUserOrder, onOfferClick, getCatalogueFromFirebase, checkQuotOffered, getUserImage,
  resetOrderName, setCurrentLatLng, resetFindPosBtn
} from '../../actions/mechanic'
import * as firebase from 'firebase'

class MechanicMapContainer extends React.Component {

  componentDidMount () {
    let that = this
    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        let state = 0
        let userIDFetch = ''
        let userIDData = ''
        let userFirstNameFetch = ''
        let userLastNameFetch = ''
        let userMobileNumFetch = ''
        let userFirstName = ''
        let userLastName = ''
        let userMobileNum = ''
        let userOrder = ''
        let userPickupLatFetch = 0
        let userPickupLngFetch = 0
        let userPickupLat = 0
        let userPickupLng = 0
        let offered = false
        let ref = firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service')
        ref.once('value', function (snapshot) {
          state = snapshot.val().State
          userOrder = snapshot.val().ServiceRequested
          offered = snapshot.val().IsQuotationOffered
        }).then(() => {
          that.props.checkQuotOffered(offered)
          that.props.getUserOrder(userOrder)
          if (state === 4) {
            ref.once('value').then(function (snapshot) {
              userIDFetch = snapshot.val().CallerID
            }).then(() => {
              userIDData = userIDFetch
              firebase.database().ref('/users/' + userIDData + '/Details').once('value').then(function (snapshot) {
                userFirstNameFetch = snapshot.val().firstname
                userLastNameFetch = snapshot.val().lastname
                userMobileNumFetch = snapshot.val().mobile
              }).then(() => {
                userFirstName = userFirstNameFetch
                userLastName = userLastNameFetch
                userMobileNum = userMobileNumFetch
                that.props.getCallerData(userFirstName, userLastName, userMobileNum)
              }).catch((error) => {
                alert('Cannot get user\'s data due to ' + error)
              })
              firebase.database().ref('/users/' + userIDData + '/Location').once('value').then(function (snapshot) {
                userPickupLatFetch = snapshot.val().PickupLatitude
                userPickupLngFetch = snapshot.val().PickupLongitude
              }).then(() => {
                userPickupLat = userPickupLatFetch
                userPickupLng = userPickupLngFetch
                that.props.getCallersPickupLocation(userPickupLat, userPickupLng)
              }).catch((error) => {
                alert('Cannot get user\'s pickup location due to ' + error)
              })
              let imagesRef = firebase.storage().ref().child('/images/UsersAvatar/image_' + userIDData)
              imagesRef.getDownloadURL().then(function (url) {
                that.props.getUserImage(url)
                let d = new Date()
                d.setTime(d.getTime() * 50000)
                // console.log('photo url: ' + url)
              })
            }).catch((error) => {
              alert('Cannot get user\'s ID due to ' + error)
            })
          } else if (state === 3) {
            that.props.mechOpenModal()
          }
        })
        ref.on('child_changed', function (snapshot) {
          var changedPost = snapshot.val()
          if (changedPost === 3) {
            that.props.mechOpenModal()
          } else if (changedPost === 4) {
            ref.once('value').then(function (snapshot) {
              userIDFetch = snapshot.val().CallerID
            }).then(() => {
              userIDData = userIDFetch
              firebase.database().ref('/users/' + userIDData + '/Details').once('value').then(function (snapshot) {
                userFirstNameFetch = snapshot.val().firstname
                userLastNameFetch = snapshot.val().lastname
                userMobileNumFetch = snapshot.val().mobile
              }).then(() => {
                userFirstName = userFirstNameFetch
                userLastName = userLastNameFetch
                userMobileNum = userMobileNumFetch
                that.props.getCallerData(userFirstName, userLastName, userMobileNum)
              }).catch((error) => {
                alert(error)
              })
              firebase.database().ref('/users/' + userIDData + '/Location').once('value').then(function (snapshot) {
                userPickupLatFetch = snapshot.val().PickupLatitude
                userPickupLngFetch = snapshot.val().PickupLongitude
              }).then(() => {
                userPickupLat = userPickupLatFetch
                userPickupLng = userPickupLngFetch
                that.props.getCallersPickupLocation(userPickupLat, userPickupLng)
              }).catch((error) => {
                alert('Cannot get user\'s pickup location due to ' + error)
              })
              let imagesRef = firebase.storage().ref().child('/images/UsersAvatar/image_' + userIDData)
              imagesRef.getDownloadURL().then(function (url) {
                that.props.getUserImage(url)
                let d = new Date()
                d.setTime(d.getTime() * 50000)
              })
            }).catch((error) => {
              alert(error)
            })
          } else if (changedPost === 0) {
            window.location.reload()
          }
        })

        let lat
        let lng
        let mechanicState
        firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
          lat = snapshot.val().location.latitude
          lng = snapshot.val().location.longitude
          mechanicState = snapshot.val().Service.State
        }).then(() => {
          if (mechanicState === 3) {
            that.props.mechOpenModal()
          }
          that.props.getMechsCurrentLocation(lat, lng)
        }).catch((error) => {
          alert(error)
        })
      } else {
        window.location = '/mechanic/login'
      }
    })
  }
  componentWillMount () {
    // console.log('length: ' + this.props.mech.contentList.length)
  }
  render () {
    return (
      <MechanicMap {...this.props}/>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    mech: state.mechanic
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      mechanicLogin,
      mechanicAcceptCall,
      mechModal,
      mechOpenModal,
      mechCloseModal,
      getMechsCurrentLocation,
      getCallerData,
      mechanicCancelCall,
      getCallersPickupLocation,
      toggleActive,
      inputChange,
      addContentToList,
      setCatalogueComponent,
      removeContentFromList,
      getUserOrder,
      onOfferClick,
      getCatalogueFromFirebase,
      checkQuotOffered,
      getUserImage,
      resetOrderName,
      setCurrentLatLng,
      resetFindPosBtn
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MechanicMapContainer)
