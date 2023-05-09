import React from "react";
import { api } from "../utils/Api.js";

function Request(props) {
  const [status, setStatus] = React.useState('');
  const isNewLid = props.status === 'Новая';
  function handleChange(e) {
    api.editStatusLid(props.id, e.target.value)
    .then((res) => {
      setStatus(res.data.status);
    })
    .catch((e) => {
      alert("Не удалось обновить статус");
    })
  }

    return(
        <tr className={`admin__table-row ${ isNewLid? 'admin__table-row_new' : ' '}`}>
            <td className="request__cell">{props.name}</td>
            <td className="request__cell">{props.tel}</td>
            <td className="request__cell">{props.service}</td>
            <td className="request__cell">{props.mk}</td>
            <td className="request__cell">{props.amount}</td>
            <td className="request__cell">{props.date}</td>
            <td className="request__cell">{props.dateFromCustomer}</td>
            <td className="request__cell">{props.comment}</td>
            <td className="request__cell">
            <select
              name="request__select-status"
              className={`request__select-status ${ isNewLid? 'request__select-status_new' : ' '}`}
              onChange={handleChange} 
              value={status}
            >
              <option>{props.status}</option>
              <option> Недозвон</option>
              <option>В работе</option>
              <option>Запись</option>
              <option>Отказ</option>
              <option>Архив</option>
            </select>
            </td>
        </tr>
     )
}

export default Request;