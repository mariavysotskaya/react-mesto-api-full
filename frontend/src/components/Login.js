import { useState } from 'react';
import Form from './Form';

export default function Login(props) {
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
    props.onLogin(password, email);
  };

  return (
    <div className="page__form-container">
      <Form title="Вход" buttonText="Войти" onSubmit={handleSubmit} saveBtnStyle={'form__save-btn_type_page'}>
        <input
          required
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
    </div>
  )
}