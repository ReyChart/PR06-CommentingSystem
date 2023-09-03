import { IElements, getElements } from '../utils/utils';
import style from './answerComment.module.scss';

export class answerComment {
  private readonly _answerComment: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateAnswerComment = `
    <img src="./junebox3000.png" alt="commenter avatar" class="${style.answer_comment_avatar}"/>
    <div class="answer_comment_inner">
        <div class="${style.answer_comment_info}">
            <p>Джунбокс3000</p>
            <div class="${style.answer_comment_info_wrapper}">
                <img src="./arrow_answer.svg" alt="arrow answer"/>
                <p>Алексей_1994b</p>
            </div>
            <p>15.01 15:18</p>
        </div>
        <p>Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.</p>
        <div class="${style.answer_comment_panel}">
            <button class="${style.answer_comment_btn_favorite}">
                <img src="./epmty_heart.svg" alt="empty heart"/> В избранное
            </button>
            <div class="${style.answer_comment_vote_system}">
                <div class="${style.answer_comment_vote_btn}">
                    <img src="./minus.svg" alt="icon minus" class="${style.btn_minus}"/>
                </div>
                <p class="${style.answer_comment_rating} ${style.comments_positive}">3</p>
                <div class="${style.answer_comment_vote_btn}">
                    <img src="./plus.svg" alt="icon plus" class="${style.btn_plus}"/>
                </div>
            </div>
        </div>
    </div>
    `;

  constructor(answerComment: HTMLElement) {
    this._answerComment = answerComment;
    this.render();
  }

  render() {
    this._answerComment.innerHTML = this._templateAnswerComment;
    getElements(this._answerComment, this._elements);
  }
}
