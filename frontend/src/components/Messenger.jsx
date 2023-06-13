import React, { useEffect, useState, useRef } from 'react'
import { FaRegEdit, FaEllipsisH, FaSearch } from "react-icons/fa";
import { ActiveFriend } from './ActiveFriend';
import { Friends } from './Friends';
import { RightSide } from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, getMessage, messageSend } from '../store/actions/messengerAction';

export const Messenger = () => {

    const scrollRef = useRef();
    const [currfriend, setCurrentFriend] = useState('')
    const [newMessage, setNewMessage] = useState('')

    const inputHandler = (e) => {
        setNewMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const data = {
            sender: myInfo.id,
            receiver: currfriend._id,
            message: newMessage
        }
        dispatch(messageSend(data))
    }

    const dispatch = useDispatch();
    const { friends, messages } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)
    // console.log(myInfo)

    useEffect(() => {
        dispatch(getFriends())
    }, [currfriend])

    useEffect(() => {
        dispatch(getMessage(currfriend._id))
    }, [currfriend])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

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
                            className={currfriend._id === fr._id ? 
                            'hover-friend active' : 'hover-friend'}> 
                            <Friends friends={fr} /> 
                            </div> )
                        }
                    </div>
                </div>
            </div>
            {
                currfriend ? 
                <RightSide 
                currfriend={currfriend} inputHandler={inputHandler} newMessage={newMessage} message={messages} scrollRef={scrollRef}
                sendMessage={sendMessage} /> : ''
            }
        </div>
    </div>
  )
}
