import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Home
} from '../components'
import { aja } from '../actions/header'
import React from 'react'

export class HomeContainer extends React.Component {

  componentWillMount () {
    this.props.aja()
  }

  render () {
    const aprops = {
      aaa: 'RRR'
    }
    return (
      <Home {...aprops}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    home: state.home
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      aja
    }, dispatch)
}

// function mapStateToProps (state) {
//   return {}
// }

// function mapDispatchToProps (dispatch) {
//   return {

//   }
// }
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
