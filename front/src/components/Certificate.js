import React from "react";
import { api } from "../utils/Api.js";

function Certificate(props) {
  const [status, setStatus] = React.useState('');
  const isNewLid = props.status === 'Новый';
  function handleChange(e) {
    api.editStatusCertificate(props.id, e.target.value)
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
            <td className="request__cell">{props.email}</td>
            <td className="request__cell">{props.owner}</td>
            <td className="request__cell">{props.price}</td>
            <td className="request__cell">{props.date}</td>
            <td className="request__cell">{props.type}</td>
            <td className="request__cell">
            <select
              name="request__select-status"
              className={`request__select-status ${ isNewLid? 'request__select-status_new' : ' '}`}
              onChange={handleChange} 
              value={status}
            >
              <option>{props.status}</option>
              <option>Недозвон</option>
              <option>В работе</option>
              <option>Продан сертификат</option>
              <option>Отказ</option>
              <option>Архив</option>
            </select>
            </td>
        </tr>
     )
}

export default Certificate;