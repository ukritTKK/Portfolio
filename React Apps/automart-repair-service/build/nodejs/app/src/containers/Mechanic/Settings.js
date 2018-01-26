import React from 'react'
import Settings from '../../components/Mechanic/Settings'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setImageFileName, getMechSettings, loadMechPreviewImage, setMechImage,
  editMechSettings, SubmitMechSettings, uploadMechImage } from '../../actions/mechanic-settings'
import * as firebase from 'firebase'

class MechanicSettingsContainer extends React.Component {

  componentDidMount () {
    let refStorage = firebase.storage().ref()
    let that = this
    let firstname = ''
    let lastname = ''
    let email = ''
    let mobile = ''
    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        let uid = firebase.auth().currentUser.uid
        firebase.database().ref('/mechanic/' + uid + '/Details').once('value').then(function (snapshot) {
          firstname = snapshot.val().FirstName
          lastname = snapshot.val().LastName
          email = snapshot.val().Email
          mobile = snapshot.val().Mobile
        }).then(() => {
          that.props.getMechSettings(firstname, lastname, email, mobile)
          let imagesRef = refStorage.child('/images/MechanicsAvatar/image_' + uid)
          imagesRef.getDownloadURL().then(function (url) {
            that.props.loadMechPreviewImage(url)
            console.log('mech photo url: ' + url)
            let d = new Date()
            d.setTime(d.getTime() * 50000)
            document.cookie = 'picture=' + url + ';' + 30 + ';path=/'
          })
        })
      }
    })
  }

  render () {
    return (
      <Settings {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    mset: state.mechanicSettings
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setImageFileName,
      getMechSettings,
      loadMechPreviewImage,
      setMechImage,
      editMechSettings,
      SubmitMechSettings,
      uploadMechImage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MechanicSettingsContainer)
