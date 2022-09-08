import successImage from '../images/infotooltip/success.svg';
import failImage from '../images/infotooltip/fail.svg';

export default function InfoTooltip(props) {
  const successText = 'Вы успешно зарегистрировались!';
  const failText = 'Что-то пошло не так! Попробуйте ещё раз.';
  let openedPopupClass = props.isOpen && 'popup_open';
  return (
    <article className={`popup ${openedPopupClass}`}>
      <div className="popup__container">
        <img
          alt="Изображение"
          src={ (props.isActionOK && successImage) || (!props.isActionOK && failImage) }
          style={{height: "120px", width: "120px", margin: "auto"}}
        />
        <h2 className="popup__name" style={{margin: "32px 0 0", color: "black", maxWidth: "358px"}}>{(props.isActionOK && successText) || failText}</h2>
        <button type="button" className="popup__close-btn button" onClick={props.onClose}/>
      </div>
    </article>
  )
}