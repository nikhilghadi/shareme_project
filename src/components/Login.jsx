import React , { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import shareVideo from '../assets/share.mp4';
import newLogo from '../assets/logowhite.png';
import {gapi} from 'gapi-script';
import axios from 'axios';


function Login() {
  const navigate = useNavigate()
  const [ profile, setProfile ] = useState([]);
  useEffect(() => {
    const initClient = () => {
        gapi.client.init({
            clientId: process.env.REACT_APP_GOOGLE_API_TOKE,
            scope: ''
        });
    };
    gapi.load('client:auth2', initClient);
  });

  const responceGoogle = (res)=>{
    console.log("ress",res)
    const  {name, googleId, imageUrl} = res.profileObj
    localStorage.setItem('user', JSON.stringify(res.profileObj))
    setProfile(res.profileObj);
    console.log("ulr",process.env)
    axios({
      method: 'GET',
      url:"http://localhost:3001/user/new/",
      params: {
        name:name, googleId:googleId, imageUrl:imageUrl
      }
    }).then((res)=>{
        console.log("REsponce",res)
        navigate('/',{replace:true})
    }).catch((err)=>{
        console.log("Error",err)
    });
  }
  console.log("profile",profile);

  return (
    <div className='flex justify-start intems-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video src={shareVideo}
         type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center  items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img scr={require('../assets/logowhite.png')} class= "w-full" alt="logo"/>
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps)=>(
                <button type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'>
                  <FcGoogle className='mr-4'/> Sign in with Google
                </button>
              )}
              onSuccess={responceGoogle}
              onFailure={responceGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Login