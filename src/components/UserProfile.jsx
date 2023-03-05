import React,{useState, useEffect} from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'
import { userQueryById,feedQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'
function UserProfile() {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  const {userId} = useParams()
  useEffect(() => {
    const user = userQueryById(userId)
    user.then((res)=>{
      setUser(res.data.user)
    })
  }, [userId])
  useEffect(() => {
    if(text==='Created'){
     const pins =  feedQuery(userId)
     pins.then((res)=>{
      setPins(res.data.pins)
    })
    }else{
      const pins =  feedQuery(userId,text)
      pins.then((res)=>{
       setPins(res.data.pins)
     })
    }
  }, [text,userId])
  
  const logout =()=>{
    localStorage.clear()
    navigate('/login')
  }
  const activeBtnStyles='bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
  const nonActiveBtnStyles='bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

  if(!user){
    return <Spinner message={'Loading profile...'} />
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center '>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
           <div className='flex flex-col justify-center items-center'>
              <img src={randomImage} className='w-full h-370 2xl:h-510 shadow-lg object-cover' alt="Banner Pic" />
              <img className='rounded-full  w-20 h-20  -mt-10 shadow-xl object-cover'
                src={user.image_url} alt="User Pic"/>
                <h1 className='font-bold text-3xl text-center mt-3'>{user.name}</h1>
                <div className='absolute top-0 z-1 right-0 p-2'>
                  {Number(userId) === user.id ? (
                  <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps)=>(
                      <button type="button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className='bg-white p=2 rounded-full cursor-pointer outline-none shadow-md '>
                        <AiOutlineLogout color='red' fontSize={21}/>
                      </button>
                    )}
                    onLogoutSuccess={logout}
                    cookiePolicy={'single_host_origin'}
                  />) :''}
                </div>
           </div>
           <div className='text-center mb-7'>
            <button type='button' onClick={(e)=>{setText(e.target.textContent);setActiveBtn('created')}}
            className={activeBtn == 'created' ? activeBtnStyles : nonActiveBtnStyles}>
              Created
            </button>
            <button type='button' onClick={(e)=>{setText(e.target.textContent);setActiveBtn('saved')}}
            className={activeBtn == 'saved' ? activeBtnStyles : nonActiveBtnStyles}>
              Saved
              </button>
           </div>
           <div className='px-2'>
            <MasonryLayout pins={pins || []}/>
           </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile