import React,{useState, useEffect} from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import MasonryLayout from './MasonryLayout'
import { pinQuery,pinCommentQuery,postComment,pinByCategory } from '../utils/data'
import Spinner from './Spinner'

function PinDetail({user}) {
  const [pins, setPins] = useState([])
  const [pinDetail, setPinDetail] = useState(null)
  const [pinComments, setPinComments] = useState([])

  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const {pinId} = useParams()

  const fetchPinDetails = ()=>{
    let pinData = pinQuery(pinId,user.google_id)
    pinData.then((res)=>{
      setPinDetail(res.data.pin)
      pinCommentQuery(pinId,user.google_id).then((res)=>{
        setPinComments(res.data.comments)
      })
    })
  }
  const fetchSimilarPins =()=>{
    let pins = pinByCategory(pinId,user.google_id)
    pins.then((res)=>{
      setPins(res.data.pins)
    })
  }
  
  useEffect(() => {
    fetchPinDetails()
    fetchSimilarPins()
  }, [pinId])
  const addComment=()=>{
    if(comment){
      setAddingComment(true)
      postComment(comment,pinId,user.google_id).then((res)=>{
        let newArr = [...pinComments]
        newArr[newArr.length] = res.data.comment
        setPinComments(newArr)
        setAddingComment(false)
        setComment('')
      }) 
    }
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
    element.download =pinDetail.name+'.jpg';
    element.click();
  };
  if (!pinDetail) return <Spinner message={"Fetching Pin Detail"}/>
  return (<>
    <div className='flex xl-flex-row flex-col m-auto bg-white' style={{maxWidth:1500, borderRadius:32}}>
      <div className='flex justify-center items-center md:items-start flex-initial'>
        <img src={pinDetail.path} className='rounded-t-3xl rounded-b-lg' alt="user-post"/>
      </div>
      <div className='w-full p-5 flex-1 xl:min-620'>
        <div className='flex flex-center justify-between'>
          <div className='flex gap-2 items-center'>
            <a href={pinDetail.path} download
              onClick={(e)=>{e.stopPropagation(); download(e)}}
              className='flex bg-white w-9 h-9 rounded-full items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
            >
              <MdDownloadForOffline/>
            </a>
          </div>
          <a href={pinDetail.destination} target="_blank" rel="noreferrer">
            {pinDetail.destination}
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3 '>
            {pinDetail.name}
          </h1>
          <p className='mt-3'>
            {pinDetail.about}
          </p>
        </div> 
        <Link to={`user-profile/${pinDetail.user_info?.id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
          <img className="w-8 h-9 rounded-full object-cover " src={pinDetail.user_info?.image_url}/>
          <p className='font-semibold capitalize'>{pinDetail.user_info?.name} </p>
        </Link>
        <h2 className='mt-5 text-2xl'>
          Comments
        </h2>
        <div className='max-h-370 overflow-y-auto'>
          {pinComments.length > 0 &&
            pinComments.map((comment,index)=>{
              return (
                <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={`comment_${index}`}>
                  <img src={comment.posted_by.image_url} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer'/>
                  <div className='flex flex-col'>
                    <p className='font-bold'>{comment.posted_by.name}</p>
                    <p className=''>{comment.content}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='flex flex-wrap mt-6 gap-3'>
          <Link to={`user-profile/${pinDetail.user_info?.id}`} >
            <img className="w-10 h-10 rounded-full cursor-pointer " src={pinDetail.user_info?.image_url}/>
          </Link>
          <input className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
          type="text"
          placeholder='Add a comment'
          value={comment}
          onChange={(e)=>{setComment(e.target.value)}}
          />
          <button type="button" className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
          onClick={addComment}
          >
            {addingComment ? 'Posting a comment...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
    {
      pins?
      <>
        <h2 className='text-center font-bold text-2xl mt-8 mb-4 '>
          More like this
        </h2>
        <MasonryLayout pins={pins}/>
      </>
      :<Spinner message={'Loading more pins... '} />
    }
    </>
  )
}

export default PinDetail