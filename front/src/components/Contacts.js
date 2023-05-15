import imageMap from "../images/map.png";
import iconVk from "../images/vk.svg";
import iconTelegram from "../images/telegram.svg";
function Contacts() {
  return (
    <div className="contacts-block">
      <iframe className="contacts__map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A591f84aafbc443021d6ff0bf8d7c9da9087278711548b1faf48febed3e3f72df&amp;source=constructor" width="1280" height="720" ></iframe>
        <div className="contacts__information">
        <address className="contacts__address">
        <p className="contacts__address-text">
          <span className="contacts__address-title">Адрес мастерской:</span>
          г.Тула ул.Болдина 98А оф 319
        </p>
        <p className="contacts__address-text">
          <span className="contacts__address-title">Телефон:</span>
          +7 (910) 166-09-22
        </p>
        <div className="contacts__icons">
          <a href="https://t.me/happy_keramika" target="_blank" rel="noreferrer">
            <img
              src={iconTelegram}
              alt="Иконка телеграм"
              className="contacts__icon"
            />
          </a>
          <a href=" https://vk.com/happy_keramika" target="_blank" rel="noreferrer">
            <img src={iconVk} alt="Иконка вк" className="contacts__icon" />
          </a>
        </div>
        <div className="contacts__links">
          <a
            href=" https://t.me/happy_keramika"
            className="contacts__link"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            https://t.me/happy_keramika
          </a>
          <a
            href=" https://vk.com/happy_keramika"
            className="contacts__link"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            https://vk.com/happy_keramika
          </a>
        </div>
      </address>
      <nav className="contacts__nav">
        <p className="contacts__nav-title">Меню:</p>
        <a className="contacts__nav-el" href="#about-studio">
          О студии
        </a>
        <a className="contacts__nav-el" href="#schedule">
          Расписание
        </a>
        <a className="contacts__nav-el" href="#process">
          Этапы МК
        </a>
        <a className="contacts__nav-el" href="#services">
          Услуги
        </a>
        <a className="contacts__nav-el" href="#form">
          Сертификат
        </a>
        <a className="contacts__nav-el" href="#guests">
          Наши гости
        </a>
        <a className="contacts__nav-el" href="#questions">
          Вопросы
        </a>
        <a className="contacts__nav-el" href="#contacts">
          Контакты
        </a>
      </nav>
        </div>
      
    </div>
  );
}
export default Contacts;
