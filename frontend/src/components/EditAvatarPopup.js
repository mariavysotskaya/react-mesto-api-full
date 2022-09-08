import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const avatarLinkRef = useRef({});

  if (props.isOpen) {
    avatarLinkRef.current.value = '';
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
  });
}
  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <input
        required
        type="url"
        className="popup__input-fld"
        id="avatar-link"
        name="avatar"
        placeholder="Ссылка на картинку"
        ref={avatarLinkRef} />
      <span id="avatar-link-error" className="popup__error" />
    </PopupWithForm>
  )
}