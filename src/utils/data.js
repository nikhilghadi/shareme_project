import axios from 'axios';

export const categories = [
  {
    name: 'cars',
    image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
  },
  {
    name: 'fitness',
    image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
  },
  {
    name: 'wallpaper',
    image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
  },
  {
    name: 'websites',
    image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
  },
  {
    name: 'photo',
    image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
  },
  {
    name: 'food',
    image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
  },
  {
    name: 'nature',
    image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  },
  {
    name: 'art',
    image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
  }, {
    name: 'travel',
    image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
  },
  {
    name: 'quotes',
    image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
  }, {
    name: 'cats',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  }, {
    name: 'dogs',
    image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg',
  },
  {
    name: 'other',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

export const userQuery =(google_id)=>{
   return axios({
        method: 'GET',
        url:"http://localhost:3001/user/",
        params: {
            google_id:google_id
        }
      })
}
export const userQueryById =(userId)=>{
  return axios({
       method: 'GET',
       url:"http://localhost:3001/user/",
       params: {
           userId:userId
       }
     })
}
export const pinQuery =(id,google_id)=>{
  return axios({
    method: 'GET',
    url:"http://localhost:3001/pin/",
    params: {
        pin_id:id,googleId:google_id
    }
  })
}
export const pinByCategory = (id,google_id)=>{
  return axios({
    method: 'GET',
    url:"http://localhost:3001/search_by_category",
    params: {
        pin_id:id,googleId:google_id
    }
  })
}
export const searchPinData=(text)=>{
  return axios({
    method: 'GET',
    url:"http://localhost:3001/pin_search",
    params: {
        text:text
    }
  })
}
export const pinCommentQuery=(pin_id,google_id)=>{
  return axios({
    method: 'GET',
    url:"http://localhost:3001/comments/",
    params: {
        pin_id:pin_id,googleId:google_id
    }
  })
}
export const postComment=(content,pin_id,google_id)=>{
  return axios({
    method: 'POST',
    url:"http://localhost:3001/comments/",
    params: {
        pin_id:pin_id,googleId:google_id,comment:{content:content}
    }
  })
}
export const commentCommentQuery=(comment_id,google_id)=>{
  return axios({
    method: 'GET',
    url:"http://localhost:3001/comment/comments",
    params: {
        comment_id:comment_id,googleId:google_id
    }
  })
}
export const searchQuery=(searchTerm)=>{
  return axios({
    method: 'GET',
    url:"http://localhost:3001/pins/",
    params: {
        searchTerm:searchTerm
    }
  })
}

export const feedQuery=(user_id=null,status=null)=>{
  return axios({
    method: 'GET',
    url:"http://localhost:3001/pins/",
    params:{user_id:user_id,status:status}
  })
}

export const fetchAlredySaved = (pin_id,googleId)=>{
  return axios({
    method: 'GET',
    url:"http://localhost:3001/checked_saved",
    params:{
      pin_id:pin_id,googleId:googleId
    }
  })
}

export const savePinData = (pin_id,googleId)=>{
  return axios({
    method: 'POST',
    url:"http://localhost:3001/save_pin",
    params:{
      pin_id:pin_id,googleId:googleId
    }
  })
}
export const createPin =(data,image,googleId)=>{
  let formData = new FormData()
  formData.append('image',image)
  formData.append('title',data.title)
  formData.append('destination',data.destination)
  formData.append('about',data.about)
  formData.append('category',data.category)
  formData.append('googleId',googleId)

  return axios.post("http://localhost:3001/pin", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export const deletePinData = (pin_id,googleId)=>{
  return axios({
    method: 'DELETE',
    url:"http://localhost:3001/pin",
    params:{
      pin_id:pin_id,googleId:googleId
    }
  })
}