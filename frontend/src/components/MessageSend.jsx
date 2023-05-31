import React from 'react'
import { FaFileImage, FaGift, FaPaperPlane, FaPlusCircle } from "react-icons/fa";

export const MessageSend = () => {
  return (
    <div className='message-send-section'>
        <div className="file hover-attachment">
            <div className="add-attachment">
                Add-attachment
            </div>
            <label htmlFor="file"> <FaPlusCircle /></label>
        </div>

        <div className="file hover-image">
            <div className="add-image">
                Add-image
            </div>
            <label htmlFor="image"> <FaFileImage /></label>
        </div>

        <div className="file hover-gift">
            <div className="add-gift">
                Add-gift
            </div>
            <label htmlFor="gift"> <FaGift /></label>
        </div>

        <div className="message-type">
            <input type="text" name='message' id='message' placeholder='Type a message' className='form-control' />
        </div>

        <div className="file hover-gift">
            <label htmlFor="emoji"> <FaPaperPlane /></label>
        </div>

    </div>
  )
}
