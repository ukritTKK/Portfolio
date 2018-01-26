import { connect } from 'react-redux'
import { addPart } from '../../actions/part'
import {
  PartAdd
} from '../../components'

function mapStateToProps (state) {
  return {
    auth: state.auth,
    success: state.part.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPart: (formData, token) => {
      dispatch(addPart(formData, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartAdd)
