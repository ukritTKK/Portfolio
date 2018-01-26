import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Monthly Active User',
      backgroundColor: '#10cfbd',
      borderColor: '#10cfbd',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 206, 86, 0.4)',
      hoverBorderColor: '#10cfbd',
      data: [65, 59, 80, 81, 56, 55, 40, 14, 54, 64, 65, 32]
    }
  ]
}

class Chart extends Component {
  render () {
    return (
        <div>
        <Bar
          data={data}
          width={100}
          height={300}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
      )
  }
  }
export default Chart
