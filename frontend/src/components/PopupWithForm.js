import Form from './Form';

export default function PopupWithForm(props) {
  let openedPopupClass = props.isOpen && 'popup_open';
  return (
    <article className={`popup popup_type_${props.name} ${openedPopupClass}`}>
      <div className="popup__container">
        <Form title={props.title} buttonText={props.buttonText} onSubmit={props.onSubmit}>
          {props.children}
        </Form>
        <button type="button" className="popup__close-btn button" onClick={props.onClose}/>
      </div>
    </article>
  )
}