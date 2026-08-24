import React from 'react'
import Logo from "../../assets/images/logo_2.png"

const SettingsTopBar = () => {
  return (
    <div className='w-full h-16 shadow-md/5 fixed top-0 left-0 z-50 bg-white px-10 flex items-center justify-between'>
        <img src={Logo} alt="logo_img" className='w-10' />
    </div>
  )
}

export default SettingsTopBar