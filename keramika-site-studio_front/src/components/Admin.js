import React from "react";
import Nav from "./Nav";
import ScheduleElement from "./ScheduleElement";
import Request from "./Request";
import EditMK from "./EditMK";
import Certificate from "./Certificate";
import { api } from "../utils/Api";
import { Link } from "react-router-dom";


function Admin() {
  const [lids, setLids] = React.useState([]);
  const [certificates, setCertificates] = React.useState([]);
  const [mks, setMks] = React.useState([]);
  const [isPopupEditMKOpen, setIsPopupEditMKOpen] = React.useState(false);
  const [topic, setTopic] = React.useState("");
  const [image, setImage] = React.useState("");
  const [date, setDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [shortTitle, setShortTitle] = React.useState("");
  const [id, setId] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [idMonth, setIdMonth] = React.useState("");
  const [topicDirty, setTopicDirty] = React.useState(false);
  const [imageDirty, setImageDirty] = React.useState(false);
  const [dateDirty, setDateDirty] = React.useState(false);
  const [descriptionDirty, setDescriptionDirty] = React.useState(false);
  const [priceDirty, setPriceDirty] = React.useState(false);
  const [durationDirty, setDurationDirty] = React.useState(false);
  const [shortTitleDirty, setShortTitleDirty] = React.useState(false);
  const [topicError, setTopicError] = React.useState(
    "Тема не может быть пустой"
  );
  const [imageError, setImageError] = React.useState(
    "Изображение не может быть пустым"
  );
  const [dateError, setDateError] = React.useState("Дата не может быть пустой");
  const [descriptionError, setDescriptionError] = React.useState(
    "Описание не может быть пустым"
  );
  const [priceError, setPriceError] = React.useState(
    "Цена не может быть пустой"
  );
  const [durationError, setDurationError] = React.useState(
    "Длительность не может быть пустой"
  );
  const [shortTitleError, setShortTitleError] = React.useState(
    "Короткая тема не может быть пустой"
  );
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  
 React.useEffect(() => {
  const jwt = localStorage.getItem("jwt");
  console.log(jwt);
  if (jwt) {
    api.getUserInfo()
    .then((res) => {
      console.log(res.data);
      setCurrentUser(res.data)
     })
     .then(() => {
      setLoggedIn(true);
    })
     .catch((e) => {
      alert( 
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
      })
  }
 }, [])

  React.useEffect(() => {
    if (loggedIn) {
      api
      .getLid()
      .then((res) => {
        setLids(res.lids);
      })
      .catch((e) => {
        alert("Невозможно получить список заявок");
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
      .getCertificate()
      .then((res) => {
        setCertificates(res.certificates);
      })
      .catch((e) => {
        alert("Невозможно получить список сертификатов");
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
      .getMK()
      .then((res) => {
        setMks(res.mks);
      })
      .catch((e) => {
        alert("Невозможно получить список мастер-классов");
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
      .getMonth()
      .then((res) => {
        setMonth(res.month[0].name);
        setIdMonth(res.month[0]._id);
      })
      .catch((e) => {
        alert("Невозможно получить месяц");
      });
    }
  }, [loggedIn]);

  /*React.useEffect(() => {
  api.getMK()
  .then((res) => {
    setMks(res.mks);
  })
  .catch((e) => {
    alert("Невозможно обновить мастер-классы");
  })
}, [mks])*/

  function OpenMKPopup(mk) {
    setIsPopupEditMKOpen(true);
    setTopic(mk.title);
    setImage(mk.image);
    setDate(mk.date);
    setDescription(mk.description);
    setPrice(mk.price);
    setDuration(mk.duration);
    setShortTitle(mk.shortTitle);
    setId(mk._id);
  }

  function handleClosePopup() {
    setIsPopupEditMKOpen(false);
    setTopic("");
    setImage("");
    setDate("");
    setDescription("");
    setPrice("");
    setDuration("");
    setShortTitle("");
  }

  function handleSubmitEditMK(form) {
    if (form.id === undefined) {
      api
        .saveMK(form)
        .then((res) => {
          setMks([res.data, ...mks]);
        })
        .catch((e) => {
          alert("Не удалось добавить мастер-класс");
        });
    } else {
      api
        .editMK(id, form)
        .then((newMK) => {
          setMks((state) =>
            state.map((c) => (c._id === form.id ? newMK.mk : c))
          );
        })
        .catch((e) => {
          alert("Не удалось изменить мастер-класс");
        });
    }
  }

  function deleteMK(mk) {
    api
      .deleteMK(mk._id)
      .then(() => {
        setMks((state) => state.filter((c) => c._id !== mk._id));
      })
      .catch((e) => {
        alert("Не удалось удалить мастер-класс");
      });
  }

  function handleMonth(e) {
    setMonth(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    api
      .editMonth(idMonth, month)
      .then(() => {
        setMonth(month);
      })
      .catch((e) => {
        alert("Не удалось обновить месяц");
      });
  }

  function onClickExit() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <div className="admin">
      <Nav
        children={
          <>
            <a className="nav__el" href="#orders">
              Заявки
            </a>
            <a className="nav__el" href="#certificate">
              Сертификаты
            </a>
            <a className="nav__el" href="#schedule">
              Расписание
            </a>
            <p className="nav__el">{currentUser.email}</p>
            <Link className = {`${loggedIn ? "nav__el_hidden" : "nav__el nav__button"} `} to="/signin">Войти</Link>
            <Link className={`${loggedIn ? "nav__el nav__button" : "nav__el_hidden"} `} to="/" onClick={onClickExit}>Выход</Link>
          </>
        }
      />
      <main>
        <div className="admin__lid" id="orders">
          <h2 className="section-title admin__title">ЗАЯВКИ</h2>
          <div className="admin__table">
            <tr className="admin__table-header">
              <th>Имя</th>
              <th>Тел.</th>
              <th>Услуга</th>
              <th>МК</th>
              <th>Места</th>
              <th>Дата заявки</th>
              <th>Желаемая дата</th>
              <th>Коммент</th>
              <th>Статус</th>
            </tr>
            {lids.map((lid) => (
              <Request
                key={lid._id}
                id={lid._id}
                name={lid.name}
                mk={lid.MK}
                tel={lid.tel}
                service={lid.service}
                amount={lid.amount}
                date={lid.date.split(".")[0].replace(/T/g, " ")}
                comment={lid.comment}
                status={lid.status}
                dateFromCustomer={lid.dateFromCustomer}
              />
            ))}
          </div>
        </div>
        <div className="admin__certificate" id="certificate">
          <h2 className="section-title admin__title">СЕРТИФИКАТЫ</h2>
          <div className="admin__table">
            <tr className="admin__table-header">
              <th>Имя</th>
              <th>Тел.</th>
              <th>Email</th>
              <th>На кого</th>
              <th>Номинал</th>
              <th>Дата заказа</th>
              <th>Тип</th>
              <th>Статус</th>
            </tr>
            {certificates.map((certificate) => (
              <Certificate
                key={certificate._id}
                name={certificate.name}
                tel={certificate.tel}
                email={certificate.email}
                owner={certificate.owner}
                date={certificate.date.split(".")[0].replace(/T/g, " ")}
                type={certificate.type}
                status={certificate.status}
                price={certificate.price}
                id={certificate._id}
              />
            ))}
          </div>
        </div>
        <section className="admin__schedle-block" id="schedule">
          <h2 className="section-title admin__title">РАСПИСАНИЕ</h2>
          <form onSubmit={handleSubmit} id="formMontn">
            <input
              className="admin__input-month"
              type="text"
              value={month}
              onChange={handleMonth}
            />
            <button className="button admin__button-month" type="submit">
              Изменить месяц
            </button>
          </form>
          <button className="button admin__add-mk" onClick={OpenMKPopup}>
            Добавить мастер-класс
          </button>
          <div className="schedule-block admin__schedle">
            {mks.map((mk) => (
              <ScheduleElement
                key={mk._id}
                image={mk.image}
                mk={mk}
                title={mk.title}
                data={mk.date}
                description={mk.description}
                duration={mk.duration}
                price={mk.price}
                OpenMK={OpenMKPopup}
                onDeleteMK={deleteMK}
              />
            ))}
          </div>
        </section>
        <EditMK
          name={topic}
          nameError={topicError}
          nameDirty={topicDirty}
          setNameError={setTopicError}
          setNameDirty={setTopicDirty}
          date={date}
          dateError={dateError}
          dateDirty={dateDirty}
          setDateError={setDateError}
          setDateDirty={setDateDirty}
          description={description}
          descriptionError={descriptionError}
          descriptionDirty={descriptionDirty}
          setDescriptionError={setDescriptionError}
          setDescriptionDirty={setDescriptionDirty}
          duration={duration}
          durationError={durationError}
          durationDirty={durationDirty}
          setDurationError={setDurationError}
          setDurationDirty={setDurationDirty}
          price={price}
          priceError={priceError}
          priceDirty={priceDirty}
          setPriceError={setPriceError}
          setPriceDirty={setPriceDirty}
          url={image}
          ImageError={imageError}
          ImageDirty={imageDirty}
          setImageError={setImageError}
          setImageDirty={setImageDirty}
          shortTitle={shortTitle}
          shortTopicError={shortTitleError}
          shortTopicDirty={shortTitleDirty}
          setShortTopicError={setShortTitleError}
          setShortTopicDirty={setShortTitleDirty}
          id={id}
          isPopupEditMKOpen={isPopupEditMKOpen}
          onClosePopup={handleClosePopup}
          onChangeTitle={setTopic}
          onChangeShortTitle={setShortTitle}
          onChangeImage={setImage}
          onChangeDate={setDate}
          onChangeDescription={setDescription}
          onChangePrice={setPrice}
          onChangeDuration={setDuration}
          onSubmit={handleSubmitEditMK}
        />
      </main>
    </div>
  );
}

export default Admin;
