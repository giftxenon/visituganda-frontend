
import "./DisplayOptions.css";

function DisplayOptions() {

    const handleClick = (Category) => {
        alert(`You selected: ${Category}`)
    }
  return (
    <div>
         <h1>Choose category</h1>
         <div className="listOfCategory">
         <ul>
            <li onClick={() => handleClick('Tour & Travel')}>Tour & Travel</li>
            <li onClick={() => handleClick('Car Rental')}>Car Rental</li>
            <li onClick={() => handleClick('Attractions')}>Attractions</li>
            <li onClick={() => handleClick('Accomodation')}>Accomodation</li>
            <li onClick={() => handleClick('Travel Partner')}>Travel Partner</li>
         </ul>
       
         </div>
    </div>
  )
}

export default DisplayOptions
