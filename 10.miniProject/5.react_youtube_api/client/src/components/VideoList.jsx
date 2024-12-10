import React, { useState } from 'react'
import VideoComponent from './VideoComponent'
import YoutubePlayer from './YoutubePlayer';

function VideoList({videos, setSelvideo}) {
    console.log(videos); // 데이터 구조 확인
    const [selVideo, setSelVideo] = useState(null);
  return (
    <div>
        {selVideo && (
                    <YoutubePlayer title={selVideo.title} videoId={selVideo.videoId}/>
                )}
        <table>
            <thead>
                <tr>
                    <th>제목</th>
                    <th>설명</th>
                    <th>이미지</th>
                </tr>
            </thead>
            <tbody>
                {videos.map((v) => (
                    <VideoComponent key={v.videoId } title={v.title} description={v.description} url={v.thumbnail.url} videoId={v.videoId}
                    setSelVideo={setSelVideo}/>
                ))}
                
            </tbody>
        </table>
                
    </div>
  )
}

export default VideoList