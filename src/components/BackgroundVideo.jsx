import React from 'react'
import { useEffect, useRef } from 'react'

const BackgroundVideo = ({videoSrc}) => {

  useEffect(() => {
    
  }, [videoSrc])
  
  const videoRef = useRef();

  return (
    <div className='background-video'>
      <video ref={videoRef} autoPlay muted loop id="background-video" className='video'>
        <source src={videoSrc} type='video/mp4'/>
      </video>
    </div>
  )
}

export default BackgroundVideo
