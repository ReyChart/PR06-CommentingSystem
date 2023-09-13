import { IElements, getElements, _ } from '../utils/utils';
import style from './comment.module.scss';
import { User } from '../../request';
import { CommentForm } from '../commentForm/commentForm';

enum Elements {
  avatar = 'avatar',
  name = 'name',
  comment = 'comment',
  date = 'date',
  favorite = 'favorite',
  rating = 'rating',
  reply = 'reply',
  replies = 'replies',
  decrement = 'decrement',
  increment = 'increment',
  commentForm = 'commentForm',
}

export type ParentComment = {
  comment: string;
  date: Date;
  favorite: boolean;
  rating: number;
  replies?: ChildComment[];
  parent?: never;
} & User;

export type ChildComment = {
  comment: string;
  date: Date;
  favorite: boolean;
  rating: number;
  parent: string;
  replies?: never;
} & User;

export type CommentType = ParentComment | ChildComment;

export class Comment {
  private _comment: HTMLElement;
  private readonly _elements: IElements = {};
  private readonly _newComment: CommentType;

  private _templateComment = `
    <div class="${style.comment_container}">
      <img alt="commenter avatar" class="${style.avatar}" data-element="${Elements.avatar}"/>
      <div class="comment_inner">
        <div class="${style.comment_info}">
          <p data-element="${Elements.name}"></p>
          <p data-element="${Elements.date}"></p>
        </div>
        <p data-element="${Elements.comment}"></p>
        <div class="${style.comment_panel}">
          <button class="${style.reply_btn}" data-element="${Elements.reply}">
            <img src="./arrow_reply.svg" alt="arrow reply"/> Ответить
          </button>
          <button class="${style.favorite_btn}" data-element="${Elements.favorite}"></button>
          <div class="${style.vote_system}">
            <div class="${style.vote_btn}" data-element="${Elements.decrement}">
              <img src="./minus.svg" alt="icon minus" class="${style.icon_minus}"/>
            </div>
            <p data-element="${Elements.rating}"></p>
            <div class="${style.vote_btn}" data-element="${Elements.increment}">
              <img src="./plus.svg" alt="icon plus" class="${style.icon_plus}"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  constructor(comment: HTMLElement, uuid: string) {
    this._comment = comment;
    const storageComms = [
      ...JSON.parse(localStorage.getItem('comments') as string),
    ];
    this._newComment = storageComms.find(
      (item: CommentType) => item.uuid === uuid
    );

    this.render();
  }

  render() {
    this._comment.innerHTML = this._templateComment;
    getElements(this._comment, this._elements);
    this.configureComment();
    this.addListeners();
  }

  configureComment() {
    const avatar = this._elements[Elements.avatar] as HTMLImageElement;
    const name = this._elements[Elements.name] as HTMLParagraphElement;
    const comment = this._elements[Elements.comment] as HTMLParagraphElement;
    const date = this._elements[Elements.date] as HTMLDataElement;
    const favorite = this._elements[Elements.favorite] as HTMLButtonElement;
    const rating = this._elements[Elements.rating] as HTMLDivElement;

    avatar.setAttribute('src', this._newComment.avatar);
    name.innerHTML = this._newComment.name;
    comment.innerHTML = this._newComment.comment;
    date.innerHTML = new Date(this._newComment.date)
      .toLocaleString('ru-Ru', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', ' ');

    favorite.innerHTML = this._newComment.favorite
      ? `<img src="./completed_heart.svg" alt="completed heart"/> В избранном`
      : `<img src="./empty_heart.svg" alt="empty heart"/> В избранное`;

    rating.innerHTML = `${this._newComment.rating}`;
    if (this._newComment.rating < 0) {
      rating.classList.add(`${style.negative_rating}`);
    } else {
      rating.classList.add(`${style.positive_rating}`);
    }
  }

  addListeners() {
    const reply = this._elements[Elements.reply] as HTMLButtonElement;

    reply.addEventListener('click', this.onReply);
  }

  onReply = () => {
    this._comment.insertAdjacentHTML(
      'beforeend',
      `<div data-element="${Elements.replies}"></div>`
    );
    this._elements[Elements.replies] = this._comment.querySelector(
      `[data-element="${Elements.replies}"]`
    ) as HTMLElement;

    const replies = this._elements[Elements.replies] as HTMLElement;
    replies.insertAdjacentHTML(
      'afterbegin',
      `<div data-element="${Elements.commentForm}"></div>`
    );
    getElements(this._comment, this._elements);

    const formReply = this._elements[Elements.commentForm] as HTMLFormElement;
    new CommentForm(formReply, this.updateReplies, _, this._newComment);
  };

  updateReplies = () => {};
}
