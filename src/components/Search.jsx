import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { searchPinData } from '../utils/data'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'

function Search({searchTerm}) {
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  useEffect(() => {
    if(searchTerm=="")
    navigate(`/`)

    setLoading(true)
    searchPinData(searchTerm).then((res)=>{
      setPins(res.data.pins)
      setLoading(false)
    })
  }, [searchTerm])
  if (loading) return <Spinner message={'Searching pins for you...'}/>

  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Search