import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';

import {Videos,ChannelCard} from './'
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {

  const [channelDetail,setChannelDetail] = useState(null);
  const [videos,setVideos] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
     .then((data) => setChannelDetail(data?.items[0]) )

     fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
     .then((data) => setVideos(data?.items) )
  },[id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <ChannelCard channelDetail={channelDetail} variant='h4' fontWeight='bold'/>
      </Box>
      <div style={{border:"1px solid #3d3d3d"}}/>
      <Box display='flex' p='2' sx={{mt:'15px'}}>
        <Box sx={{mr:{sm:'120px'}}}/>
          <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail
