import React from 'react'
function YoutubePlayer({title, videoId}) {

  return (
    <div>
        <div style={{marginTop: "20px"}}></div>
        <h2>{ title }</h2>
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"></iframe>
    </div>
  )
}

export default YoutubePlayer