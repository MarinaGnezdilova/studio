import imageBake from "../images/bake.png";
import imageBake1 from "../images/bake1.png";
import imageDone from "../images/done.png";
import imagMold from "../images/mold.png";
import imagePaint from "../images/paint.png";
import imageArrow from "../images/arrow.svg";
function Process() {
    return (
        <div className="process__block">
               <div className="process__row process__row-first">
          <div className="process__el process__el-indent1">
            <div className="process__title-block">
              <img src={imagMold} alt="Лепим" className="process__image" />
              <h3 className="process__el-title">1. Лепим</h3>
            </div>
            <p className="process__el-text">
              Лепим изделия и оставляем его сохнуть в мастерской на несколько
              дней.
            </p>
            <p className="process__el-text-bold">
              &bull; В зависимости от объема работы для сушки потребуется 3-5
              дней
            </p>
            <img
              src={imageArrow}
              alt="Стрелка"
              className="process__arrow process__arrow-1"
            />
          </div>
          <div className="process__el process__el-indent3">
            <div className="process__title-block">
              <img
                src={imagePaint}
                alt="Глазуровка"
                className="process__image"
              />
              <h3 className="process__el-title">3. Глазуровка</h3>
            </div>
            <p className="process__el-text">
              Через неделю после лепки встречаемся, чтобы покрыть обожженую
              работу глазурью.
            </p>
            <p className="process__el-text-bold">
              &bull; Если не получается прийти на глазуровку, пишите, мы
              предложим другое время
            </p>
            <img
              src={imageArrow}
              alt="Стрелка"
              className="process__arrow process__arrow-3"
            />
          </div>
          <div className="process__el">
            <div className="process__title-block">
              <img src={imageDone} alt="Итог" className="process__image" />
              <h3 className="process__el-title">5. Готовая работа</h3>
            </div>
            <p className="process__el-text">
              Через 3-5 дней после глазуровки вы можете забрать готовую работу.
            </p>
            <p className="process__el-text-bold">
              &bull; Обязательно напишите, чтобы узнать, когда вы можете
              приехать в студию
            </p>
          </div>
        </div>
        <div className="process__row process__row-second">
          <div className="process__el process__el-indent2">
            <img
              src={imageArrow}
              alt="Стрелка"
              className="process__arrow process__arrow-2"
            />
            <div className="process__title-block">
              <img
                src={imageBake1}
                alt="Первичный обжиг"
                className="process__image"
              />
              <h3 className="process__el-title">2. Бисквитный обжиг</h3>
            </div>

            <p className="process__el-text">
              Работа отправляется в обжиг. Max температура 990 градусов. В печи
              изделие проведет больше суток.
            </p>
          </div>
          <div className="process__el">
            <img
              src={imageArrow}
              alt="Стрелка"
              className="process__arrow process__arrow-4"
            />
            <div className="process__title-block">
              <img
                src={imageBake}
                alt="Вторичный Обжиг"
                className="process__image"
              />
              <h3 className="process__el-title">4. Глазурный обжиг</h3>
            </div>

            <p className="process__el-text">
              После глазуровки работа обжигается еще раз. Max температура 1050
              градусов.
            </p>
          </div>
        </div>
        </div>
    )
}

export default Process;