import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

// const styles = {
//   root: {
//     fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
//     fontWeight: 300
//   },
//   header: {
//     backgroundColor: '#54585a',
//     color: 'white',
//     padding: '16px',
//     fontSize: '24px'
//   }
// }

// function componentDidMount () {
//   let $ = window.jQuery
//   $(window).scroll(function () {
//     var scroll = $(window).scrollTop()
//     if (scroll > 220) {
//       $('headerChild').addClass('header-down')
//       $('button').addClass('button-black')
//       $('.brands').addClass('brand-black')
//     } else if (scroll < 20) {
//       $('headerChild').removeClass('header-down')
//       $('button').removeClass('button-black')
//       $('.brands').removeClass('brand-black')
//     }
//   })
// }
const TitlePanel = (props) => {
  // const rootStyle = props.style ? {...styles.root, ...props.style} : styles.root

  return (
    // <div style={rootStyle}>
    //   <div style={styles.header}>{props.title}</div>
    //   {props.children}
    // </div>
    <div className='rootStyles'>
      <div className='headerStyle'>
        {props.title}
      </div>
      {props.children}
    </div>
  )
}

TitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  children: PropTypes.object
}

export default TitlePanel
