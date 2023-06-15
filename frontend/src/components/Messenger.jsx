import React, { useEffect, useState, useRef } from 'react'
import { FaRegEdit, FaEllipsisH, FaSearch } from "react-icons/fa";
import { ActiveFriend } from './ActiveFriend';
import { Friends } from './Friends';
import { RightSide } from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, getMessage, messageSend, imageSendMsg } from '../store/actions/messengerAction';
import { io } from 'socket.io-client';

export const Messenger = () => {

    const scrollRef = useRef();
    const socket = useRef();

    const [currfriend, setCurrentFriend] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [active, setActive] = useState([])
    const [socketMsg, setSocketMsg] = useState('')

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

        socket.current.emit('sendMessage', {
            sender: myInfo.id,
            receiver: currfriend._id,
            message: newMessage,
            time: Date.now()
        })
        dispatch(messageSend(data))
    }

    const dispatch = useDispatch();
    const { friends, messages } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getFriends())
    }, [currfriend])

    useEffect(() => {
        dispatch(getMessage(currfriend._id))
    }, [currfriend])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    useEffect(() => {
        socket.current = io('ws://localhost:8000');
        socket.current.on('getMessage', data => {
            setSocketMsg(data)
        })
        console.log(socketMsg)
    }, [socketMsg])

    useEffect(() => {
        if(socketMsg && currfriend._id === socketMsg.sender && myInfo.id === socketMsg.receiver){
            dispatch({
                type: 'SOCKET_MESSAGE',
                payload: {
                    message: socketMsg
                }
            })
        }
    }, [socketMsg])

    useEffect(() => {
        socket.current.emit('addUser', myInfo.id, myInfo)
    },[])

    useEffect(() => {
        socket.current.on('getUser', users => {
            const filterUser = users.filter(user => user.userId !== myInfo.id && user.userInfo.length !== 0)
            setActive(filterUser)
            console.log(filterUser)
        })
    },[])

    const imageSend = (e) => {
        e.preventDefault();

        if(e.target.files.length !== 0){
            const imageName = e.target.files[0].name;
            const newImageName = new Date().getTime() + '_' + imageName;
            
            const formData = new FormData();

            formData.append('sender',myInfo.id);
            formData.append('receiver',currfriend._id);
            formData.append('image',e.target.files[0]);
            formData.append('imageName',newImageName);

            dispatch(imageSendMsg(formData))
        }
        console.log(e.target.files[0])
    }

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
                        {
                            active && active.map((fr) =>
                            <div className="active-friend">
                                <ActiveFriend friends={fr} />
                            </div>)
                        }
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
                currfriend={currfriend} inputHandler={inputHandler} newMessage={newMessage} message={messages} scrollRef={scrollRef} imageSend={imageSend} active={active}
                sendMessage={sendMessage} /> : ''
            }
        </div>
    </div>
  )
}
