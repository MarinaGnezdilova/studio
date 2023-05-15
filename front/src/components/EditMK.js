import buttonClose from "../images/button-close3.svg";
import React, { useEffect } from "react";

function EditMK(props) {
  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
  if (props.nameError || props.dateError || props.descriptionError || props.durationError || props.priceError || props.ImageError || props.shortTopicError) {
    setFormValid(false);
  } else {
    setFormValid(true);
}
}, [props.nameError, props.dateError, props.descriptionError, 
  props.durationError, props.priceError, props.ImageError, props.shortTopicError]);

 const isPopupOpen = `editMK__form ${props.isPopupEditMKOpen ? "editMK__form_open": ""}`;
 function handleClosePopup (e) {
  e.preventDefault();
  props.onClosePopup();
 }

 function handleTopic(e) {
  props.onChangeTitle(e.target.value);
  if (e.target.value.length <3 || e.target.value.length > 50) {
    props.setNameError('Имя должно быть от 2 до 50 символов');
    if (!e.target.value) {
      props.setNameError('Имя не может быть пустым')
    }
  } else {
    props.setNameError('')
  }
 }

 function handleShortTitle(e) {
  props.onChangeShortTitle(e.target.value);
  if (e.target.value.length <3 || e.target.value.length > 30) {
    props.setShortTopicError('Имя должно быть от 3 до 30 символов');
    if (!e.target.value) {
      props.setShortTopicError('Имя не может быть пустым')
    }
  } else {
    props.setShortTopicError('')
  }
 }

 function handleImage(e) {
  props.onChangeImage(e.target.value);
  const regexImage = /^https?:\/\/[a-z0-9~_\-\.]+\.[a-z]{2,9}([a-z0-9\[\]\#\-\.\_\~\/\?\@\!\$\&\'\(\)\*\+\,\;\:\=]*)?$/i;
    if (!e.target.value.match(regexImage)) {
     props.setImageError('Некорректный адрес изображения');
      if (!e.target.value) {
        props.setImageError('Адрес изображения не может быть пустым')
      }
    } else {
      props.setImageError('');
    }
 }

 function handleDate(e) {
  props.onChangeDate(e.target.value);
  if (e.target.value.length < 5 || e.target.value.length > 20) {
    props.setDateError('Дата должна быть от 5 до 20 символов');
    if (!e.target.value) {
      props.setDateError('Дата не может быть пустой')
    }
  } else {
    props.setDateError('')
  }
 }

 function handleDescription(e) {
  props.onChangeDescription(e.target.value);
  if (e.target.value.length <100 || e.target.value.length > 300) {
    props.setDescriptionError('Описание должно быть от 100 до 300 символов');
    if (!e.target.value) {
      props.setDescriptionError('Описание не может быть пустым')
    }
  } else {
    props.setDescriptionError('')
  }
 }

function handlePrice(e) {
  props.onChangePrice(e.target.value);
  const num = Number(e.target.value);
    if (!Number.isInteger(num)) {
      props.setPriceError('Цена должна быть числом');
    
    } else {
      if (!e.target.value) {
        props.setPriceError('Цена не может быть пустой');
      } else {
        props.setPriceError('');
      }
    }
}

function handleDuration(e) {
  props.onChangeDuration(e.target.value);
  const num = Number(e.target.value);
    if (!Number.isInteger(num)) {
      props.setDurationError('Длительность должна быть числом');
    
    } else {
      if (!e.target.value) {
        props.setDurationError('Длительность не может быть пустой');
      } else {
        props.setDurationError('');
      }
    }
}

 function handleSumit(e) {
  e.preventDefault();
  props.onSubmit({
  title: props.name,
  shortTitle: props.shortTitle,
  description: props.description,
  price: props.price,
  duration: props.duration,
  date: props.date,
  image: props.url,
  id: props.id
  });
  props.onClosePopup();
 }

 const blurHandler = (e) => {
  switch (e.target.name) {
    case 'topic':
      props.setNameDirty(true)
      break
      case 'shortTopic':
      props.setShortTopicDirty(true)
      break
      case 'image':
        props.setImageDirty(true)
        break
        case 'date':
        props.setDateDirty(true)
        break
        case 'description':
        props.setDescriptionDirty(true)
        break
        case 'duration':
        props.setDurationDirty(true)
        break
        case 'price':
        props.setPriceDirty(true)
        break
     }
}


    return (
      <form 
        id="form"
        className={isPopupOpen}
        onSubmit={handleSumit}
        >
          <label className="editMK__label-inpup">Тема МК:</label>
          {(props.nameError && props.nameDirty) && <span className="error">{props.nameError}</span>}
          <input 
          onBlur={e => blurHandler(e)} 
            type="text" 
            name="topic"
            className="editMK__input" 
            value={props.name}
            onChange={handleTopic}
            />
          <label className="editMK__label-inpup">Короткая тема МК:</label>
          {(props.shortTopicError && props.shortTopicDirty) && <span className="error">{props.shortTopicError}</span>}
          <input 
            onBlur={e => blurHandler(e)} 
            type="text" 
            name="shortTopic"
            className="editMK__input" 
            value={props.shortTitle}
            onChange={handleShortTitle}
            />
          <label className="editMK__label-inpup">Изображение:</label>
          {(props.ImageError && props.ImageDirty) && <span className="error">{props.ImageError}</span>}
          <input 
            onBlur={e => blurHandler(e)} 
            type="text"
            name="image"
            className="editMK__input"
            value={props.url}
            onChange={handleImage}
            />
          <label className="editMK__label-inpup">Дата:</label>
          {(props.dateError && props.dateDirty) && <span className="error">{props.dateError}</span>}
          <input 
            onBlur={e => blurHandler(e)} 
            type="text" 
            name="date"
            className="editMK__input" 
            value={props.date}
            onChange={handleDate}
            />
          <label className="editMK__label-inpup">Описание:</label>
          {(props.descriptionError && props.descriptionDirty) && <span className="error">{props.descriptionError}</span>}
          <textarea 
            onBlur={e => blurHandler(e)} 
            className="editMK__input editMK__input-description" 
            value={props.description} 
            name="description"
            onChange={handleDescription}
            >
            
            </textarea>
          <label className="editMK__label-inpup">Цена:</label>
          {(props.priceError && props.priceDirty) && <span className="error">{props.priceError}</span>}
          <input 
            onBlur={e => blurHandler(e)} 
            type="text"
            name="price"
            className="editMK__input"
            value={props.price}
            onChange={handlePrice}
          />
          <label className="editMK__label-inpup">Длительность:</label>
          {(props.durationError && props.durationDirty) && <span className="error">{props.durationError}</span>}
          <input 
            onBlur={e => blurHandler(e)} 
            type="text" 
            name="duration"
            className="editMK__input" 
            value={props.duration}
            onChange={handleDuration}
            />
          <button type="submit" className="button editMK__button" disabled={!formValid}>Сохранить</button>
            <button className="popup__button-close editMK__button-close" onClick={handleClosePopup}>
          <img
            className="editMK__button-close-image"
            alt="Кнопка закрытия попапа"
            src={buttonClose}
          />
        </button>
      </form>
    )
};

export default EditMK;