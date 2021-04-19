
import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Filters from './components/Filters';
import Loader from './components/Loader';
import EventList from './components/EventList';
import { API_URI } from './constants';


function App() {
  const [listOfEvent, updateEvent] = useState([]);
  const [filters, updateFilters] = useState({});
  const [loading, updateLoading] = useState(false);
  useEffect(() => {
    updateLoading(true);
    getList()
    .then(res => {
      setTimeout(() => {
        updateEvent(res.data);
        updateLoading(false);
      }, 500)
    })
  },[]);
  const getList = () => {
    let filterString = '';
    Object.keys(filters).map(key => {
      filterString = filterString + `&${key}=${filters[key]}`;
    })
    return axios.get(API_URI + filterString)
  }
  const handleFilters = (fieldName, value) => {
    if(filters[fieldName] && filters[fieldName] === value) {
      delete filters[fieldName];
    } else {
      filters[fieldName] = value;
    }
    updateFilters(filters);
    updateLoading(true);
    getList().then(res => {
      setTimeout(() => {
        updateEvent(res.data);
        updateLoading(false);
      }, 500)
    })
  }
  return (
    <>
      <Header />
      <div className="container">
        <Filters filters={filters} handleFilters={handleFilters}/>
        <EventList listOfEvent={listOfEvent} />
        {
          loading &&
          <Loader />
        }
      </div>
      <Footer />
    </>
  );
}

export default App;
