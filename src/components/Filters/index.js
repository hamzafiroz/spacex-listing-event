import './filter.scss';


const Filters = ({filters, handleFilters}) => {
    return (
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
                  <div onClick={() => handleFilters("land_success", true)} className={`year ${(filters["land_success"] === true) ? 'enable': ''}`}>Yes</div>
                  <div onClick={() => handleFilters("land_success", false)} className={`year ${(filters["land_success"] === false) ? 'enable': ''}`}>No</div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default Filters