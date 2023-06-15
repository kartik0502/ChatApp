import React from 'react'

export const ActiveFriend = ({friends}) => {
  return (
    <div className='active-friend'>
        <div className="image-active-icon">
            <div className="image">
                <img src={`./image/${friends.userInfo.image}`} alt="profile" />
                <div className="active-icon">
                    
                </div>
            </div>
        </div>
    </div>
  )
}
