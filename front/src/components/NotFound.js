import React from "react";
import Nav from "./Nav";
import { useNavigate, Link } from "react-router-dom";
function NotFound() {
    const navigate = useNavigate();
    return(
        <>
        <header id="about-studio">
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
      <section className="not-found">
      <h2 className="not-found__title">
        Такой страницы не существует. 
      </h2>
      <Link to="/" className="not-found__link">Вернуться на основную страницу студии.</Link>
      </section>
        </>
        
    )
}

export default NotFound;