import React from 'react'

export default function MainPanel(props) {
  const {data} = props
  return (
    <div className="imgContainer">
        <img src={data.hdurl || data.url} alt={data.title || "APOD"} className="imgPanel"/>
    </div>
  )
}
