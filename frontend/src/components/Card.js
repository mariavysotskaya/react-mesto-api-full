import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = isOwn && 'card__delete-btn';

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = isLiked && 'card__like-btn_active';

  const handleClick = () => {
    props.onCardClick(props.card);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };  
  
  return (
    <article className="card">
      <img className="card__image" alt={props.card.name} src={props.card.link} onClick={handleClick}/>
      {isOwn && <button type="button" className={`button ${cardDeleteButtonClassName}`} onClick={handleDeleteClick}/>}
      <div className="card__container">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={`card__like-btn button ${cardLikeButtonClassName}`} onClick={handleLikeClick}/>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}