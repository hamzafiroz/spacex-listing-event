
import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';


function App() {
  const [listOfEvent, updateEvent] = useState([]);
  const [filters, updateFilters] = useState({});
  useEffect(() => {
    getList()
    .then(res => {
      updateEvent(res.data)
    })
  },[]);
  const getList = () => {
    let filterString = '';
    Object.keys(filters).map(key => {
      filterString = filterString + `&${key}=${filters[key]}`;
    })
    return axios.get("https://api.spacexdata.com/v3/launches?limit=100" + filterString)
  }
  const handleFilters = (fieldName, value) => {
    filters[fieldName] = value;
    updateFilters(filters);
    getList().then(res => {
      updateEvent(res.data);
    })
  }
  return (
    <div className="container">
      <div className="filter-container">
        <div className="card">
          <div className="heading">
              Filter
          </div>
          <div className="field-container">
              <div className="head">Launch Year</div>
              <div className="years">
                {
                    Array.from(Array(15).keys()).map((v, idx) => {
                      return (
                        <div key={v} onClick={() => handleFilters("launch_year", 2006 + idx)} className='year'>{2006 + idx}</div>
                      )
                    })
                }
              </div>
          </div>
          <div className="field-container">
              <div className="head">Successful Launch</div>
              <div className="years">
                <div className='year'>Yes</div>
                <div className='year'>No</div>
              </div>
          </div>
          <div className="field-container">
              <div className="head">Successful Landing</div>
              <div className="years">
                <div className='year'>Yes</div>
                <div className='year'>No</div>
              </div>
          </div>
        </div>
      </div>
      <div className="card-container">
        {
          listOfEvent.map(event => {
            return (
              <div key={event.launch_date_unix} className="card">
                <div className="image-container">
                  <img src={event.links.mission_patch} alt="mission"></img>
                </div>
                <div className="heading">{event.mission_name} #{event.flight_number}</div>
                {
                  event.mission_id.length ?
                  <div className="mission_id">
                      <span className="label">
                        Mission Id : {event.mission_id.map((id, index) => {
                          return (
                            <span key={id} className="id">
                                {id}{index === event.mission_id.length -1 ? "": ', '}
                            </span>
                          )
                        })}
                      </span>
                  </div>
                  :
                  <div/>
                }
                <div className="field"><span className="label">Launch Year: </span>{event.launch_year}</div>
                <div className="field"><span className="label">Successful Launch: </span>{event && !!event.launch_success}</div>
                <div className="field"><span className="label">Successful Landing: </span>{event && !!event.launch_success}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
