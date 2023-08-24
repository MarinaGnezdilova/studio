import React from "react";
import ScheduleElement from "./ScheduleElement";
import Nav from "./Nav";
import Service from "./Sevice";
import bigImageGroupMK from "../images/bigImageGroupMK.png";
import smallImageGroupImage1 from "../images/smallImageGroupImage1.png";
import smallImageGroupImage2 from "../images/smallImageGroupImage2.png";
import bigImageIndMK from "../images/bigImageIndMK.png";
import smallImageIndImage1 from "../images/smallImage1IndMK.png";
import smallImageIndImage2 from "../images/smallImage2IndMK.png";
import bigImageCorpMK from "../images/bigImageCorpMK.png";
import smallImageCorpImage1 from "../images/smallImage1CorpMK.png";
import smallImageCorpImage2 from "../images/smallImage2CorpMK.png";
import moldAnything from "../images/mold-anything.png";
import accessiblePrice from "../images/accessible-price.png";
import comfortableAtmosphere from "../images/comfortable-atmosphere.png";
import dontBePainter from "../images/dont-be-painter.png";
import firstTime from "../images/first-time.png";
import relax from "../images/relax.png";
import Form from "./Form";

import Question from "./Question";
import Contacts from "./Contacts";
import Process from "./Process";
import Guests from "./Gueest";
import Popup from "./Popup";
import SuccessPopup from "./SuccessPopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main() {
  const [isPopupOpen, setPopupOpen] = React.useState(false);
  const [MKs, setMKs] = React.useState([]);
  const [isClickOnMKCard, setIsClickOnMKCard] = React.useState(false);
  const [currentMK, setCurrentMK] = React.useState('');
  const [currentDate, setCurrentDate] = React.useState('');
  const [currentService, setCurrentService] = React.useState('');
  const [isService, setIsService] = React.useState(false);
  const [month, setMonth] = React.useState('');
  const [isSuccessPopupOpen, SetIsSuccessPopupOpen] = React.useState(false);


  React.useEffect(() => {
    api.getMK()
    .then((res) => {
      setMKs(res.mks);
    })
    .catch((e) => {
      alert("Что-то пошло не так!");
    })
  }, []);

  React.useEffect(() => {
    api.getMonth()
    .then((res) => {
      setMonth(res.month[0].name);
    })
    .catch((e) => {
      alert("Что-то пошло не так!");
    })
  }, []);

function handleMKClick(mk) {
  setIsService(false);
  setPopupOpen(true);
  setIsClickOnMKCard(false);
  setCurrentMK(mk.shortTitle);
  setCurrentDate(mk.date);
  setCurrentService('Расписание');
}

function closePopup() {
  setPopupOpen(false);
  setCurrentMK('');
  setCurrentDate('');
  setCurrentService('');
  setIsService(false);
  setIsClickOnMKCard(false);
  
}

function handleSubmitForm(form) {
  let message ='Заявка с сайта. ';
    message+=`Имя отправителя: ${form.name}, Tel: ${form.tel}`;

  api.saveLid(form)
  .then(() => {
    SetIsSuccessPopupOpen(true);
  })
  .catch((e) => {
    alert("Что-то пошло не так!");
  })
  api.sendTgMessagge(message)
  .catch((e) => {
    alert("Что-то пошло не так!");
  })
}

function handleGroupMKClick() {
  setPopupOpen(true);
  setIsService(true);
  setIsClickOnMKCard(true);
  setCurrentMK("Групповой МК");
  setCurrentService("Групповой МК");
}

function handleIndMK() {
  setPopupOpen(true);
  setIsService(true);
  setIsClickOnMKCard(true);
  setCurrentMK("Индивидуальный МК");
  setCurrentService("ИМК");
}

function handleHolidayMK() {
  setPopupOpen(true);
  setIsService(true);
  setIsClickOnMKCard(true);
  setCurrentMK("Праздничный МК");
  setCurrentService("Праздник");
}

function handleCertificateForm(form) {
  let message ='Заявка с сайта. ';
    message+=`Имя отправителя: ${form.name}, Tel: ${form.tel}`;

  api.saveCertificate(form)
  .then(() =>{
    SetIsSuccessPopupOpen(true);
  })
  .catch((e) => {
    alert("Что-то пошло не так!");
  })
  api.sendTgMessagge(message)
  .catch((e) => {
    alert("Что-то пошло не так!");
  })
}

function handleCloseSuccessPopup() {
  SetIsSuccessPopupOpen(false);
}
  return (
    <CurrentUserContext.Provider>
         <header>
        <Nav 
        children={
          <>
           <a className="nav__el" href="#schedule">
          Расписание
        </a>
        <a className="nav__el nav__el-hidden" href="#process">
          Этапы МК
        </a>
        <a className="nav__el" href="#services">
          Услуги
        </a>
        <a className="nav__el" href="#form">
          Сертификат
        </a>
        <a className="nav__el" href="#guests">
          Наши гости
        </a>
        <a className="nav__el nav__el-hidden" href="#questions">
          Вопросы
        </a>
        <a className="nav__el" href="#contacts">
          Контакты
        </a>
          </>
        }
        />
      </header>
    <page>
   
      <section className="about-studio-section" id="about-studio">
        <div className="about-studio-main-block">
        <h1 className="about-studio-section__title">happy keramika</h1>
        <h2 className="about-studio-section__title-italic">студия керамики</h2>
        <p className="about-studio-section__text">Проводим мастер-классы по ручной лепке из глины для детей и взрослых</p>
        <a className="about-studio-section__button" href="#schedule">расписание</a>
      </div> 
        
        <div className="about-studio__advantages">
          <div className="about-studio__advantage">
            <img src={moldAnything} className="about-studio__advantage-image"/>
            <div>
              <h3 className="about-studio__advantage-title">Лепим, что хотим</h3>
              <p className="about-studio__advantage-text">Выбирайте то, что хотите слепить именно вы и приходите реализовать свою идею</p>
            </div>
          </div>
          <div className="about-studio__advantage">
            <img src={dontBePainter} className="about-studio__advantage-image"/>
            <div>
              <h3 className="about-studio__advantage-title">Не надо быть художником</h3>
              <p className="about-studio__advantage-text">Чтобы сделать красивую работу не нужно уметь рисовать или лепить</p>
            </div>
          </div>
          <div className="about-studio__advantage">
            <img src={relax} className="about-studio__advantage-image"/>
            <div>
              <h3 className="about-studio__advantage-title">Отдых от работы и суеты</h3>
              <p className="about-studio__advantage-text">Творчество это прекрасный способ отдохнуть и расслабиться от суеты и рутины</p>
            </div>
          </div>
          <div className="about-studio__advantage">
            <img src={firstTime} className="about-studio__advantage-image"/>
            <div>
              <h3 className="about-studio__advantage-title">Получится с 1 раза</h3>
              <p className="about-studio__advantage-text">Темы мастер-классов проработаны для тех, кто первый раз работает с глиной</p>
            </div>
          </div>
          <div className="about-studio__advantage">
            <img src={accessiblePrice} className="about-studio__advantage-image"/>
            <div>
              <h3 className="about-studio__advantage-title">Доступные цены</h3>
              <p className="about-studio__advantage-text">Стоимость мастер-класса сравнима с ценой обеда в кафе</p>
            </div>
          </div>
          <div className="about-studio__advantage">
            <img src={comfortableAtmosphere} className="about-studio__advantage-image"/>
            <div>
              <h3 className="about-studio__advantage-title">Комфортная атмосфера</h3>
              <p className="about-studio__advantage-text">Легкая музыка, индивидуальный подход, есть все чтобы расслабиться и посвятить время себе</p>
            </div>
          </div>

        </div>
        

      </section>
      <section  id="schedule" className="schedule-section">
        <div className="schedule__title">
          <h2 className="section-title">
            РАСПИСАНИЕ <span className="section-title-italics schedule__title-italics">занятий</span>
          </h2>
         <div className="schedule__month">
            <h3>{month}</h3>
      </div>
      </div>
      <p className="schedule__text">
      Вы можете прийти к нам в студию на один из групповых мастер-классов по керамике. Есть расписание на месяц. На понравившийся мастер-класс вы можете записаться через форму на кнопке "Записаться" или по контактам указанным в шапке сайта. 
      </p>
        <div className="schedule-block">
          {
            MKs.map((mk) => (
              <ScheduleElement
              key={mk._id}
              image={mk.image}
              mk={mk}
              title={mk.title}
              data={mk.date}
              description={mk.description}
              duration={mk.duration}
              price={mk.price}
              onMKClick={handleMKClick}
              onMain={true}
              shortTitle={mk.shortTitle}

              />
            ))
          }
        </div>
        </section>
      <section id="process" className="process">
        <h2 className="section-title process__title">ЭТАПЫ МК</h2>
        <h3 className="section-title-italics process__title-italics">как проходят мастер-классы</h3>
        <Process />

      </section>
      <section id="services" className="services">
        <h2 className="section-title ">
          УСЛУГИ <span className="section-title-italics services-title-italics">мастерской</span>
        </h2>
        <Service
          bigImage={bigImageGroupMK}
          smallImage1={smallImageGroupImage1}
          smallImage2={smallImageGroupImage2}
          title="Групповые мастер-классы для взрослых"
          description="Даты смотрите в блоке с расписанием"
          description1="Для мастер-класса назначается тема. Например,если тема – тыква, то все в группе лепят тыкву. И конечно тыква у каждого получится абсолютно уникальная."
          amount="до 8 человек"
          price="1500"
          service="ГруппМК"
          children={
            <button className="button button_service" onClick={handleGroupMKClick}>Записаться</button>
          }
        />
        <Service
          bigImage={bigImageIndMK}
          smallImage1={smallImageIndImage1}
          smallImage2={smallImageIndImage2}
          title="Индивидуальные мастер-классы"
          description="Вы самостоятельно выбираете дату и тему. Можете собрать до 10 участников."
          description1="Можно прийти одному, с другом, с семьей. Цена зависит от сложности и объема изделия. Минимальная цена - 3000р, это если два участника лепят по кружке."
          amount="до 10 человек"
          price="3000"
          service="ИМК"
          children={
            <button className="button button_service" onClick={handleIndMK}>Записаться</button>
          }
        />
        <Service
          bigImage={bigImageCorpMK}
          smallImage1={smallImageCorpImage1}
          smallImage2={smallImageCorpImage2}
          title="Праздники в мастерской"
          description="Вы самостоятельно выбираете дату и тему. Можете собрать до 10 участников."
          description1="Если у вас день рождение, корпоратив, тимбилдинг, девичник или любое другое мероприятие, то вы можете отметить его в мастерской за лепкой и фуршетом. Вода, чай и кофе уже есть в мастерской. Также можно принести с собой еду и напитки."
          amount="до 10 человек"
          price="1500"
          service="Праздник"
          children={
            <button className="button button_service" onClick={handleHolidayMK}>Записаться</button>
          }
        />
      </section>
      <section id="form" className="form">
        <div className="form__header">
          <h2 className="section-title form__title">
            СЕРТИФИКАТ
            <span className="section-title-italics form-title-italics">
              подарочный
            </span>
          </h2>
          <p className="form__header-text">
            Любые услуги мастерской можно оплатить сертификатом. Если сертификат
            на 3000руб, а мастер-класс стоит 1500руб, то оставшиеся деньги можно
            использоваться на другой мастер-класс.
          </p>
        </div>
        <Form 
        onAddCertificate={handleCertificateForm}
        />
      </section>
      <section id="guests" className="guests">
        <div className="schedule__title">
          <h2 className="section-title ">
            НАШИ ГОСТИ{" "}
            <span className="section-title-italics guest__title-italics">и их работы</span>
          </h2>
        </div>
      <Guests />
      </section>
      <section id="questions" className="questions">
        <div className="schedule__title">
          <h2 className="section-title questions__title">
            ВОПРОСЫ{" "}
            <span className="section-title-italics questions__title-italics">наших гостей</span>
          </h2>
        </div>
        <div className="questions__block">
          <Question
            questionText="У меня точно получится слепить что-то?"
            answer="Точно получится. Для ручной лепки из глины не нужны никаикие особые навыки. Новичок легко может создать собственную работу."
          />
          <Question
            questionText="Когда я смогу забрать готовый предмет? "
            answer="Через 5-7 дней после покрытия изделия глазурью вы сможете забрать готовый предмет."
          />
           <Question
            questionText="Могу ли я слепить то, что придумал и нарисовал? "
            answer="Конечно можно использовать свои эскизы. Возможность реализовать то, что на эскизе зависит от сложности предмета. Но мы обязательно сделаем что-то близкое к вашей идее."
          />
          <Question
            questionText="Мы будем использовать гончарный круг? "
            answer="У нас только ручная лепка, так как она доступна каждому без особой подготовки. Отсутствие гончарного круга никак не ограничивает возможности. Методом ручнной лепки вы можете создать любой предмет."
          />
          <Question
            questionText="Из сделанной посуды можно пить/есть?"
            answer="Зависит от того, какой декор и какие глазури вы выберете. Конечно можно делать посуду, которую можно использовать по назначению."
          />
        </div>
      </section>
      <section id="contacts" className="contacts">
        <h2 className="section-title contacts-title">
          КОНТАКТЫ
          <span className="section-title-italics contacts-title-italics">
            для связи и любых вопросов
          </span>
        </h2>
        <Contacts />
      </section>
      <Popup 
      isPopupOpen={isPopupOpen}
      OnClosePopup={closePopup}
      visibleSelectServive={isClickOnMKCard}
      currentMK={currentMK}
      currentDate={currentDate}
      currentService={currentService}
      onAddLid={handleSubmitForm}
      isService={isService}
      />
      <SuccessPopup 
      isPopupOpen={isSuccessPopupOpen}
      onClosePopup={handleCloseSuccessPopup}
      />
    </page>
    </CurrentUserContext.Provider>
  );
}

export default Main;
