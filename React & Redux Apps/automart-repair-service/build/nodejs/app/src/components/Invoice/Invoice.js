import React from 'react'
import './style.css'

class Invoice extends React.Component {
  render () {
    return (
      <div id='invoice_wrapper'>
        <div className='col-2'/>
        <div className='col-8 invocie_content'>
          <div className='invoice_headerText'>
            Invoice
          </div>
        </div>
        <div className='col-2'/>
      </div>
    )
  }
}

export default Invoice
