export default function ImagePopup(props) {
  let openedPopupClass = props.isOpen && 'popup_open';
  return (
    <article className={`popup popup_type_fullview-image ${openedPopupClass}`}>
      <div className="popup__overlay">
        <img className="popup__image" alt={props.card.name} src={props.card.link}/>
        <h2 className="popup__image-name">{props.card.name}</h2>
        <button type="button" className="popup__close-btn button" onClick={props.onClose}/>
      </div>
    </article>
  )
}