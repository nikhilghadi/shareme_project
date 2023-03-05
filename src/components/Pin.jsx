import React,{useState, useEffect} from 'react'
import {Link, Navigate, useNavigate,useLocation} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser ,fetchCurrentUser} from '../utils/fetchUser'
import {fetchAlredySaved, savePinData, deletePinData} from '../utils/data'



function Pin({pin}) {
  const location = useLocation();
  console.log("Locc",location.pathname);

  const navigate = useNavigate()
  const [postHovered, setPostHovered] = useState(false)
  const [alreadySaved, setAlreadySaved] = useState(false)
  const userInfo = fetchUser()
  const current_user = fetchCurrentUser()

  useEffect(() => {
    fetchAlredySaved(pin.id,userInfo.googleId).then((res)=>{
      setAlreadySaved(res.data.saved)
    })
  }, [])
  const savePin=(id)=>{
    if(!alreadySaved){
      savePinData(id,userInfo.googleId)
      window.location.reload()

    }
  }
  const deletePin=(id)=>{
    deletePinData(id,userInfo.googleId)
    window.location.reload()
  }
  const download = (e) => {
    e.stopPropagation()

    var element = document.createElement("a");
    var file = new Blob(
      [
        e.target.href
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download =pin.name+'.jpg';
    element.click();
  };
  console.log(pin.id,alreadySaved)
  return (
    <div className='m-2'>
      <div onMouseEnter={()=>{setPostHovered(true) }}
       onMouseLeave={()=>{setPostHovered(false)}}
       onClick={()=>navigate(`/pin-detail/${pin.id}`)}
       className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
       >
        <img className='rounded-lg w-full' alt="img" src={pin.path}/>
        {postHovered && 
        <div className='absolute top-0 w-full h-full flex flex-col justify-beteween p-1 pr-2 pt-2 pb-2 z-50'
          style={{height:'100%'}}
          >
            <div className='flex flex-center justify-between w-full'>
              <div className='flex gap-2'>
                <a href={`${pin.path}`}
                  download
                  onClick={(e)=>download(e)}
                  className='flex bg-white w-9 h-9 rounded-full items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                  target="_blank"
                >
                  <MdDownloadForOffline/>
                </a>
              </div>
              {alreadySaved ? 
                <button type="button" className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none h-9'>{pin.saved?.length} Saved</button> : 
                <button type="button" className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none h-9'
                onClick={(e)=>{
                  e.stopPropagation()
                  savePin(pin.id)
                }}
                >Save</button>
              }
            </div>
            <div className='flex justify-between items-center gap-2 w-full bottom-0 mb-1' style={{position:'absolute'}}>
              {
                pin.destination ?
                  <a href={pin.destination} target="_blank" rel="noreferrer" style={{fontSize:12}}
                  className='bg-white flex items-center gap-2  text-black font-bold p-1 pl-4 pr-4 rounded-full opacity-700 hover:opacity-100 hover:shadow-md '>
                    <BsFillArrowUpRightCircleFill/>
                    {pin.destination.slice(8,25)}
                  </a>
                :''
              }
              {
                pin.user_info.google_id == userInfo.googleId &&
               ( <button type="button"  className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold text-base rounded-3xl hover:shadow-md outline-none mr-4'
               onClick={(e)=>{
                 e.stopPropagation()
                 deletePin(pin.id)
               }}
               >
                <AiTwotoneDelete/>
               </button>)
              }
            </div>

        </div>
        }
      </div>
      {
        // !location.pathname.includes('user-profile')
        (  !location.pathname.includes('user-profile') || pin.user_info.id != current_user.id )        ?   
          <Link to={`user-profile/${pin.user_info.id}`} className="flex gap-2 mt-2 items-center ">
            <img className="w-8 h-9 rounded-full object-cover " src={pin.user_info.image_url}/>
            <p className='font-semibold capitalize'>{pin.user_info.name} </p>
          </Link>
          : ''
      }

    </div>
  )
}

export default Pin