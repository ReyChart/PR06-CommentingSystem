import { IElements, getElements } from '../utils/utils';
import style from './commentForm.module.scss';
import { User, getUser } from '../../request';

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
  private _templateCommentForm = `
    <img alt="commenter avatar" class="${style.add_comment_avatar}" data-element="${Elements.avatar}"/>
    <div class="add_comment_inner">
        <div class="${style.add_comment_wrapper}">
            <div class="${style.add_comment_info}">
                <p data-element="${Elements.name}"></p>
                <p>Макс. 1000 символов</p>
            </div>
            <div class="${style.add_comment_error}">
                <p>Слишком длинное сообщение</p>
            </div>
        </div>
        <form action="/" class="${style.add_comment_form}" data-element="${Elements.form}">
            <textarea class="${style.add_comment_input}" placeholder="Введите текст сообщения..." data-element="${Elements.textArea}"></textarea>
            <button class="${style.add_comment_btn}" type="submit">Отправить</button>
        </form>
    </div>
  `;
  constructor(commentForm: HTMLElement) {
    this._commentForm = commentForm;
    this.render();
  }

  render() {
    this._commentForm.innerHTML = this._templateCommentForm;
    getElements(this._commentForm, this._elements);

    getUser()
      .then((user) => (this._user = user))
      .then(() => this.updateUser());
  }

  updateUser() {
    this._elements[Elements.avatar].setAttribute('src', this._user.avatar);
    this._elements[Elements.name].innerHTML = this._user.name;
  }
}
