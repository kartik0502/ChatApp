import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/actions/authAction';
import { useAlert } from 'react-alert';
import { ERROR_MESSAGE_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';

function Login() {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, authenticate, error, successMessage, myInfo} = useSelector(state => state.auth);

  const [state, setstate] = useState({
    email: '',
    password: '',
  });

  const inputHandle = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const login = (e) => {
    e.preventDefault();
    
    dispatch(userLogin(state))
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
          <h3 className='heading'> Login Now! </h3>
        </div>

        <div className='card-body'>
          <form onSubmit={login}>

            <div className='form-group'>
              <label htmlFor='email'> Email </label>
              <input type='email' name='email' value={state.email} onChange={inputHandle} className='form-control' placeholder='Email' id='email'></input>
            </div>

            <div className='form-group'>
              <label htmlFor='password'> Password </label>
              <input type='password' name='password' value={state.password} onChange={inputHandle} className='form-control' placeholder='Password' id='password'></input>
            </div>

            <div className='form-group'>
              <input type="submit" value="login" className='btn' />
            </div>


            <div className='form-group btn_login'>
              <span > Not Registered? <Link to="/messenger/register" style={{ textDecoration: 'underline' }}> Register Now </Link></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login