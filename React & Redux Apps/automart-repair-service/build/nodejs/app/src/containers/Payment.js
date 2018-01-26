import React from 'react'
import Payment from '../components/Payment/Payment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { canlogin, cannotlogin, thepayment } from '../actions/inputAction'
import { addPayment, getpayment, deletepay } from '../actions/payment'
import * as firebase from 'firebase'
import validator from 'card-validator'
import Spinner from 'react-spinkit'

import delBtn from '../components/Payment/img/delete_button.png'
import mastercardLogo64 from '../components/Payment/img/mastercard_64.png'
import visaLogo64 from '../components/Payment/img/visa_64.png'
let cardArray = []

export class PaymentContainer extends React.Component {

  componentWillMount () {
    let that = this.props
    firebase.auth().onAuthStateChanged(function (userF) {
      if (userF) {
        that.canlogin(userF)
      } else {
        that.cannotlogin()
      }
    })
  }

  renderScene (route, navigator) {
    return <route.component navigator={navigator} />
  }

  redirect () {
    window.location = '/login'
  }

  onItemClick (key) {
    // console.log('clicked')
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
      let i = 0
      let that = this
      firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/payment/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // let name = childSnapshot.val().name
          let num = childSnapshot.val().num
          let expM = childSnapshot.val().expM
          let expY = childSnapshot.val().expY
          let id = childSnapshot.key
          let logo
          let numValidation = validator.number(num)
          if (numValidation.card.type === 'master-card') {
            logo = <img className='payment_itemLogo' src={mastercardLogo64} role='presentation'/>
          } else if (numValidation.card.type === 'visa') {
            logo = <img className='payment_itemLogo' src={visaLogo64} role='presentation'/>
          }
          let numShort = num.substr(num.length - 4, num.length)
          cardArray[i] = (
            <div className='col-8 payment_itemDiv' key={i} onClick={that.onItemClick(i)}>
              <div className='payment_itemDiv--before'>{logo}</div>
              <div className='payment_itemDiv--mid'>
                {/* <span><span className='payment_subtopic'>Cardholder:</span> {name}</span> */}
                <div><span className='payment_subtopic'>Card Number:</span> •••• •••• •••• {numShort}</div>
                <div><span className='payment_subtopic'>EXP Date:</span> {expM} / {expY}<span className='payment_subtopic'> CVV:</span> •••</div>
              </div>
              <div className='payment_itemDiv--after' onClick={() => { that.props.deletepay(id, cardArray, i) } }><img src={delBtn} alt=''/></div>
            </div>
          )
          // if (i !== primaryKey) {
          //   cardArray[i] = (
          //     <div className='col-8 payment_itemDiv' key={i} onClick={that.onItemClick(i)}>
          //       <div className='payment_itemDiv--before'>{logo}</div>
          //       <div className='payment_itemDiv--mid'>
          //         <span><span className='payment_subtopic'>Cardholder:</span> {name}</span>
          //         <div><span className='payment_subtopic'>Account Number:</span> {num}</div>
          //         <div><span className='payment_subtopic'>EXP Date:</span> {expM} / {expY}<span className='payment_subtopic'> CVV:</span> ***</div>
          //       </div>
          //       <div className='payment_itemDiv--after' onClick={() => { that.props.deletepay(id, cardArray, i) } }><img src={delBtn} alt=''/></div>
          //     </div>
          //   )
          // } else if (i === primaryKey) {
          //   cardArray[i] = (
          //     <div className='col-8 payment_itemDiv--selected' key={i} onClick={that.onItemClick(i)}>
          //       <div className='payment_itemDiv--before'>{logo}</div>
          //       <div className='payment_itemDiv--mid'>
          //         <span><span className='payment_subtopic'>Cardholder:</span> {name}</span>
          //         <div><span className='payment_subtopic'>Account Number:</span> {num}</div>
          //         <div><span className='payment_subtopic'>EXP Date:</span> {expM} / {expY}<span className='payment_subtopic'> CVV:</span> ***</div>
          //       </div>
          //       <div className='payment_itemDiv--after--selected'/>
          //     </div>
          //   )
          // }
          // console.log('primary key: ' + primaryKey)
          // console.log('i: ' + i)
          i++
        })
      }).then(() => {
        this.props.getpayment(cardArray)
      })
      return (
        <Payment {...this.props}/>
      )
    } else {
      console.log('Please login first.')
      return (this.redirect())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    upay: state.payment
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      canlogin, cannotlogin, addPayment, thepayment, getpayment, deletepay
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer)
