import React from 'react'
import './style.css'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
// import { NavLink } from 'react-router-dom'

class History extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    // console.log('1')
    // setTimeout(() => {
    //   console.log(this.props.history.histories)
    // }, 3000)
  }

  render () {
    // const data = [
    //   {
    //     date: '24/06/2017',
    //     time: '12:07 PM',
    //     id: '1',
    //     catalogue: <NavLink to='/invoice/1823'>invoice#1823</NavLink>,
    //     status: 'Done'
    //   },
    //   {
    //     date: '25/06/2017',
    //     time: '09:30 PM',
    //     id: '3',
    //     catalogue: <NavLink to='/invoice/0026'>invoice#0026</NavLink>,
    //     status: 'Matched'
    //   },
    //   {
    //     date: '26/06/2017',
    //     time: '11:07 PM',
    //     id: '4',
    //     catalogue: <NavLink to='/invoice/6745'>invoice#6745</NavLink>,
    //     status: 'Dispatching'
    //   },
    //   {
    //     date: '27/06/2017',
    //     time: '07:57 AM',
    //     id: '6',
    //     catalogue: <NavLink to='/invoice/0914'>invoice#0914</NavLink>,
    //     status: 'Idle'
    //   },
    //   {
    //     date: '27/06/2017',
    //     time: '13:00 PM',
    //     id: '7',
    //     catalogue: <NavLink to='/invoice/2232'>invoice#2232</NavLink>,
    //     status: 'Stand by'
    //   },
    //   {
    //     date: '28/06/2017',
    //     time: '13:13 AM',
    //     id: '25',
    //     catalogue: <NavLink to='/invoice/8234'>invoice#8234</NavLink>,
    //     status: 'Suspended'
    //   }
    // ]

    // const column = [
    //   // {
    //   //   Header: 'Name',
    //   //   accessor: 'name'
    //   // }, {
    //   //   Header: 'Age',
    //   //   accessor: 'age',
    //   //   Cell: props => <span className='number'>{props.value}</span>
    //   // }, {
    //   //   id: 'friendName',
    //   //   Header: 'Friend Name',
    //   //   accessor: d => d.friend.name
    //   // }, {
    //   //   Header: props => <span className='c'>Friend Age</span>,
    //   //   accessor: 'friend.age'
    //   // }
    //   {
    //     Header: 'Date',
    //     accessor: 'date',
    //     width: 85
    //   }, {
    //     Header: 'Time',
    //     accessor: 'time',
    //     width: 85
    //   }, {
    //     Header: 'ID',
    //     accessor: 'id',
    //     width: 30
    //   }, {
    //     Header: 'Catalogue',
    //     accessor: 'catalogue'
    //   }, {
    //     Header: 'Status',
    //     accessor: 'status'
    //   }
    // ]

    const tableHeaders = [
      {
        Header: 'Date',
        accessor: 'DMY',
        width: 85
      }, {
        Header: 'Time',
        accessor: 'Time',
        width: 85
      }, {
        Header: 'ID',
        accessor: 'ID'
      }, {
        Header: 'Status',
        accessor: 'Status'
      }
    ]

    return (
      <div id='hist_wrapper'>
        <div className='col-2'/>
        <div className='col-8 hist_content'>
          <div className='hist_headerText'>History</div>
          <div>
            <ReactTable
              data={this.props.history.histories}
              columns={tableHeaders}
              className='col-8 -highlight hist_table'
              pageSizeOptions={['10', '15', '30', '50', '100']}
              defaultPageSize='15'
              showPageJump={false}
              resizable={true}
            />
          </div>
        </div>
        <div className='col-2'/>
      </div>
    )
  }
}

History.propTypes = {
  style: PropTypes.object
}

export default History
