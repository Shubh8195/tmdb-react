import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoading/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayBtn } from "./PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";


const DetailsBanner = ({ video, crew }) => {
   const [show, setShow] = useState(false)
   const [videoId, setVideoId] = useState(null)

   const { mediaType, id } = useParams();
   const { data, loading } = useFetch(`/${mediaType}/${id}`);

   const director = crew?.filter((c) => c?.job === "Director")
   const writer = crew?.filter((f) => f?.job === "Writer" || f?.job === "Screenplay" || f?.job === "Story")

   const _genres = data?.genres?.map((g) => g.id)

   const { url } = useSelector((state) => state.home);
   const toHoursAndMinutes = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
   };

   return (
      <div className="detailsBanner">
         {!loading ? (
            <>
               {!!data && (
                  <React.Fragment>
                     <div className="backdrop-img">
                        <Img src={url.backdrop + data?.backdrop_path} />
                     </div>
                     <div className="opacity-layer"></div>
                     <ContentWrapper >
                        <div className="content">
                           <div className="left">
                              {!data.poster_path ? (
                                 <Img src={PosterFallback} className="posterImg" />
                              ) : (
                                 <Img src={url.backdrop + data?.poster_path} className="posterImg" />)}
                           </div>
                           <div className="right">
                              <div className="title">
                                 {` ${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`}
                              </div>
                              <div className="subtitle">
                                 {data.tagline}
                              </div>
                              <Genres data={_genres} />
                              <div className="row">
                                 <CircleRating rating={data?.vote_average.toFixed(1)} />
                                 {video && (
                                    <div className="playbtn" onClick={() => {
                                       setShow(true)
                                       setVideoId(video?.key)
                                    }}>
                                       <PlayBtn />
                                       <span className="text">Watch Trailer</span>
                                    </div>
                                 )}
                              </div>
                              <div className="overview">
                                 <div className="heading">
                                    Overview
                                 </div>
                                 <div className="description">
                                    {data.overview}
                                 </div>
                              </div>

                              <div className="info">
                                 {data?.status && (
                                    <div className="infoItem">
                                       <span className="text bold">
                                          Status:{" "}
                                       </span>
                                       <span className="text">
                                          {data.status}
                                       </span>
                                    </div>
                                 )}

                                 {data?.release_date && (
                                    <div className="infoItem">
                                       <span className="text bold">
                                          Released:{" "}
                                       </span>
                                       <span className="text">
                                          {dayjs(data?.release_date).format("MMM DD, YYYY ")}
                                       </span>
                                    </div>
                                 )}

                                 {data?.runtime && (
                                    <div className="infoItem">
                                       <span className="text bold">
                                          Runtime:{" "}
                                       </span>
                                       <span className="text">
                                          {toHoursAndMinutes(data?.runtime)}
                                       </span>
                                    </div>
                                 )}
                              </div>

                              {director?.length > 0 && (
                                 <div className="info">
                                    <span className="text bold">
                                       Director:{" "}
                                    </span>
                                    <span className="text">
                                       {director?.map((d, i) => (
                                          <span key={i}>
                                             {d.name}
                                             {director.length - i !== i && director.length > 1 && ", "}
                                          </span>
                                       ))}
                                    </span>
                                 </div>
                              )}

                              {writer?.length > 0 && (
                                 <div className="info">
                                    <span className="text bold">
                                       Writer:{" "}
                                    </span>
                                    <span className="text">
                                       {writer?.map((w, i) => (
                                          <span key={i}>
                                             {w.name}
                                             {writer.length - i !== i && writer.length > 1 && ", "}
                                          </span>
                                       ))}
                                    </span>
                                 </div>
                              )}

                              {data?.created_by?.length > 0 && (
                                 <div className="info">
                                    <span className="text bold">
                                       Creator:{" "}
                                    </span>
                                    <span className="text">
                                       {data?.created_by?.map((w, i) => (
                                          <span key={i}>
                                             {w.name}
                                             {data?.created_by?.length - i !== i && data?.created_by?.length > 1 && ", "}
                                          </span>
                                       ))}
                                    </span>
                                 </div>
                              )}
                           </div>
                        </div>
                        <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                     </ContentWrapper>
                  </React.Fragment>

               )}
            </>
         ) : (
            <div className="detailsBannerSkeleton">
               <ContentWrapper>
                  <div className="left skeleton"></div>
                  <div className="right">
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                  </div>
               </ContentWrapper>
            </div>
         )}
      </div>
   );
};

export default DetailsBanner;