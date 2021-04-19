import './loader.scss';
const Loader = (props) =>{
    return (
        <div className="loader-container">
            <div class="content">
                <div class="spinner">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7" stroke-width="2"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Loader;