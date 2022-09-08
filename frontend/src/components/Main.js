import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="content">
      <section className="profile content__section content__section_mobile">
        <a className="profile__avatar-edit-btn" href="#" onClick={props.onEditAvatar}>
          <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
        </a>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-btn button" onClick={props.onEditProfile} />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-btn button" onClick={props.onAddPlace} />
      </section>
      <section className="cards content__section content__section_mobile">
        {props.cards.map(item => (
          <Card
            card={item}
            key={item._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}/>
          ))
        }
      </section>
    </div>
  )
}