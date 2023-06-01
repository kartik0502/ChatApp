import React, { useEffect, useState } from 'react'
import { FaRegEdit, FaEllipsisH, FaSearch } from "react-icons/fa";
import { ActiveFriend } from './ActiveFriend';
import { Friends } from './Friends';
import { RightSide } from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../store/actions/messengerAction';

export const Messenger = () => {
    const [currfriend, setCurrentFriend] = useState('')
    const [newMessage, setNewMessage] = useState('')

    const inputHandler = (e) => {
        setNewMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(newMessage)
    }

    const dispatch = useDispatch();
    const { friends } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)
    

    useEffect(() => {
        dispatch(getFriends())
    }, [])

  return (
    <div className='messenger'>
        <div className="row">
            <div className="col-3">
                <div className="left-side">
                    <div className="top">
                        <div className="image-name">
                            <div className="image">
                                <img src={`./image/${myInfo.image}`} alt="profile" />
                            </div>
                            <div className="name">
                                {myInfo.username}
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
                        {
                            friends.map((fr) => 
                            <div onClick={() => setCurrentFriend(fr)} 
                            className="hover-friend"> 
                            <Friends friends={fr} /> 
                            </div> )
                        }
                    </div>
                </div>
            </div>
            {
                currfriend ? 
                <RightSide 
                currfriend={currfriend} inputHandler={inputHandler} newMessage={newMessage}
                sendMessage={sendMessage} /> : ''
            }
        </div>
    </div>
  )
}
