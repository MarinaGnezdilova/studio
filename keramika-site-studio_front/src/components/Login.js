import Nav from "../components/Nav";
import React from "react";
import { api } from "../utils/Api.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState('');
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [emailError, setEmailError] = React.useState('Почта не может быть пустой');
  const [password, setPassword] = React.useState('');
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('Пароль не может быть пустым');
  const [formValid, setFormValid] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect( () => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
   }, [emailError, passwordError]);

  function handleEmail(e) {
    setEmail(e.target.value);
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (!e.target.value.match(regexEmail)) {
      setEmailError('Некорректный email');
      if (!e.target.value) {
        setEmailError('Почта не может быть пустой');
      }
    } else {
        setEmailError('');
    }
  }


  function handlePassword(e) {
    setPassword(e.target.value);
    if (e.target.value.length <3 || e.target.value.length > 30) {
      setPasswordError('Длина пароля должна быть от 5 до 30 символов');
      if (!e.target.value) {
        setPasswordError('Паоль не может быть пустым')
      }
    } else {
      setPasswordError('')
    }

  }

  function handleSubmit(e) {
    e.preventDefault();
    api.login(email, password)
    .then((res) => {
        const token = res.token;
        localStorage.setItem("jwt", token);
    })
    .then(() => {
      onLoginCompleted();
    })
    .catch((e) => {
      alert("Неверный логин или пароль");
    });

  }

  function onLoginCompleted() {
    navigate("/admin");
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password': 
        setPasswordDirty(true)
        break
    }
  }

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
            <h1 className="section-title enter__title">Вход</h1>
            <form className="enter__form" onSubmit={handleSubmit}>
            {(emailDirty && emailError) && <span className="error">{emailError}</span>}
              <input
              onBlur={e => blurHandler(e)}
                className="popup__input enter__input"
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmail}
              />
              {(passwordDirty && passwordError) && <span className="error">{passwordError}</span>}
              <input
              onBlur={e => blurHandler(e)}
                className="popup__input enter__input"
                placeholder="Пароль"
                name="password"
                type="password"
                value={password}
                onChange={handlePassword}
              />
              <button type="submit" className="button" disabled={!formValid}>
                Войти
              </button>
            </form>
          </div>
        </div>
      );
}
 

export default Login;
