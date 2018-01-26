import React from 'react'
import PropTypes from 'prop-types'
import StarImgGrey from './img/star-grey.png'
import StarImgFull from './img/star-full.png'
import StarImgHalf from './img/star-half.png'

class Rating extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      givenRating: 0
    }
  }

  componentWillMount () {
    localStorage.setItem('lastClickStar', '')
  }

  handleStarClick (event) {
    let i
    for (i = 1; i <= 5; i++) {
      let star = document.getElementById(i)
      star.src = StarImgGrey
    }
    for (i = 1; i <= parseFloat(event.target.id); i++) {
      let star = document.getElementById(i)
      star.src = StarImgFull
    }
    this.props.onGivenRating(event.target.id)
    localStorage.setItem('lastClickStar', event.target.id)
  }

  handleStarHover (event) {
    let i
    for (i = 1; i <= 5; i++) {
      let star = document.getElementById(i)
      star.src = StarImgGrey
    }
    for (i = 1; i <= parseFloat(event.target.id); i++) {
      let star = document.getElementById(i)
      star.src = StarImgHalf
    }
  }

  handleStarLeave () {
    let i
    for (i = 1; i <= 5; i++) {
      let star = document.getElementById(i)
      star.src = StarImgGrey
    }
    let lastClick = parseFloat(localStorage.getItem('lastClickStar'))
    if (lastClick !== '') {
      for (i = 1; i <= lastClick; i++) {
        let star = document.getElementById(i)
        star.src = StarImgFull
      }
    }
  }

  render () {
    return (
      <div className='RatingDiv'>
        <div className='stars'>
          <img src={StarImgGrey} alt='' id={1}
            onClick={(event) => { this.handleStarClick(event) }}
            onMouseEnter={(event) => { this.handleStarHover(event) }}
            onMouseLeave={() => { this.handleStarLeave() }}
          />
          <img src={StarImgGrey} alt='' id={2}
            onClick={(event) => { this.handleStarClick(event) }}
            onMouseEnter={(event) => { this.handleStarHover(event) }}
            onMouseLeave={() => { this.handleStarLeave() }}
          />
          <img src={StarImgGrey} alt='' id={3}
            onClick={(event) => { this.handleStarClick(event) }}
            onMouseEnter={(event) => { this.handleStarHover(event) }}
            onMouseLeave={() => { this.handleStarLeave() }}
          />
          <img src={StarImgGrey} alt='' id={4}
            onClick={(event) => { this.handleStarClick(event) }}
            onMouseEnter={(event) => { this.handleStarHover(event) }}
            onMouseLeave={() => { this.handleStarLeave() }}
          />
          <img src={StarImgGrey} alt='' id={5}
            onClick={(event) => { this.handleStarClick(event) }}
            onMouseEnter={(event) => { this.handleStarHover(event) }}
            onMouseLeave={() => { this.handleStarLeave() }}
          />
        </div>
      </div>
    )
  }
}

// const Rating = (props) => {
//   localStorage.setItem('lastClickStar', '')
//   return (
//     <div className='RatingDiv'>
//       <div className='stars'>
//         <img src={StarImgGrey} alt='' id={1}
//           onClick={(event) => { handleStarClick(event) }}
//           onMouseEnter={(event) => { handleStarHover(event) }}
//           onMouseLeave={() => { handleStarLeave() }}
//         />
//         <img src={StarImgGrey} alt='' id={2}
//           onClick={(event) => { handleStarClick(event) }}
//           onMouseEnter={(event) => { handleStarHover(event) }}
//           onMouseLeave={() => { handleStarLeave() }}
//         />
//         <img src={StarImgGrey} alt='' id={3}
//           onClick={(event) => { handleStarClick(event) }}
//           onMouseEnter={(event) => { handleStarHover(event) }}
//           onMouseLeave={() => { handleStarLeave() }}
//         />
//         <img src={StarImgGrey} alt='' id={4}
//           onClick={(event) => { handleStarClick(event) }}
//           onMouseEnter={(event) => { handleStarHover(event) }}
//           onMouseLeave={() => { handleStarLeave() }}
//         />
//         <img src={StarImgGrey} alt='' id={5}
//           onClick={(event) => { handleStarClick(event) }}
//           onMouseEnter={(event) => { handleStarHover(event) }}
//           onMouseLeave={() => { handleStarLeave() }}
//         />
//       </div>
//     </div>
//   )
// }

Rating.propTypes = {
  style: PropTypes.object
}

export default Rating
