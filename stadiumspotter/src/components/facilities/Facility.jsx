import React from 'react'

export default function Facility(props) {
  return (
    <>
    <td>{props.facility}</td>
    <td>{props.image}</td>{/*NEED TO BE AN IMAGE CURRENTLY ONLY TEXT*/}
    <td><button>Edit</button></td>
    <td><button>Delete</button></td>
    </>
  )
}
