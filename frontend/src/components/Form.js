export default function Form(props) {
  return (
    <form className="form" name="form" onSubmit={props.onSubmit}>
      <h2 className="form__name">{props.title}</h2>
      {props.children}
      <button type="submit" className={`form__save-btn button ${props.saveBtnStyle}`}>{props.buttonText}</button>
    </form>
  )
}