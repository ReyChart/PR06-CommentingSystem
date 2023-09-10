import { IElements, getElements } from '../utils/utils';
import style from './commentForm.module.scss';
import { User, getUser } from '../../request';
import { CommentType } from '../comment/comment';

enum Elements {
  avatar = 'avatar',
  name = 'name',
  textArea = 'textArea',
  form = 'form',
}

export class CommentForm {
  private readonly _commentForm: HTMLElement;
  private readonly _elements: IElements = {};
  private _user!: User;

  private readonly _updateComments: () => void;
  private readonly _updateCounter: () => void;

  private _templateCommentForm = `
    <img alt="commenter avatar" class="${style.avatar}" data-element="${Elements.avatar}"/>
    <div class="comment_form_inner">
      <div class="${style.comment_wrapper}">
        <div class="${style.comment_info}">
          <p data-element="${Elements.name}"></p>
          <p>Макс. 1000 символов</p>
        </div>
        <div class="${style.comment_error}">
          <p>Слишком длинное сообщение</p>
        </div>
      </div>
      <form action="/" class="${style.form}" data-element="${Elements.form}">
        <textarea class="${style.form_input}" placeholder="Введите текст сообщения..." data-element="${Elements.textArea}"></textarea>
        <button class="${style.form_btn}" type="submit">Отправить</button>
      </form>
    </div>
  `;
  constructor(commentForm: HTMLElement, updateComments: () => void, updateCounter: () => void) {
    this._commentForm = commentForm;

    this._updateComments = updateComments;
    this._updateCounter = updateCounter;
    this.render();
  }

  render() {
    this._commentForm.innerHTML = this._templateCommentForm;
    getElements(this._commentForm, this._elements);

    getUser()
      .then((user) => (this._user = user))
      .then(() => this.updateUser());

    this.addListeners();
  }

  addListeners() {
    const form = this._elements[Elements.form] as HTMLFormElement;
    const textArea = this._elements[Elements.textArea] as HTMLTextAreaElement;

    form.addEventListener('submit', (event) => this.onSubmit(event, textArea));
    textArea.addEventListener('input', () => this.autoResizeTextArea(textArea));
  }

  onSubmit = (event: Event, textArea: HTMLTextAreaElement) => {
    event.preventDefault();

    if (!textArea.value) return;

    const comments = JSON.parse(localStorage.getItem('comments') as string);
    const data: CommentType = {
      ...this._user,
      comment: textArea.value,
      date: new Date(),
      favorite: false,
      rating: Math.floor(Math.random() * 201 - 100),
    };

    comments.push(data);
    localStorage.setItem('comments', JSON.stringify(comments));

    textArea.value = '';
    this._updateCounter();
    this._updateComments();
    this.render();
  };

  autoResizeTextArea(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;

    if (textArea.scrollHeight >= 400) {
      textArea.style.overflow = 'visible';
    }
  }

  updateUser() {
    this._elements[Elements.avatar].setAttribute('src', this._user.avatar);
    this._elements[Elements.name].innerHTML = this._user.name;
  }
}
