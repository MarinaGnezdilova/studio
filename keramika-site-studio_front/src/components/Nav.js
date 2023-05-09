import imageLogo from "../images/logo.png";
import iconVk from "../images/vk.svg";
import iconTelegram from "../images/telegram.svg";
function Nav(props) {
  return (
    <nav className="nav">
      <div className="nav__header">
        <div className="nav__icon">
        <a
            href="https://t.me/happy_keramika"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={iconTelegram}
              alt="Иконка телеграм"
              className="contacts__icon"
            />
          </a>
          <a
            href=" https://vk.com/happy_keramika"
            target="_blank"
            rel="noreferrer"
          >
            <img src={iconVk} alt="Иконка вк" className="contacts__icon" />
          </a>
        </div>
          
        <a href="/">
          <img className="nav__logo" src={imageLogo} alt="Логотип" />
        </a>
        
        <address className="nav__contacts">
          <p>г.Тула ул.Болдина д.98А оф.319</p>
          <a href="tel:+79101660922" className="nav__tel">+79101660922</a>
        </address>
      </div>
      <div className="nav__main-menu">
      {props.children}
      </div>
    </nav>
  );
}

export default Nav;
