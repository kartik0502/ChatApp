import React from 'react'
import { FaPhoneAlt, FaRocketchat, FaVideo } from "react-icons/fa";
import { Message } from './Message';
import { MessageSend } from './MessageSend';
import { FriendInfo } from './FriendInfo';

export const RightSide = () => {
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
                                    <img src="/image/31655634_user_default.png" alt="profile" />
                                </div>
                                <div className="name">
                                    Hiii
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
                        < MessageSend />
                    </div>
                </div>

                <div className="col-4">
                    < FriendInfo />
                </div>
            </div>
        </div>
    </div>
  )
}
