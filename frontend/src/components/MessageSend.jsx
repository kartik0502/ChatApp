import React from 'react'
import { FaFileImage, FaGift, FaPaperPlane, FaPlusCircle } from "react-icons/fa";

export const MessageSend = (props) => {

    const {inputHandler, newMessage, sendMessage, imageSend} = props;

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
            <input onChange={imageSend} type="file" name="image" id="pic" className='form-control'/>
            <label htmlFor="pic"> <FaFileImage /></label>
        </div>

        <div className="file hover-gift">
            <div className="add-gift">
                Add-gift
            </div> 
            <label htmlFor="gift"> <FaGift /></label>
        </div>

        <div className="message-type">
            <input type="text" onChange={inputHandler} name='message' id='message' placeholder='Type a message' className='form-control' value={newMessage} />
        </div>

        <div onClick={sendMessage} className="file hover-gift">
            <label htmlFor="emoji"> <FaPaperPlane /></label>
        </div>

    </div>
  )
}
