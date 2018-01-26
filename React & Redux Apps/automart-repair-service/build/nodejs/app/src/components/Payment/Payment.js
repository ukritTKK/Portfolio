import React from 'react'
import './style.css'
import visaLogo from './img/payment_visa.png'
import mastercardLogo from './img/payment_mastercard.png'
import validator from 'card-validator'

class Payment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      num: '',
      expM: '',
      expY: '',
      cvv: '',
      data: [],
      modalIsOpen: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.formValidation = this.formValidation.bind(this)
  }

  checkNumeric (input) {
    let charCode = input.charCodeAt(0)
    if (charCode < 48 || charCode > 57) {
      return false
    }
    return true
  }

  handleChange (event) {
    let value = event.target.value
    let length = event.target.value.length
    if (event.target.name === 'name') {
      this.props.thepayment(
        value,
        this.props.upay.num,
        this.props.upay.expM,
        this.props.upay.expY,
        this.props.upay.cvv
      )
    } else if (event.target.name === 'number') {
      let isNumeric = this.checkNumeric(value.substr(length - 1, length))
      if (isNumeric) {
        this.props.thepayment(
          this.props.upay.name,
          value,
          this.props.upay.expM,
          this.props.upay.expY,
          this.props.upay.cvv
        )
      } else {
        event.target.value = value.substr(0, length - 1)
      }
    } else if (event.target.name === 'month') {
      this.props.thepayment(
        this.props.upay.name,
        this.props.upay.num,
        value,
        this.props.upay.expY,
        this.props.upay.cvv
      )
    } else if (event.target.name === 'year') {
      this.props.thepayment(
        this.props.upay.name,
        this.props.upay.num,
        this.props.upay.expM,
        value,
        this.props.upay.cvv
      )
    } else if (event.target.name === 'cvv') {
      let isNumeric = this.checkNumeric(value.substr(length - 1, length))
      if (isNumeric) {
        this.props.thepayment(
          this.props.upay.name,
          this.props.upay.num,
          this.props.upay.expM,
          this.props.upay.expY,
          value,
        )
      } else {
        event.target.value = value.substr(0, length - 1)
      }
    }
  }

  formValidation (event) {
    event.preventDefault()
    let numValidation = validator.number(this.props.upay.num)
    if (this.props.upay.name === '') {
      alert('Please enter a cardholder name.')
    } else if (this.props.upay.num === '') {
      alert('Please enter a card number.')
    } else if (!numValidation.isPotentiallyValid || !numValidation.isValid ||
                !(numValidation.card.type === 'master-card' || numValidation.card.type === 'visa')) {
      alert('Please enter a valid MasterCard/Visa card number.')
    } else if (this.props.upay.expM === '') {
      alert('Please select an expiration month.')
    } else if (this.props.upay.expY === '') {
      alert('Please select an expiration year.')
    } else if (this.props.upay.cvv === '') {
      alert('Please enter a card security code.')
    } else {
      this.props.addPayment(
      this.props.upay.name,
      this.props.upay.num,
      this.props.upay.expM, this.props.upay.expY,
      this.props.upay.cvv, numValidation.card.type,

      )
    }
  }

  render () {
    return (
      <div id='wrapper'>
        <div className='col-2'></div>
        <div className='col-8 payment_content'>
          <div className='payment_headerText'>Payment</div>
          <div>
          </div>
          <p className='col-12 payment_divLabel'>Add new payment method</p>
          <div>
            <div className='col-8 securePayment-div'>
              <span className='securePayment-text'>We accept the following secure payment methods:</span>
              <div className='securePayment-logo'>
                <img src={visaLogo} alt=''/><img src={mastercardLogo} alt=''/>
              </div>
            </div>
              <div className='col-8 payment_infoDiv'>
                <p className='payment_typebox_label'>Cardholder name</p>
                <input className='col-12 payment_typebox' name='name' onChange={this.handleChange}/>
              </div>
              <div className='col-8 payment_infoDiv'>
                <p className='payment_typebox_label'>Card number</p>
                <input type='text' id='cardNumberInput' className='col-12 payment_typebox'
                  maxLength='16' placeholder='••••••••••••••••' name='number'
                  onChange={this.handleChange}
                />
              </div>
              <div className='col-8 payment_infoDiv'>
                <p className='payment_typebox_label'>Expiration date and security code</p>
                <select className='col-3 payment_select' style={ {width: '48px'} } name='month' onChange={this.handleChange}>
                  <option value='--'>--</option>
                  <option value='01' key='ps1'>01</option> <option value='02' key='ps2'>02</option>
                  <option value='03' key='ps3'>03</option> <option value='04' key='ps4'>04</option>
                  <option value='05' key='ps5'>05</option> <option value='06' key='ps6'>06</option>
                  <option value='07' key='ps7'>07</option> <option value='08' key='ps8'>08</option>
                  <option value='09' key='ps9'>09</option> <option value='10' key='ps10'>10</option>
                  <option value='11' key='ps11'>11</option> <option value='12' key='ps12'>12</option>
                </select>
                <span className='payment_slash'> / </span>
                <select className='col-3 payment_select' style={ {width: '72px'} } name='year' onChange={this.handleChange}>
                  <option value='----'>----</option>
                  <option value='2017' key='Y1'>2017</option> <option value='2018' key='Y2'>2018</option>
                  <option value='2019' key='Y3'>2019</option> <option value='2020' key='Y4'>2020</option>
                  <option value='2021' key='Y5'>2021</option> <option value='2022' key='Y6'>2022</option>
                  <option value='2023' key='Y7'>2023</option> <option value='2024' key='Y8'>2024</option>
                  <option value='2025' key='Y9'>2025</option> <option value='2026' key='Y10'>2026</option>
                  <option value='2027' key='Y11'>2027</option> <option value='2028' key='Y12'>2028</option>
                  <option value='2029' key='Y13'>2029</option> <option value='2030' key='Y14'>2030</option>
                  <option value='2031' key='Y15'>2031</option> <option value='2032' key='Y16'>2032</option>
                  <option value='2033' key='Y17'>2033</option> <option value='2034' key='Y18'>2034</option>
                  <option value='2035' key='Y19'>2035</option> <option value='2036' key='Y20'>2036</option>
                  <option value='2037' key='Y21'>2037</option> <option value='2038' key='Y22'>2038</option>
                  <option value='2039' key='Y23'>2039</option> <option value='2040' key='Y24'>2040</option>
                  <option value='2041' key='Y25'>2041</option> <option value='2042' key='Y26'>2042</option>
                </select>
                <input className='CVV_typebox' style={ {width: '42px'} } maxLength='3' placeholder='•••' name='cvv' onChange={this.handleChange}/>
              </div>
              <button className='col-8 payment_saveBtn' onClick={this.formValidation}>Add payment method</button>
            <p className='col-12 payment_divLabel'>Your cards</p>
            <div>{this.props.upay.data}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Payment
