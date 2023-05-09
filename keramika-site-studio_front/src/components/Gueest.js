import guestsWork from "../images/green-plate.jpg";
import guestsWork1 from "../images/guestsworks1.png";
import guestsWork2 from "../images/guestsworks2.png";
import guestsWork3 from "../images/guestsworks3.png";
import guestsWork4 from "../images/guestsworks4.png";
import guestsWork5 from "../images/guestsworks5.png";
import guestsWork6 from "../images/blue-plate.jpg";
import guestsWork7 from "../images/guestsworks7.png";
import guestsWork8 from "../images/guestsworks8.png";
import guestsWork9 from "../images/guestsworks9.jpg";
import guestsWork10 from "../images/guestsworks10.jpg";
import guestsWork11 from "../images/guestsworks11.jpg";
import guestsWork12 from "../images/guestsworks12.jpg";
import guestsWork13 from "../images/hug.jpg";
function  Guests() {
    return (
        <div className="guests__images">
            <img src={guestsWork3} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork1} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork8} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork2} alt="Работа гостя" className="guests__image" />
        
        {/*<img src={guestsWork4} alt="Работа гостя" className="guests__image" />*/}
        <img src={guestsWork13} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork6} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork12} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork7} alt="Работа гостя" className="guests__image" />
        
        <img src={guestsWork9} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork11} alt="Работа гостя" className="guests__image" />
        <img src={guestsWork10} alt="Работа гостя" className="guests__image" />
        
        
      </div>

    )
}

export default Guests;
