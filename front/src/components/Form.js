import React, { useEffect } from "react";
function Form(props) {
  const [name, setName] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [owner, setOwner] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [typeCertificate, setTypeCertificate] = React.useState('Бумажный');
  const [isCheckedPapper, setIsCheckedPapper] =React.useState(false);
  const [isCheckedEl, setIsCheckedEl] =React.useState(false);
  const [nameDirty, setNameDirty] = React.useState(false);
  const [telDirty, setTelDirty] = React.useState(false);
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [ownerDirty, setOwnerDirty] = React.useState(false);
  const [priceDirty, setPriceDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('Имя не может быть пустым');
  const [emailError, setEmailError] = React.useState('Почта не может быть пустой');
  const [telError, setTelError] = React.useState('Телефон не может быть пустым');
  const [ownerError, setOwnerError] = React.useState('Имя для сертификата не может быть пустым');
  const [priceError, setPriceError] = React.useState('Номинал сертификата не может быть пустым');
  const [formValid, setFormValid] = React.useState(false);

  React.useEffect( () => {
    if (nameError || emailError || telError || ownerError || priceError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
   }, [nameError , emailError , telError , ownerError , priceError]);

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
  };
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
  };
  function handleOwner(e) {
    setOwner(e.target.value);
    if (e.target.value.length <3 || e.target.value.length > 30) {
      setOwnerError('Имя должно быть от 2 до 30 символов');
      if (!e.target.value) {
        setOwnerError('Имя не может быть пустым')
      }
    } else {
      setOwnerError('')
    }

  };
  function handlePrice(e) {
    setPrice(e.target.value);
    const num = Number(e.target.value);
    if (!Number.isInteger(num)) {
      setPriceError('Номинал должен быть числом');
    
    } else {
      if (!e.target.value) {
        setPriceError('Номинал не может быть пустым');
      } else {
        setPriceError('');
      }
    }
  };
  function handleTypeCertificate(e) {
    setTypeCertificate(e.target.value);
    setIsCheckedEl(!isCheckedEl);
    setIsCheckedPapper(!isCheckedPapper);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCertificate({
        name: name,
        tel: tel,
        email: email,
        price: price,
        owner: owner,
        type: typeCertificate
    })
    /*setTypeCertificate('Бумажный');*/
    setName('');
    setTel('');
    setEmail('');
    setOwner('');
    setPrice('');
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true)
        break
      case 'phone':
        setTelDirty(true)
        break
      case 'email':
        setEmailDirty(true)
        break
      case 'price': 
        setPriceDirty(true)
        break
        case 'nameForCertificate':
          setOwnerDirty(true)
          break
    }
  }
 React.useEffect(() => {
    setIsCheckedPapper(true);
 }, [])
    return (
     <form className="certificate" onSubmit={handleSubmit}>
      <div className="certificate__inputs">
      <div className="certificate__input-block">
      {(nameDirty && nameError) && <span className="error">{nameError}</span>}
        <input 
        onBlur={e => blurHandler(e)}
        className="certificate__input" 
        name="name" 
        placeholder="Ваше имя" 
        type="text"
        value={name}
        onChange={handleName}
        />
      </div>
        <div className="certificate__input-block">
        {(telDirty && telError) &&  <span className="error">{telError}</span> }
        <input 
        onBlur={e => blurHandler(e)}
        className="certificate__input" 
        name="phone" 
        placeholder="Ваш телефон" 
        type="text"
        value={tel}
        onChange={handleTel}
        />
        </div>
        <div className="certificate__input-block">
        {(emailDirty && emailError) &&  <span className="error">{emailError}</span> }
        <input 
        onBlur={e => blurHandler(e)}
        className="certificate__input" 
        name="email" 
        placeholder="Ваш email" 
        type="text"
        value={email}
        onChange={handleEmail}
        />
        </div>
        <div className="certificate__input-block">
        {(priceError && priceDirty) &&  <span className="error">{priceError}</span> }
        <input 
        onBlur={e => blurHandler(e)}
        className="certificate__input" 
        name="price" 
        placeholder="Сумма" 
        type="text"
        value={price}
        onChange={handlePrice}
        />
        </div>
        <div className="certificate__input-block">
        {(ownerError && ownerDirty) &&  <span className="error">{ownerError}</span> }
        <input 
        onBlur={e => blurHandler(e)}
        className="certificate__input" 
        name="nameForCertificate" 
        placeholder="Имя в сертификате" 
        type="text"
        value={owner}
        onChange={handleOwner}
        />
        </div>
      </div>
        <div className="certificate__block">
            <div className="certificate__block-radio">
            <label className="service__el-title certificate__radio-label">Способ получения:</label>
        <div className="form_radio">
            
            <input 
            className="input-radio" 
            id="radio-1" 
            type="radio" 
            name="radio" 
            value="Бумажный"
            onChange={handleTypeCertificate}
            checked={isCheckedPapper}
            />

            <label className="about-studio__advantage-text certificate__label" htmlFor="radio-1">Из мастерской в бумажном виде</label>
        </div>
        <div className="form_radio">
            
            <input 
            className="input-radio" 
            id="radio-2" 
            type="radio" 
            name="radio" 
            value="Электронный"
            onChange={handleTypeCertificate}
            checked={isCheckedEl}
            />

            <label className="about-studio__advantage-text certificate__label" htmlFor="radio-2">На почту в электронном виде</label>
        </div>
            </div>
            <p className="about-studio__advantage-text form-text">Сертификат можно оформить на точную дату или оставить выбор даты и формата за получателем</p>
            <button className="button form-button" type="submit" disabled={!formValid}>Заказать сертификат</button>

        </div>
        
    </form>
      )
}

export default Form;