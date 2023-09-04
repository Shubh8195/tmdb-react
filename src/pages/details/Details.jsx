import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import "./style.scss"
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendations from './carousels/Recommendations';

function Details() {

  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: loadingData } = useFetch(`/${mediaType}/${id}/credits`);


  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={loadingData} />
      <VideosSection data={data?.results} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendations mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details