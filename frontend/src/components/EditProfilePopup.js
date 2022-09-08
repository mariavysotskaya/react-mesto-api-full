import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleProfileName(e) {
    setName(e.target.value);
  };

  function handleProfileDescription(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <input
        required
        type="text"
        minLength="2"
        maxLength="40"
        className="popup__input-fld popup__input-fld_type_name"
        id="name"
        name="name"
        placeholder="Введите имя"
        value={name || ''}
        onChange={handleProfileName} />
      <span id="name-error" className="popup__error" />
      <input
        required
        type="text"
        minLength="2"
        maxLength="200"
        className="popup__input-fld popup__input-fld_type_job"
        id="job"
        name="about"
        placeholder="Введите род занятий"
        value={description || ''}
        onChange={handleProfileDescription} />
      <span id="job-error" className="popup__error" />
    </PopupWithForm>
  )
}