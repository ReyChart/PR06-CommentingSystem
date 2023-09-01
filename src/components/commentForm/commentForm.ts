import { IElements, getElements } from '../utils/utils';

export class CommentForm {
  private readonly _commentForm: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateCommentForm = `
    <img src="./maks_avdeenko.png" alt="commenter avatar" class="new-comments__img avatar__img"/>
    <div class="new-comments__inner">
        <div class="new-comments__wrapper">
            <div class="new-comments__info">
                <h2 class="new-comments__info_name">Максим Авдеенко</h2>
                <p class="new-comments__info_symbols">Макс. 1000 символов</p>
            </div>
            <div class="new-comments__error">
                <p class="new-comments__error_msg">Слишком длинное сообщение</p>
            </div>
        </div>
        <form action="/" class="new-comments__form" onsubmit="return false">
            <textarea class="new-comments__form_input" placeholder="Введите текст сообщения..."></textarea>
            <button class="new-comments__form_btn" type="submit">Отправить</button>
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
  }
}
