import React from 'react'
import { useSelector } from 'react-redux'

export const Message = ({message, currfriend, scrollRef}) => {
    const { myInfo } = useSelector(state => state.auth)
  return (
    <div className='message-show'>
        {
            message && message.map(m => {
                return(
                    m.senderId === myInfo.id ? 
                    <div ref = {scrollRef} className="my-message">
                    <div className="image-message">
                        <div className="my-text">
                            <p className='message-text'> {m.message.text} </p>
                        </div>
                    </div>
                    <div className="time">
                        XYZ
                    </div>
                    </div>
                :
                    <div ref = {scrollRef} className="fd-message">
                    <div className="image-message-time">
                        <img src={`./image/${currfriend.image}`} alt="profile" />
                        <div className="message-time">
                            <div className="fd-text">
                                <p className='message-text'> {m.message.text} </p>
                            </div>
                            <div className="time">
                                XYZ
                            </div>
                        </div>
                    </div>
                    </div>
                )
            })
        }

    </div>
 )
}
