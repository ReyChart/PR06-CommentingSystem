import { IElements, getElements } from '../utils/utils';
import style from './comment.module.scss';
import { User } from '../../request';

enum Elements {
  avatar = 'avatar',
  name = 'name',
  comment = 'comment',
  date = 'date',
  favorite = 'favorite',
  rating = 'rating',
  decrement = 'decrement',
  increment = 'increment',
}

export type ParentComment = {
  comment: string;
  date: Date;
  favorite: boolean;
  rating: number;
  replies?: ChildComment[];
} & User;

export type ChildComment = {
  comment: string;
  date: Date;
  favorite: boolean;
  rating: number;
  parent: ParentComment;
} & User;

export type CommentType = ParentComment | ChildComment;

export class Comment {
  private readonly _comment: HTMLElement;
  private readonly _elements: IElements = {};
  private readonly _newComment: CommentType;
  private readonly _updateComments: () => void;
  private _templateComment = `
      <img alt="commenter avatar" class="${style.comment_avatar}" data-element="${Elements.avatar}"/>
      <div class="comments_inner">
          <div class="${style.comment_info}">
              <p data-element="${Elements.name}"></p>
              <p data-element="${Elements.date}"></p>
          </div>
          <p data-element="${Elements.comment}"></p>
          <div class="${style.comment_panel}">
              <button class="${style.comment_btn_answer}">
                <img src="./arrow_answer.svg" alt="arrow answer"/> Ответить
              </button>
              <button class="${style.comment_btn_favorite}" data-element="${Elements.favorite}">
                  <img src="./completed_heart.svg" alt="completed heart"/> В избранном
              </button>
              <div class="${style.comment_vote_system}">
                  <div class="${style.comment_vote_btn}" data-element="${Elements.decrement}">
                      <img src="./minus.svg" alt="icon minus" class="${style.btn_minus}"/>
                  </div>
                  <p class="${style.comment_rating} ${style.comment_positive} data-element="${Elements.rating}""></p>
                  <div class="${style.comment_vote_btn}" data-element="${Elements.increment}">
                      <img src="./plus.svg" alt="icon plus" class="${style.btn_plus}"/>
                  </div>
              </div>
          </div>
      </div>
    `;

  constructor(comment: HTMLElement, uuid: string, updateComments: () => void) {
    this._comment = comment;
    const storageComms = [...JSON.parse(localStorage.getItem('comments')!)];
    this._newComment = storageComms.find(
      (item: CommentType) => item.uuid === uuid
    );

    this._updateComments = updateComments;
    this.render();
  }

  render() {
    this._comment.innerHTML = this._templateComment;
    getElements(this._comment, this._elements);
    this.configureComment();
  }

  configureComment() {
    const avatar = this._elements[Elements.avatar];
    const comment = this._elements[Elements.comment];
    const name = this._elements[Elements.name];
    const timestamp = this._elements[Elements.date];
    const favorite = this._elements[Elements.favorite];
    const rating = this._elements[Elements.rating];

    avatar.setAttribute('src', this._newComment.avatar);
    comment.innerHTML = this._newComment.comment;
    name.innerHTML = this._newComment.name;
    timestamp.innerHTML = new Date(this._newComment.date).toLocaleString(
      'ru-RU',
      { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }
    );

    favorite.innerHTML = this._newComment.favorite
      ? `В избранном`
      : `Не в избранном`;
    rating.innerHTML = this._newComment.rating + '';
  }
}
