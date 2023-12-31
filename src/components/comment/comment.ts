import { IElements, getElements, _ } from '../utils/utils';
import style from './comment.module.scss';
import { IUser } from '../../request';
import { CommentForm } from '../commentForm/commentForm';

enum Elements {
  avatar = 'avatar',
  name = 'name',
  parent = 'parent',
  parentName = 'parentName',
  date = 'date',
  comment = 'comment',
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
  increment: boolean;
  decrement: boolean;
  replies?: ChildComment[];
  parent?: never;
} & IUser;

export type ChildComment = {
  comment: string;
  date: Date;
  favorite: boolean;
  rating: number;
  increment: boolean;
  decrement: boolean;
  parent: string;
  replies?: never;
} & IUser;

export type CommentType = ParentComment | ChildComment;

export class Comment {
  private _comment: HTMLElement;
  private readonly _elements: IElements = {};
  private readonly _newComment: CommentType;
  private _repliesData: ChildComment[];

  private readonly _updateComments: () => void;
  private readonly _patchCommentData: (data: CommentType) => void;
  private readonly _showFavoriteComments: () => void;

  private _templateComment = `
    <div class="${style.comment_container}">
      <img alt="commenter avatar" class="${style.avatar}" data-element="${Elements.avatar}"/>
      <div class="${style.comment_inner}">
        <div class="${style.comment_info}">
          <p data-element="${Elements.name}"></p>
          <div class="${style.parent}" data-element="${Elements.parent}">
            <img class="${style.parent_icon}" src="./arrow_reply.svg" alt="arrow answer"/>
            <p data-element="${Elements.parentName}"></p>
          </div>
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

  constructor(
    comment: HTMLElement,
    uuid: string,
    updateComments: () => void,
    patchCommentData: (data: CommentType) => void,
    showFavoriteComments: () => void
  ) {
    this._comment = comment;
    const storageComms = [...JSON.parse(localStorage.getItem('comments') as string)];
    this._newComment = storageComms.find((item: CommentType) => item.uuid === uuid);
    this._repliesData = storageComms.filter(
      (item: CommentType) => item.parent === this._newComment.uuid
    );

    this._updateComments = updateComments;
    this._showFavoriteComments = showFavoriteComments;
    this._patchCommentData = patchCommentData;
    this.render();
  }

  render() {
    this._comment.innerHTML = this._templateComment;
    getElements(this._comment, this._elements);
    this.configureComment();
    this.addListeners();
    if (this._repliesData.length) {
      this._comment.insertAdjacentHTML(
        'beforeend',
        `<div class="${style.replies}" data-element="${Elements.replies}"></div>`
      );
      this._elements[Elements.replies] = this._comment.querySelector(
        `[data-element=${Elements.replies}]`
      ) as HTMLElement;
      this.renderReplies();
    }
  }

  renderReplies = () => {
    const replies = this._elements[Elements.replies] as HTMLElement;
    this._repliesData.forEach((reply) => {
      const existingElement = replies.querySelector(`[data-uuid="${reply.uuid}"]`);

      if (!existingElement) {
        const element = document.createElement('div');
        element.dataset.uuid = reply.uuid;
        replies.appendChild(element);
        new Comment(
          element,
          reply.uuid,
          this._updateComments,
          this._patchCommentData,
          this._showFavoriteComments
        );
      }
    });
  };

  configureComment() {
    const avatar = this._elements[Elements.avatar] as HTMLImageElement;
    const name = this._elements[Elements.name] as HTMLParagraphElement;
    const comment = this._elements[Elements.comment] as HTMLParagraphElement;
    const date = this._elements[Elements.date] as HTMLDataElement;
    const rating = this._elements[Elements.rating] as HTMLDivElement;

    const parent = this._elements[Elements.parent] as HTMLDivElement;
    const parentName = this._elements[Elements.parentName] as HTMLParagraphElement;
    const reply = this._elements[Elements.reply] as HTMLButtonElement;
    const isParent = this._newComment.parent;

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

    this.updateFavoriteButton();

    rating.innerHTML = `${this._newComment.rating}`;
    if (this._newComment.rating < 0) {
      rating.classList.add(`${style.negative_rating}`);
    } else {
      rating.classList.add(`${style.positive_rating}`);
    }

    if (!isParent) {
      parent?.remove();
      delete this._elements[Elements.parent];
    } else {
      const parentData: CommentType | undefined = [
        ...JSON.parse(localStorage.getItem('comments') as string),
      ].find((item: CommentType) => item.uuid === this._newComment.parent);

      if (parentData) {
        parentName.innerHTML = parentData.name;
        reply?.remove();
      }
    }
  }

  addListeners() {
    const reply = this._elements[Elements.reply] as HTMLButtonElement;
    const decrement = this._elements[Elements.decrement] as HTMLDivElement;
    const increment = this._elements[Elements.increment] as HTMLDivElement;
    const favorite = this._elements[Elements.favorite] as HTMLButtonElement;

    reply.addEventListener('click', this.onReply);
    decrement.addEventListener('click', this.onDecrement);
    increment.addEventListener('click', this.onIncrement);
    favorite.addEventListener('click', this.onFavorite);
  }

  onReply = () => {
    if (!this._elements[Elements.replies]) {
      this._comment.insertAdjacentHTML(
        'beforeend',
        `<div class="${style.replies}" data-element="${Elements.replies}"></div>`
      );
      this._elements[Elements.replies] = this._comment.querySelector(
        `[data-element="${Elements.replies}"]`
      ) as HTMLElement;
    }

    const replies = this._elements[Elements.replies] as HTMLElement;
    const existingForm: CommentForm | null = null;

    if (!existingForm) {
      replies.insertAdjacentHTML(
        'afterbegin',
        `<div class="${style.comment_form}" data-element="${Elements.commentForm}"></div>`
      );
      getElements(this._comment, this._elements);

      const formReply = this._elements[Elements.commentForm] as HTMLFormElement;
      new CommentForm(formReply, this.updateReplies, _, this._newComment);
    }
  };

  onDecrement = () => {
    if (this._newComment.decrement && !this._newComment.increment) {
      this._newComment.rating--;
      this._newComment.increment = true;
    } else if (this._newComment.decrement) {
      this._newComment.rating--;
      this._newComment.decrement = false;
    }
    this._patchCommentData(this._newComment);
    this._updateComments();
  };

  onIncrement = () => {
    if (!this._newComment.decrement && this._newComment.increment) {
      this._newComment.rating++;
      this._newComment.decrement = true;
    } else if (this._newComment.increment) {
      this._newComment.rating++;
      this._newComment.increment = false;
    }
    this._patchCommentData(this._newComment);
    this._updateComments();
  };

  onFavorite = () => {
    this._newComment.favorite = !this._newComment.favorite;
    this.updateFavoriteButton();

    const favorites = JSON.parse(localStorage.getItem('favorite') as string).filter(
      (comment: CommentType) => comment.uuid !== this._newComment.uuid
    );

    if (this._newComment.favorite) {
      favorites.push(this._newComment);
    }

    localStorage.setItem('favorite', JSON.stringify(favorites));

    this._patchCommentData(this._newComment);
    this._showFavoriteComments();
  };

  updateFavoriteButton() {
    const favoriteButton = this._elements[Elements.favorite] as HTMLButtonElement;
    favoriteButton.innerHTML = this._newComment.favorite
      ? `<img src="./completed_heart.svg" alt="completed heart"/> В избранном`
      : `<img src="./empty_heart.svg" alt="empty heart"/> В избранное`;
  }

  updateReplies = () => {
    const storageComms = [...JSON.parse(localStorage.getItem('comments') as string)];
    this._repliesData = storageComms.filter(
      (item: CommentType) => item.parent === this._newComment.uuid
    );
    this._elements[Elements.commentForm].remove();
    this.renderReplies();
    this._updateComments();
  };
}
