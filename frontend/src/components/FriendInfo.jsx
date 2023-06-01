import React from 'react'
import { FaCaretSquareDown } from 'react-icons/fa'

export const FriendInfo = (props) => {

    const {currfriend} = props;

  return (
    <div className='friend-info'>
        <input type="checkbox" id='gallery' />
        <div className="image-name">
            <div className="image">
                <img src={`./image/${currfriend.image}`} alt="profile" />
            </div>
            <div className="active-user">
                Active
            </div>
            <div className="name">
                {currfriend.username}
            </div>
        </div>

        <div className="others">
            <div className="custom-chat">
                <h3>Customize</h3>
                <FaCaretSquareDown />
            </div>
            <div className="custom-chat">
                <h3>Privacy</h3>
                <FaCaretSquareDown />
            </div>
            <div className="custom-chat">
                <h3> Shared Media</h3>
                <label htmlFor="gallery"><FaCaretSquareDown /></label>
            </div>
        </div>

        <div className="gallery">
            <img src="/image/31655634_user_default.png" alt="profile" />
            <img src="/image/31655634_user_default.png" alt="profile" />
            <img src="/image/31655634_user_default.png" alt="profile" />
        </div>
    </div>
  )
}
