import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import {searchQuery, feedQuery} from '../utils/data'
function Feed() {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState([])
  const {categoryId} = useParams();
  useEffect(() => {
    setLoading(true)
    if(categoryId){
      let pins = searchQuery(categoryId)
      pins.then((res)=>{
        console.log("pins",res);
        setPins(res.data.pins)
       setLoading(false)
      })
    }else{
      let pins = feedQuery()
      pins.then((res)=>{
        console.log("pins",res);
        setPins(res.data.pins)
       setLoading(false)
      })
    }
  }, [categoryId])
  console.log("statrs",pins,loading,categoryId);
  if (loading) return <Spinner message={'We are adding new ideas to your feed'}/>
  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed