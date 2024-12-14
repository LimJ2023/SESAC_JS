import React from 'react'

function WebResult({title, contents, url}) {
  return (
        <div className="p-4 mb-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-blue-600 mb-2">{title}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{contents}</p>
            <a href={url} className="text-green-600 hover:text-green-800 text-sm break-all">{url}</a>
        </div>
  )
}

export default WebResult