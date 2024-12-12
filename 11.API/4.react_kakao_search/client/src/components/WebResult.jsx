import React from 'react'

function WebResult({title, contents, url}) {
  return (
        <div >
            <h3>{title}</h3>
            <p>{contents}</p>
            <a href={url}>{url}</a>
        </div>
  )
}

export default WebResult