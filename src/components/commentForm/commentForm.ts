import { IElements, getElements } from '../utils/utils';
import style from './commentForm.module.scss';

export class CommentForm {
  private readonly _commentForm: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateCommentForm = `
    <img src="./maks_avdeenko.png" alt="commenter avatar" class="${style.add_comment_avatar}"/>
    <div class="add_comment_inner">
        <div class="${style.add_comment_wrapper}">
            <div class="${style.add_comment_info}">
                <h2>Максим Авдеенко</h2>
                <p>Макс. 1000 символов</p>
            </div>
            <div class="${style.add_comment_error}">
                <p>Слишком длинное сообщение</p>
            </div>
        </div>
        <form action="/" class="${style.add_comment_form}" onsubmit="return false">
            <textarea class="${style.add_comment_input}" placeholder="Введите текст сообщения..."></textarea>
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
  }
}
