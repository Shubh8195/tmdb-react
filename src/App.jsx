import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration , getGenres } from './store/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResult from './pages/searchResult/SearchResult'
import PageNotFound from './pages/404/PageNotFound'



function App() {
   // const { url } = useSelector((state) => state.home)

   const dispatch = useDispatch();

   useEffect(() => {
      fetchApiConfiguration();
      genresCall();
   }, [])

   const fetchApiConfiguration = () => {
      fetchDataFromApi("/configuration")
         .then((response) => {
            // console.log(response);
            const url = {
               backdrop: response.images.base_url + "original",
               poster: response.images.base_url + "original",
               profile: response.images.base_url + "original",
            }
            dispatch(getApiConfiguration(url))
         });
   }

   const genresCall = async () => {
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((url) => {
         promises.push(fetchDataFromApi(`/genre/${url}/list`));
      })

      const data = await Promise.all(promises)
      
     
       data.map(({genres}) =>{
          return genres.map((item) => (allGenres[item.id] = item))
       })
       dispatch(getGenres(allGenres))
   }
   return (

      <Router >
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
         <Footer />
      </Router>

   )
}

export default App
