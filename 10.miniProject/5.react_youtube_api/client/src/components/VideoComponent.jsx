import React from 'react'
function VideoComponent({title, description, url, setSelVideo, videoId}) {
  return (
    <tr>
                    <td>{ title }</td>
                    <td>{ description }</td>
                    <td>
                        <button onClick={() => {
                          setSelVideo({title:title, videoId: videoId})
                        }}>
                            <img src={url} />
                        </button>
                    </td>
                </tr>
  )
}

export default VideoComponent