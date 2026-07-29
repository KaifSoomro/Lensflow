import React from 'react'
import ProfileInfo from '../components/profile/ProfileInfo'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector(state => state.user); 

  console.log(user)
  const { data } = useQuery({
    queryKey: ['profileData'],
    queryFn: async() => {
      try {
        
      } catch (error) {
        throw error;
      }
    }
  })
  return (
    <div>
      <ProfileInfo />
    </div>
  )
}

export default Profile