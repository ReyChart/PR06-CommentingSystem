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
  private readonly updateComments: () => void;
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
  constructor(commentForm: HTMLElement, updateComments: () => void) {
    this._commentForm = commentForm;
    this.updateComments = updateComments;
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

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const textArea = this._elements[Elements.textArea] as HTMLTextAreaElement;
      if (!textArea.value) return;
      const comments = JSON.parse(localStorage.getItem('comments') || '[]');

      const draftData = {
        ...this._user,
        comment: textArea.value,
        date: new Date(Date.now()),
        favorite: false,
        rating: Math.floor(Math.random() * (101 + 100) - 100),
      };

      comments.push(draftData);
      localStorage.setItem('comments', JSON.stringify(comments));

      textArea.value = '';
      this.updateComments();
      this.render();
    });
  }

  updateUser() {
    this._elements[Elements.avatar].setAttribute('src', this._user.avatar);
    this._elements[Elements.name].innerHTML = this._user.name;
  }
}
