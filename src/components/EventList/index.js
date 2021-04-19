import './eventList.scss';


const EventList = ({listOfEvent}) => {
    const isLandedSuccessFul = (i) => {
        return i.rocket.first_stage.cores[0].land_success ? 'true' : 'false';
    }
    return (
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
                  <div className="field"><span className="label">Successful Landing: </span>{isLandedSuccessFul(event)}</div>
                </div>
              )
            })
          }
        </div>
    )
}

export default EventList