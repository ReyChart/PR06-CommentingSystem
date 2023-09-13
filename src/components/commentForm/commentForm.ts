import { IElements, getElements } from '../utils/utils';
import style from './commentForm.module.scss';
import { User, getUser } from '../../request';
import { CommentType } from '../comment/comment';

enum Elements {
  avatar = 'avatar',
  name = 'name',
  charCount = 'charCount',
  error = 'error',
  form = 'form',
  textArea = 'textArea',
  buttonSend = 'buttonSend',
  buttonCancel = 'buttonCancel',
}

export class CommentForm {
  private readonly _commentForm: HTMLElement;
  private readonly _elements: IElements = {};
  private _charCount: number | undefined;
  private _user!: User;
  private readonly _parent: CommentType | null;

  private readonly _updateComments: () => void;
  private readonly _updateCounter: () => void;

  private _templateCommentForm = `
    <img alt="commenter avatar" class="${style.avatar}" data-element="${Elements.avatar}"/>
    <div class="comment_form_inner">
      <div class="${style.comment_wrapper}">
        <div class="${style.comment_info}">
          <p data-element="${Elements.name}"></p>
          <p data-element="${Elements.charCount}">Макс. 1000 символов</p>
        </div>
        <div class="${style.comment_error}" data-element="${Elements.error}">
          <p>Слишком длинное сообщение</p>
        </div>
      </div>
      <form action="/" class="${style.form}" data-element="${Elements.form}">
        <textarea class="${style.form_input}" placeholder="Введите текст сообщения..." data-element="${Elements.textArea}"></textarea>
        <button class="${style.form_btn}" type="submit" disabled data-element="${Elements.buttonSend}">Отправить</button>
        <button class="${style.form_btn}" data-element="${Elements.buttonCancel}">Отмена</button>
      </form>
    </div>
  `;
  constructor(
    commentForm: HTMLElement,
    updateComments: () => void,
    updateCounter: () => void,
    parent: CommentType | null = null
  ) {
    this._commentForm = commentForm;
    this._parent = parent;

    this._updateComments = updateComments;
    this._updateCounter = updateCounter;
    this.render();
  }

  render() {
    this._commentForm.innerHTML = this._templateCommentForm;
    getElements(this._commentForm, this._elements);

    if (!this._parent) {
      this._elements[Elements.buttonCancel].remove();
      delete this._elements[Elements.buttonCancel];
    }

    getUser()
      .then((user) => (this._user = user))
      .then(() => this.updateUser());

    this.addListeners();
  }

  addListeners() {
    const form = this._elements[Elements.form] as HTMLFormElement;
    const textArea = this._elements[Elements.textArea] as HTMLTextAreaElement;
    const cancelBtn = this._elements[
      Elements.buttonCancel
    ] as HTMLButtonElement;

    form.addEventListener('submit', (event) => this.onSubmit(event, textArea));
    cancelBtn?.addEventListener('click', this.onCancel);
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

  onCancel = () => {
    this._commentForm.remove();
  };

  autoResizeTextArea(textArea: HTMLTextAreaElement) {
    const countLineBreaks = textArea.value.match(/\n/g);

    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;

    if (textArea.scrollHeight >= 400) {
      textArea.style.overflow = 'visible';
    }

    if (countLineBreaks) {
      textArea.rows = countLineBreaks.length + 1;
    } else if (textArea.value.length <= 36 && !countLineBreaks) {
      textArea.rows = 1;
      textArea.style.height = '65px';
    }

    this.formSymbolValidation(textArea);
  }

  formSymbolValidation(textArea: HTMLTextAreaElement) {
    const charCountElement = this._elements.charCount as HTMLParagraphElement;
    const errorElement = this._elements.error as HTMLDivElement;
    const buttonElement = this._elements.buttonSend as HTMLButtonElement;
    this._charCount = textArea.value.length;

    this._charCount && this._charCount < 1000
      ? (buttonElement.disabled = false)
      : (buttonElement.disabled = true);

    if (this._charCount || this._charCount === 0)
      charCountElement.innerText = `${this._charCount}/1000`;

    this._charCount > 1000
      ? ((charCountElement.style.color = 'rgba(255, 0, 0)'),
        (charCountElement.style.opacity = '1'),
        (errorElement.style.display = 'block'))
      : ((charCountElement.style.color = 'rgba(0, 0, 0'),
        (charCountElement.style.opacity = '0.4'),
        (errorElement.style.display = 'none'));
  }

  updateUser() {
    this._elements[Elements.avatar].setAttribute('src', this._user.avatar);
    this._elements[Elements.name].innerHTML = this._user.name;
  }
}
