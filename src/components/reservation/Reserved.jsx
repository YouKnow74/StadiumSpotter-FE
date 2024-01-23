import React from 'react'
import dayjs from 'dayjs'

export default function Reserved(props) {
  return (
   <>
   <td>{dayjs(props.date).format('YYYY-MM-DD')}</td>
   <td>{props.startTime}</td>
   <td>{props.endTime}</td>
   </>
  )
}
