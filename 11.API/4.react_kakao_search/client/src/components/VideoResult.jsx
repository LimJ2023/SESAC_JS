import React from 'react'

function VideoResult({title, thumbnail, url, datetime, author}) {
  return (
        <div className="p-4 mb-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-blue-600 mb-2">{title}</h3>
            <img src={thumbnail} alt="" className="w-48 h-auto mb-2 rounded-md" />
            <a href={url} className="text-green-600 hover:text-green-800 text-sm block mb-2 break-all">{url}</a>
            <p className="text-gray-600 text-sm mb-1">작성일: {datetime}</p>
            <p className="text-gray-600 text-sm">작성자: {author}</p>
        </div>
  )
}

export default VideoResult