import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Form from './Form';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  };

  function handleChangePassword(e) {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(password, email);
  };

  return (
    <div className="page__form-container">
      <Form title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleSubmit} saveBtnStyle={'form__save-btn_type_page'}>
        <input
          required
          pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z][a-zA-Z]+$"
          type="email"
          minLength="2"
          maxLength="40"
          className="popup__input-fld popup__input-fld_type_page popup__input-fld_type_email"
          id="email"
          name="email"
          placeholder="Email"
          value={email || ''}
          onChange={handleChangeEmail} />
        <span id="name-error" className="popup__error" />
        <input
          required
          type="password"
          minLength="2"
          maxLength="200"
          className="popup__input-fld popup__input-fld_type_page popup__input-fld_type_password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handleChangePassword} />
        <span id="job-error" className="popup__error" />
      </Form>
      <p className="page__text">Уже зарегистрированы? <Link to="/signin" className="header__link" style={{color: "#FFFFFF", textDecoration: "none", marginRight: 0}}>Войти</Link></p>
    </div>
  )
};

export default withRouter(Register);