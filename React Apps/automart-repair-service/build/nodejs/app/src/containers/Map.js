import React from 'react'
import Map from '../components/Map/Map'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { canlogin, cannotlogin } from '../actions/inputAction'
import {
  setlocation, openmodal, closemodal, getmechanic, MechAva,
  NoMechAva, Loading, loadmech, openChooseServiceModal,
  closeChooseServiceModal, setServiceType, resetFirebaseData,
  checkChosenService, checkOffered, getCatalogueFromFirebase,
  setCatalogueComponent, onPaymentClick, onNextClick,
  onFinishClick, onGivenRating, resetFindPosBtn, resetViewQuotBtn,
  getMechanicImage, onAcceptQuotClick, onBackClick, getCardsFromFirebase,
  setCardsComponent, onSelectCardClick, setCurrentLatLng } from '../actions/map'
import { payment } from '../actions/UserAction'
import { setUserStatus } from '../actions/header'
import * as firebase from 'firebase'
import Spinner from 'react-spinkit'

export class MapContainer extends React.Component {

  componentWillMount () {
    let that = this
    firebase.auth().onAuthStateChanged(function (userF) {
      if (userF) {
        localStorage.setItem('userID', firebase.auth().currentUser.uid)
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service')
        .once('value').then(function (snapshot) {
          if (snapshot.val() && snapshot.val().MechanicID !== false) {
            let mechName = ''
            let mechFirstName = ''
            let mechLastName = ''
            let mechRating = ''
            let mechCarModel = ''
            let mechPlate = ''
            let mechPerks = ''
            let mechGarageName = ''
            let mechGarageOpen = ''
            let mechGarageClose = ''
            let detailsSnapshot
            let serviceSnapshot
            let mechID = snapshot.val().MechanicID
            firebase.database().ref('/mechanic/' + mechID + '/Details')
            .once('value', function (Msnapshot) {
              detailsSnapshot = Msnapshot
            }).then(() => {
              mechFirstName = detailsSnapshot.val().FirstName
              mechLastName = detailsSnapshot.val().LastName
              mechRating = detailsSnapshot.val().Rating
              mechCarModel = detailsSnapshot.val().CarModel
              mechPlate = detailsSnapshot.val().PlateNum
              mechPerks = detailsSnapshot.val().Perks
              mechGarageName = detailsSnapshot.val().GarageName
              mechGarageOpen = detailsSnapshot.val().GarageOpenTime
              mechGarageClose = detailsSnapshot.val().GarageCloseTime

              firebase.database().ref('/mechanic/' + mechID + '/Service')
              .once('value', function (Nsnapshot) {
                serviceSnapshot = Nsnapshot
              }).then(() => {
                // console.log(serviceSnapshot.val().State + ' | ' + snapshot.val().MechanicID + ' | ' +
                //   mechFirstName + ' ' + mechLastName + ' | ' + mechRating + ' | ' + mechCarModel + ' | ' + mechPlate + ' | ' +
                //   mechPerks + ' | ' + mechGarageName + ' | ' + mechGarageOpen + ' | ' + mechGarageClose
                // )
                mechName = mechFirstName + ' ' + mechLastName

                if (serviceSnapshot.val().State === 3 || serviceSnapshot.val().State === 4) {
                  that.props.loadmech(serviceSnapshot.val().State, mechID,
                    mechName, mechRating, mechCarModel, mechPlate, mechPerks, mechGarageName,
                    mechGarageOpen, mechGarageClose
                  )
                  let imagesRef = firebase.storage().ref().child('/images/MechanicsAvatar/image_' + mechID)
                  imagesRef.getDownloadURL().then(function (url) {
                    that.props.getMechanicImage(url)
                    let d = new Date()
                    d.setTime(d.getTime() * 50000)
                  })
                }

                that.props.loadmech(serviceSnapshot.val().State, mechID,
                  mechName, mechRating, mechCarModel, mechPlate, mechPerks, mechGarageName,
                  mechGarageOpen, mechGarageClose
                )
                that.props.checkOffered(serviceSnapshot.val().IsQuotationOffered)
                that.props.canlogin(userF)
              }).catch((error) => {
                console.log('Cannot fetch mechanic data due to ' + error)
              })
            }).catch((error) => {
              console.log('Cannot fetch mechanic data due to ' + error)
            })
          } else {
            that.props.canlogin(userF)
          }
        })
      } else {
        that.props.cannotlogin()
      }
    })
  }
  componentDidMount () {
    let that = this
    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        firebase.database().ref('/users/' + currentUser.uid + '/payment').once('value')
        .then(function (snapshot) {
          if (snapshot.val()) {
            that.props.payment(true)
          } else {
            that.props.payment(false)
          }
        })
        that.props.getCardsFromFirebase()
        // setTimeout(() => {
        //   console.log('CARDS2: ' + this.props.umap.firebaseCards)
        // }, 1500)
      } else {
        window.location = '/login'
      }
    })
  }
  renderScene (route, navigator) {
    return <route.component navigator={navigator} />
  }

  redirect () {
    window.location = '/login'
  }

  render () {
    const loadingTextWrapper = {position: 'relative', height: '100%'}
    // const loadingText = {
    //   position: 'absolute',
    //   top: '45%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
    //   color: '#707070'
    // }
    const loadingSpinner = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '64px',
      height: '64px',
      color: '#686868'
    }
    if (this.props.user.loading) {
      return <div style={loadingTextWrapper}>
        {/* <h2 style={loadingText}>Loading...</h2> */}
        <Spinner name='circle' style={loadingSpinner}/>
      </div>
    } else if (this.props.user.username) {
      return (
        <Map {...this.props}/>
      )
    } else {
      // console.log('Please login first.')
      this.redirect()
      return null
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    umap: state.map,
    header: state.header
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      canlogin,
      cannotlogin,
      setlocation,
      openmodal,
      closemodal,
      payment,
      getmechanic,
      MechAva,
      NoMechAva,
      Loading,
      loadmech,
      openChooseServiceModal,
      closeChooseServiceModal,
      setServiceType,
      resetFirebaseData,
      checkChosenService,
      checkOffered,
      getCatalogueFromFirebase,
      setCatalogueComponent,
      onPaymentClick,
      onNextClick,
      onGivenRating,
      onFinishClick,
      resetFindPosBtn,
      resetViewQuotBtn,
      setUserStatus,
      getMechanicImage,
      onAcceptQuotClick,
      onBackClick,
      getCardsFromFirebase,
      setCardsComponent,
      onSelectCardClick,
      setCurrentLatLng
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
