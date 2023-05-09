
function Service(props) {
    return (
     <div className="service__el">
        <div className="service__el-image-block">
            <img src={props.bigImage} alt={props.title} className="service__el-big-image"/>
            <div className="service__el-small-images">
              <img src={props.smallImage1} alt={props.title} className="service__el-small-image"/>
              <img src={props.smallImage2} alt={props.title} className="service__el-small-image"/>
            </div>
            
        </div>
        <div className="service__el-description">
              <h4 className="service__el-title">{props.title}</h4>  
            <p className="about-studio__advantage-text service__el-desc">
              {props.description}
            </p>
            <p className="about-studio__advantage-text service__el-desc">{props.description1}</p>
            <div className="service__el-conditions schedule__el-conditions">
                <p className="service__el-condition">Группа: {props.amount}</p>
                <p className="service__el-condition">Цена: от {props.price}р.</p>
                {props.children}
            </div>
          </div>
     </div>
      )
}

export default Service;