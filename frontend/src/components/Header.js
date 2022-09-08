import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logo from '../images/header/logo.svg';

export default function Header(props) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="header">
      <a className="link" href="#"><img className="header__logo" src={logo} alt="Логотип" /></a>
      <div className="header__auth">
        {!props.loggedIn && location.pathname === '/signup' && <Link className="header__link" to="/signin">Войти</Link>}
        {!props.loggedIn && location.pathname === '/signin' && <Link className="header__link" to="/signup">Регистрация</Link>}
        <p className="header__email">{props.loggedIn && currentUser.email}</p>
        {props.loggedIn && <button className="header__signout-btn button" onClick={props.onSignOut}>Выйти</button>}
      </div>
    </div>
  )
}