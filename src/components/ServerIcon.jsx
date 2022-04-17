import React from 'react'

const ServerIcon = ({ image }) => {
  return (
    <img src={image} 
    className='h-12 bg-discord-blurple p-2 cursor-pointer rounded-full transition duration-200 ease-out hover:rounded-2xl' />
  )
}

export default ServerIcon;