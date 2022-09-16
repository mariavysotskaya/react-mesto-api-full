import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logo from '../images/header/logo.svg';

export default function Header(props) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const [isActiveBurger, setActiveBurger] = useState(false);
  const [isActiveAuth, setActiveAuth] = useState(false);
  const [isReversedHeaderBody, setReversedHeaderBody] = useState(false);

  const toggleClass = () => {
    setActiveBurger(!isActiveBurger);
    setActiveAuth(!isActiveAuth);
    setReversedHeaderBody(!isReversedHeaderBody);
  };

  return (
    <div className="header">
      <div className={`header__body ${(isReversedHeaderBody && props.loggedIn) ? "header__body_reverse" : null}`}>
        <a className="link" href="#"><img className="header__logo" src={logo} alt="Логотип" /></a>
        {props.loggedIn && 
          <div className={`header__auth ${isActiveAuth ? "header__auth_active" : null}`}>
            <p className="header__email">{currentUser.email}</p>
            <button className="header__signout-btn button" onClick={props.onSignOut}>Выйти</button>
          </div>
        }
        {!props.loggedIn && location.pathname === '/signup' && <Link className="header__link" to="/signin">Войти</Link>}
        {!props.loggedIn && location.pathname === '/signin' && <Link className="header__link" to="/signup">Регистрация</Link>}
        {props.loggedIn && 
          <div className={`header__burger ${isActiveBurger ? "header__burger_active" : null}`} onClick={toggleClass}>
            <span></span>
          </div>
        }
      </div>
    </div>
  )
}