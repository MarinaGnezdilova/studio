import buttonClose from "../images/button-close3.svg";
function SuccessPopup(props) {
    const popupClassName = `success-popup ${props.isPopupOpen ? " " : "success-popup_opened" }`; 
    function handleClose() {
        props.onClosePopup();
    }
    return(
       <div className={popupClassName}>
        <div className="success-popup__title">
            Ваша заявка принята!
        </div>
        <p className="success-popup__text">Мы свяжемся с вами для уточнения деталей в течение 24 часов.</p>
        <button className="success-popup__button-close" onClick={handleClose}>
          <img
            className="popup__button-close-image"
            alt="Кнопка закрытия попапа"
            src={buttonClose}
          />
        </button>

       </div> 
    )
}

export default SuccessPopup;