import React from 'react'
import { FaPhoneAlt, FaRocketchat, FaVideo } from "react-icons/fa";
import { Message } from './Message';
import { MessageSend } from './MessageSend';
import { FriendInfo } from './FriendInfo';

export const RightSide = (props) => {
    const {currfriend, inputHandler, newMessage, sendMessage} = props;

  return (
    <div className='col-9'>
        <div className="right-side">
            <input type="checkbox" id='dot' />
            <div className="row">
                <div className="col-8">
                    <div className="message-send-show">
                        <div className="header">
                            <div className="image-name">
                                <div className="image">
                                    <img src={`./image/${currfriend.image}`} alt="profile" />
                                </div>
                                <div className="name">
                                    {currfriend.username}
                                </div>
                            </div>

                            <div className="icons">
                                <div className="icon">
                                    <FaPhoneAlt />
                                </div>
                                <div className="icon">
                                    <FaVideo />
                                </div>
                                <div className="icon">
                                    <label htmlFor="dot"><FaRocketchat /></label>
                                </div>


                            </div>
                        </div>
                        < Message />
                        < MessageSend 
                        inputHandler={inputHandler}
                        newMessage={newMessage}
                        sendMessage={sendMessage}/>
                    </div>
                </div>

                <div className="col-4">
                    < FriendInfo currfriend={currfriend}/>
                </div>
            </div>
        </div>
    </div>
  )
}
