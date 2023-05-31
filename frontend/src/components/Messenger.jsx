import React from 'react'
import { FaRegEdit, FaEllipsisH, FaSearch } from "react-icons/fa";
import { ActiveFriend } from './ActiveFriend';
import { Friends } from './Friends';
import { RightSide } from './RightSide';

export const Messenger = () => {
  return (
    <div className='messenger'>
        <div className="row">
            <div className="col-3">
                <div className="left-side">
                    <div className="top">
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
                                <FaEllipsisH />
                            </div>
                            <div className="icon">
                                <FaRegEdit />
                            </div>
                        </div>
                    </div>

                    <div className="friend-search">
                        <div className="search">
                            <button> <FaSearch /> </button>
                            <input type="text" placeholder='Search' className='form-control' />
                        </div>
                    </div>

                    <div className="active-friends">
                        <ActiveFriend />
                    </div>

                    <div className="friends">
                        <div className="hover-friend active">
                            <Friends />
                        </div>
                    </div>
                </div>
            </div>

            < RightSide />
        </div>
    </div>
  )
}
