import React from 'react'
import './style.css'

const notfTable = [
  <tr key='1'>
    <td id='time' className='notifDivider'>Just now</td>
    <td className='notifDivider'>The repair operation has been finished.</td>
  </tr>,
  <tr key='2'>
    <td id='time' className='notifDivider'>34 minutes ago</td>
    <td className='notifDivider'>The repair operation started.</td>
  </tr>,
  <tr key='3'>
    <td id='time' className='notifDivider'>37 minutes ago</td>
    <td className='notifDivider'>The mechanic has arrived at your location.</td>
  </tr>,
  <tr key='4'>
    <td id='time'>1 hour ago</td>
    <td>Found a mechanic! Our mechanic are going to your location. Please wait a few minutes.</td>
  </tr>
]

class Notification extends React.Component {
  render () {
    return (
      <div className='notifContent'>
        <p className='headerText'>Notification</p>
        <div>
          <table>
            <tbody>
              {notfTable}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Notification
