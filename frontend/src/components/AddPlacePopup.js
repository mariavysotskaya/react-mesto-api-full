import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handlePlaceName(e) {
    setName(e.target.value);
  };

  function handlePlaceLink(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  };

  return (
    <PopupWithForm name="card-adding" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Создать">
      <input
        required
        type="text"
        minLength="2"
        maxLength="30"
        className="popup__input-fld"
        id="image-name"
        name="image-name"
        placeholder="Название"
        value={name || ''}
        onChange={handlePlaceName} />
      <span id="image-name-error" className="popup__error" />
      <input
        required
        type="url"
        className="popup__input-fld"
        id="image-link"
        name="image-link"
        placeholder="Ссылка на картинку"
        value={link || ''}
        onChange={handlePlaceLink} />
      <span id="image-link-error" className="popup__error" />
    </PopupWithForm>
  )
}