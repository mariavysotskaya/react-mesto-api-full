import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isActionOK, setIsActionOK] = useState(false);
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api.getCards()
      .then((cardsData) => {
        cardsData = cardsData.reverse();
        setCards(cardsData);
      })
      .catch((err) => console.log('Не удалось получить данные'));
    }
  }, [currentUser]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function handleUpdateUser(user) {
    api.editUser(user)
    .then(data => {
      setCurrentUser(data.user);
      closeAllPopups();
    })
    .catch(err => console.log('Не удалось сохранить изменения'))
  };

  function handleUpdateAvatar(link) {
    api.editUserAvatar(link)
    .then(data => {
      setCurrentUser(data.user);
      closeAllPopups();
    })
    .catch(err => console.log('Не удалось сохранить изменения'))
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log('Не удалось выполнить действие'));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(states => states.filter(c => c._id !== card._id))
    })
    .catch(err => console.log('Удаление не удалось'));
  };

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
    .then((data => {
      setCards([data.card, ...cards]);
      closeAllPopups();
    }))
    .catch(err => console.log('Не удалось сохранить изменения'))
  };

  function handleRegister(password, email) {
    auth.register(password, email)
    .then(res => {
      if (res._id) {
        setIsActionOK(true);
        setIsInfoTooltipOpen(true);
        history.push('/signin');
      } else {
        setIsActionOK(false);
        setIsInfoTooltipOpen(true);
      }
    })
    .catch((err) => {
      setIsActionOK(false);
      setIsInfoTooltipOpen(true);
    })
  }

  function handleLogin(password, email) {
    auth.login(password, email)
    .then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        checkToken();
        api.setHeaders(res.token);
        setUserEmail(currentUser.email);
      } else {
        setIsActionOK(false);
        setIsInfoTooltipOpen(true);
      };
    })
    .catch((err) => {
      setIsActionOK(false);
      setIsInfoTooltipOpen(true);
    })
  };

  function handleSignOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    history.push('/');
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
      .then(res => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        history.push('/');
      })
      .catch(err => {
        return false;
      })
    };
    return false;
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header email={userEmail} loggedIn={isLoggedIn} onSignOut={handleSignOut}/>
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route exact path="/signup">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Redirect to="/signin" />
        </Switch>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
        <InfoTooltip isOpen={isInfoTooltipOpen} isActionOK={isActionOK} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};