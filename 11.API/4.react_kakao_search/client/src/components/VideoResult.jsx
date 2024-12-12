import React from 'react'

function VideoResult({title, thumbnail, url, datetime, author}) {
  return (
        <div>
            <h3>{title}</h3>
            <img src={thumbnail} alt="" />
            <a href={url}>{url}</a>
            <p>datetime: {datetime}</p>
            <p>author: {author}</p>
        </div>
  )
}

export default VideoResult