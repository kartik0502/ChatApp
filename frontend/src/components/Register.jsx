import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import user_default from '../images/user_default.png'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../store/actions/authAction';
import { useAlert } from 'react-alert';
import { ERROR_MESSAGE_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';

function Register() {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, authenticate, error, successMessage, myInfo} = useSelector(state => state.auth);

  const [state, setstate] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });
  const [loadImage, setLoadImage] = useState('');

  const inputHandle = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const fileHandle = e => {
    if (e.target.files.length !== 0) {
         setstate({
              ...state,
              [e.target.name]: e.target.files[0]
         })
    }
    // console.log(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
         setLoadImage(reader.result);
    }
    reader.readAsDataURL(e.target.files[0]);
}

  const register = (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('username', state.username)
    formData.append('email', state.email)
    formData.append('password', state.password)
    formData.append('confirmPassword', state.confirmPassword)
    formData.append('image', state.image)

    dispatch(userRegister(formData))
    // console.log(state)
  }

  useEffect(() => {
    if (authenticate){
      navigate('/')
    }
    if (successMessage){
      alert.success(successMessage)
      dispatch({type: SUCCESS_MESSAGE_CLEAR})
    }

    if (error){
      error.map(err => alert.error(err))
      dispatch({type: ERROR_MESSAGE_CLEAR})
    }
  }, [successMessage,error])

  return (
    <div className='register'>

      <div className='card'>
        <div className='card-header'>
          <h3 className='heading'> Register Now! </h3>
        </div>

        <div className='card-body'>
          <form encType="multipart/form-data" onSubmit={register}>
            <div className='form-group'>
              <label htmlFor='username'> User Name </label>
              <input type='text' onChange={inputHandle} name='username' value={state.username} className='form-control' placeholder='Username' id='username'></input>
            </div>

            <div className='form-group'>
              <label htmlFor='email'> Email </label>
              <input type='email' onChange={inputHandle} name='email' value={state.email} className='form-control' placeholder='Email' id='email'></input>
            </div>

            <div className='form-group'>
              <label htmlFor='password'> Password </label>
              <input type='password' onChange={inputHandle} name='password' value={state.password} className='form-control' placeholder='Password' id='password'></input>
            </div>

            <div className='form-group'>
              <label htmlFor='conf-password'> Confirm Password </label>
              <input type='text' onChange={inputHandle} name='confirmPassword' value={state.confirmPassword} className='form-control' placeholder='Confirm Password' id='conf-password'></input>
            </div>

            <div className='form-group'>
              <div className='file-image'>
                <div className='image'>
                  {loadImage ? <img src={loadImage} alt='user' /> : <img src={user_default} alt='default' />}
                </div>
                <div className='file'>
                  <label htmlFor='image'>Select Image</label>
                  <input type="file" onChange={fileHandle} name="image" className='form-control' id='image' />
                </div>

              </div>
            </div>

            <div className='form-group'>
              <input type="submit" value="register" className='btn' />
            </div>


            <div className='form-group btn_login'>
              <span > Already Registered? <Link to="/messenger/login" style={{ textDecoration: 'underline' }}> Login Now </Link></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register