import buttonClose from "../images/button-close3.svg";
import { api } from "../utils/Api.js";
import React, { useEffect } from "react";

function Popup(props) {
  const visibleSelectService = `popup__mk__select ${props.visibleSelectServive ? " " : "popup__mk__select_hidden"}`
  const visibleDate = `popup__input ${props.visibleSelectServive ? " " : "popup__input_hidden"}`
  const popupClassName = `popup ${props.isPopupOpen ? " " : "popup_opened" }`;
  const [name, setName] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [date, setDate] = React.useState('');
  const [nameDirty, setNameDirty] = React.useState(false);
  const [telDirty, setTelDirty] = React.useState(false);
  const [amountDirty, setAmountDirty] = React.useState(false);
  const [commentDirty, setCommentDirty] = React.useState(false);
  const [dateDirty, setDateDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('Имя не может быть пустым');
  const [telError, setTelError] = React.useState('Телефон не может быть пустым');
  const [amountError, setAmountError] = React.useState('Количество не может быть пустым');
  const [dateError, setDateError] = React.useState('Дата не может быть пустой');
  const [formValid, setFormValid] = React.useState(false);

 const isService = `popup__title-mk ${props.isService ? "popup__title-mk_hidden":""}`;

 React.useEffect(() => {
  console.log(1);
  console.log(props.currentService);
  if (props.currentService === 'Расписание') {
    setDateError('');
    setDate(props.currentDate);
  }
 }, [props.isPopupOpen]);

 React.useEffect( () => {
  console.log(nameError);
  console.log(dateError);
  console.log(amountError);
  console.log(telError);
  if (nameError || dateError || amountError || telError) {
    setFormValid(false)
  } else {
    setFormValid(true)
  }
 }, [nameError, dateError, amountError, telError]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddLid({
      name: name,
      tel: tel,
      service: props.currentService,
      MK: props.currentMK,
      amount: amount,
      comment: comment + ".",
      dateFromCustomer: date
    });
    setName('');
    setAmount('');
    setComment('');
    setTel('');
    setDate('');
    props.OnClosePopup();
    setFormValid(false);
    setNameError('Имя не может быть пустым');
    setTelError('Телефон не может быть пустым');
    setAmountError('Количество не может быть пустым');
    setDateError('Дата не может быть пустой');
  };

  function handleComment(e) {
      setComment(e.target.value);
  };

  function handleDate(e) {
    setDate(e.target.value);
    if (e.target.value.length <4 || e.target.value.length > 30) {
      setDateError('Дата должна быть от 4 до 30 символов');
      if (!e.target.value) {
        setDateError('Дата не может быть пустой')
      }
    } else {
      setDateError('')
    }
  };


  function handleAmount(e) {
    setAmount(e.target.value);
    const num = Number(e.target.value);
    if (!Number.isInteger(num)) {
      setAmountError('Количество должно быть числом');
    } else {
      if (!e.target.value) {
        setAmountError('Количество не может быть пустым');
      } else {
        setAmountError('');
      }
    }
  };

  function handleName(e) {
    setName(e.target.value);
    if (e.target.value.length <3 || e.target.value.length > 30) {
      setNameError('Имя должно быть от 2 до 30 символов');
      if (!e.target.value) {
        setNameError('Имя не может быть пустым')
      }
    } else {
      setNameError('')
    }
  };

  function handleTel(e) {
    setTel(e.target.value);
    const regexTel = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/i;
    if (!e.target.value.match(regexTel)) {
      setTelError('Некорректный телефон');
      if (!e.target.value) {
        setTelError('Телефон не может быть пустым')
      }
    } else {
      setTelError('');
    }
  }

  function handleClosePopup() {
    props.OnClosePopup();
    setNameDirty(false);
    setAmountDirty(false);
    setDateDirty(false);
    setTelDirty(false);
    setName('');
    setAmount('');
    setComment('');
    setTel('');
    setDate('');
    setFormValid(false);
    setNameError('Имя не может быть пустым');
    setTelError('Телефон не может быть пустым');
    setAmountError('Количество не может быть пустым');
    setDateError('Дата не может быть пустой');
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'nameConsumer':
        setNameDirty(true)
        break
      case 'tel':
        setTelDirty(true)
        break
      case 'amount':
        setAmountDirty(true)
        break
      case 'date': 
        setDateDirty(true)
        break
    }
  }

  return (
    <div className={popupClassName}>
      <div className="popup__title-block">
        <h2 className="popup__title">запись</h2>
        <p className="popup__title-italick">на мастер-класc</p>
      </div>
      <p className='popup__title-mk'><span className="popup__title-mk-span">Выбрано:</span> {props.currentMK}</p>
      <p className={isService}><span className="popup__title-mk-span">Дата:</span> {props.currentDate}</p>
      <form id="form" className="popup__form" onSubmit={handleSubmit}>
        <div className="popup__row">
          <div className="popup__input-block">
          {(nameDirty && nameError) && <span className="error">{nameError}</span>}
          <input
          onBlur={e => blurHandler(e)} 
          type="text"
          name='nameConsumer'
          value={name}
          placeholder="Ваше имя" 
          className="popup__input"
          onChange={handleName}
          required
          />
          </div>
       <div className="popup__input-block">
       {(telDirty && telError) &&  <span className="error">{telError}</span> }
          <input
           onBlur={e => blurHandler(e)}
            type="text"
            name='tel'
            value={tel}
            placeholder="Ваш телефон"
            className="popup__input"
            onChange={handleTel}
          />
       </div>
        
          {/*<div className={visibleSelectService}>
            <label className="popup__select-title">Выберите услугу:</label>
            <select
              name="select-services"
              className="popup__form-select-services"
              onChange={handle}
            >
              <option value="ИМК">
                Индивидуальный мастер-класс
              </option>
              <option value="Групповой">
                Групповой мастер-класс
              </option>
              <option value="Праздник">
                Праздник в мастерской
              </option>
  </select>
  </div>*/}

          <button className="popup__button" type="submit" disabled={!formValid}>Записаться</button>
        </div>
        <div className="popup__row popup__row-second">
          <div className="popup__input-block">
          {(amountDirty && amountError) &&  <span className="error">{amountError}</span> }
          <input
           onBlur={e => blurHandler(e)}
            type="text"
            name='amount'
            value={amount}
            placeholder="Кол-во участников"
            className="popup__input popup__input-amount"
            onChange={handleAmount}
          />
          </div>
        <div className="popup__input-block">
        {(dateDirty && dateError) &&  <span className="error">{dateError}</span> }
          <input
           onBlur={e => blurHandler(e)}
            type="text"
            name='date'
            value={date}
            placeholder="Желаемая дата"
            className={visibleDate}
            onChange={handleDate}
          />
        </div>
        <div className="popup__input-block">
        <input 
            type="text" 
            name='wishes'
            placeholder="Пожелания" 
            className="popup__input"
            value={comment} 
            onChange={handleComment}/>
        </div>
         
          {/*<div className="popup__mk__select">
            <label className="popup__select-title"> Выберите МК:</label>
            <select
              name="popup__form-select-mk"
              className="popup__form-select-services"
            >
              <option>12:00 04.03 Детский мастер-класс "Ежик"</option>
              <option>12:00 18.03 Мастер-класс "Свободная тема"</option>
              <option>12:00 04.03 Детский мастер-класс "Ежик"</option>
            </select>
  </div>*/}

          <p className="popup__text">
            После отправки формы мы свяжемся для подтверждения и обсуждения
            деталей.
          </p>
        </div>
        <button className="popup__button-close" onClick={handleClosePopup}>
          <img
            className="popup__button-close-image"
            alt="Кнопка закрытия попапа"
            src={buttonClose}
          />
        </button>
      </form>
    </div>
  );
}
export default Popup;
