import React from 'react'

export const Friends = ({friends}) => {
  return (
    <div className='friend'>
        <div className="friend-image">
            <div className="image">
                <img src={`./image/${friends.image}`} alt="profile" />
            </div>
        </div>
        <div className="friend-name-seen">
            <div className="friend-name">
                <h4>{friends.username}</h4>
            </div>
        </div>
    </div>
  )
}
