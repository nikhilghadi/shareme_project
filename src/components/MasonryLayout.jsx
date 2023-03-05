import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakPoints = {
  default:4,
  3000:6,
  2000:5,
  1200:3,
  1000:2,
  500:1
}
function MasonryLayout({pins}) {
  return (
    <div>
      {
        pins.length > 0 ? 
        <Masonry className='flex animate-slide-fwd ' breakpointCols={breakPoints}>
        {pins.map((pin)=> <Pin pin={pin} key={pin.id} className="w-max" /> )}
      </Masonry>
        : 
        <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
          No Pins Found
          </div>
      }
    
    </div>
  )
}

export default MasonryLayout