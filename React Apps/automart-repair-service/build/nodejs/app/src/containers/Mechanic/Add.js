// import { connect } from 'react-redux'
// import { addMechanic } from '../../actions/mechanic'
// import {
//   MechanicAdd
// } from '../../components/'

// function mapStateToProps (state) {
//   return {
//     auth: state.auth,
//     success: state.mechanic.success
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     addMechanic: () => {
//       dispatch(addMechanic())
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MechanicAdd)

import React from 'react'
import { Mechanic } from '../../components/Mechanic/Add'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { theregis, existuser, shortpass, canregis } from '../../actions/inputAction'
import { mechanicRegister } from '../../actions/mechanic'

class MechanicContainer extends React.Component {
  render () {
    return (
      <div className='title'>
        <div>
          <Mechanic {...this.props} {...this.state} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    mechanic: state.mechanic
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      theregis, canregis, existuser, shortpass, mechanicRegister
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MechanicContainer)
