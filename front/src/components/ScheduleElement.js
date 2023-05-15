
import buttonClose from "../images/button-close3.svg";
function ScheduleElement(props) {
  const vibleButtonDelete = `popup__button-close schedule__button-close ${props.onMain ? "schedule__button-close_hidden" : " " }`;
  const minutes = props.duration-Math.floor(props.duration/60)*60+'мин';
  const isMinuteNot= props.duration-Math.floor(props.duration/60)*60 != 0;
  function handleMKClick() {
    props.onMKClick(props.mk);
  }
  function handleOpenMK() {
    props.OpenMK(props.mk)
  }

  function handleDeleteClick() {
    props.onDeleteMK(props.mk)
  }
    return (
        <div className="schedule__el">
          <div className="schedule__el-top" onClick={handleOpenMK}>
          <img src={props.image} alt={props.title} className="schedule__el-image"/>
          <div className="schedule__el-description">
            
              <h4 className="schedule__el-date">{props.time} {props.data}</h4>
              <h4 className="schedule__el-title">
                {props.title}
              </h4>
        
            <p className="schedule__el-desc">
              {props.description}
            </p>
            <div className="schedule__el-conditions">
                <p className="schedule__el-condition">Длительность: {`${Math.floor(props.duration/60)}ч ${ isMinuteNot ? minutes : ''}`}</p>
                <p className="schedule__el-condition">Цена: {props.price}р.</p>
                </div>
                </div>

          </div>
          
                <button className="button" onClick={handleMKClick}>Записаться</button>
                
                <button className={vibleButtonDelete} onClick={handleDeleteClick}>
             <img className="popup__button-close-image schedule__button-close-image" alt="Кнопка закрытия попапа" src={buttonClose}/>
        </button>
        </div>
      )
}

export default ScheduleElement;