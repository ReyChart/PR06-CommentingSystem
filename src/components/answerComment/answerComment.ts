import { IElements, getElements } from '../utils/utils';

export class answerComment {
  private readonly _answerComment: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateAnswerComment = `
    <img src="./junebox3000.png" alt="commenter avatar" class="answer-comments_img avatar__img"/>
    <div class="answer-comments__inner">
        <div class="answer-comments__info">
            <h2 class="answer-comments__info_name">Джунбокс3000</h2>
            <div class="answer-comments__info-wrapper">
                <img src="./arrow_answer.svg" alt="arrow answer" class="answer-comments__info_icon"/>
                <p class="answer-comments__info_text">Алексей_1994b</p>
            </div>
            <p class="answer-comments__info_date">15.01 15:18</p>
        </div>
        <p class="answer-comments__msg">Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.</p>
        <div class="answer-comments__menu">
            <div class="answer-comments__menu-favorite">
                <img src="./epmty_heart.svg" alt="empty heart" class="answer-comments__menu-favorite_icon"/>
                <p class="answer-comments__menu-favorite_text">В избранное</p>
            </div>
            <div class="answer-comments__menu-rating">
                <div class="answer-comments__menu-rating_icon-wrapper">
                    <img src="./minus.svg" alt="icon minus" class="answer-comments__menu-rating_icon-minus"/>
                </div>
                <p class="answer-comments__menu-rating_number positive-number">3</p>
                <div class="answer-comments__menu-rating_icon-wrapper">
                    <img src="./plus.svg" alt="icon plus" class="answer-comments__menu-rating_icon-plus"/>
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
