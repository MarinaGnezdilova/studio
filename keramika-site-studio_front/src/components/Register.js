
import Nav from "../components/Nav";
import React from "react";
import { api } from "../utils/Api";

function Register() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [accessRegistration, setAccessRegistration ] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      api.getUserInfo()
      .then((res) => {
        console.log(res.data);
       })
       .then(() => {
        setLoggedIn(true);
        setAccessRegistration(true);
      })
       .catch((e) => {
        alert( 
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        })
    } else {
      
    }
   }, [])

    return (
        <div>
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
          <div className="enter">
            <h1 className="section-title enter__title">Регистрация</h1>
            <p className={`${accessRegistration ? "enter__text_hidden" : "enter__text"}`}>Регистрация новых пользователей доступна только для администратора</p>
            <form className={`${accessRegistration ? "enter__form" : "enter__form_hidden"}`}>
            <input
                className="popup__input enter__input"
                placeholder="Имя"
                name="name"
                type="name"
              />
              <input
                className="popup__input enter__input"
                placeholder="Email"
                name="email"
                type="email"
              />
              <input
                className="popup__input enter__input"
                placeholder="Пароль"
                name="password"
                type="password"
              />
              <button type="submit" className="button">
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      );
}
 

export default Register;
