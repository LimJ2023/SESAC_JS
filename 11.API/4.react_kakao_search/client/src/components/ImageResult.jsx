import React from 'react'

function ImageResult({image_url, display_sitename, doc_url, url, thumbnail_url}) {
  return (
    <div class="py-8 px-8 max-w-sm mx-auto space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
    <a href={image_url}>
      <img class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={thumbnail_url} alt="" />
    </a>
    <div class="text-center space-y-2 sm:text-left">
      <div class="space-y-0.5">
        <p class="text-lg text-black font-semibold">
          
        </p>
        <p class="text-slate-500 font-medium">
          {display_sitename}
        </p>
      </div>
      <a href={doc_url}>
      <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">이동</button>
      </a>
    </div>
  </div>
  )
}

export default ImageResult