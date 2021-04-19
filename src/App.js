
import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Header from './components/Header';


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
    <>
      <Header />
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
                          <div key={v} onClick={() => handleFilters("launch_year", 2006 + idx)} className={`year ${(filters["launch_year"] && filters["launch_year"] === 2006 + idx) ? 'enable': ''}`}>{2006 + idx}</div>
                        )
                      })
                  }
                </div>
            </div>
            <div className="field-container">
                <div className="head">Successful Launch</div>
                <div className="years">
                  <div onClick={() => handleFilters("launch_success", true)} className={`year ${(filters["launch_success"] && filters["launch_success"] === true) ? 'enable': ''}`}>Yes</div>
                  <div onClick={() => handleFilters("launch_success", false)} className={`year ${(filters["launch_success"] && filters["launch_success"] === false) ? 'enable': ''}`}>No</div>
                </div>
            </div>
            <div className="field-container">
                <div className="head">Successful Landing</div>
                <div className="years">
                  <div onClick={() => handleFilters("land_success", true)} className={`year ${(filters["land_success"] && filters["land_success"] === true) ? 'enable': ''}`}>Yes</div>
                  <div onClick={() => handleFilters("land_success", false)} className={`year ${(filters["land_success"] && filters["land_success"] === false) ? 'enable': ''}`}>No</div>
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
                  <div className="field"><span className="label">Successful Launch: </span>{typeof event.launch_success === 'boolean' && event.launch_success.toString()}</div>
                  <div className="field"><span className="label">Successful Landing: </span>{typeof event.land_succuss === 'boolean' && event.land_succuss.toString()}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;
