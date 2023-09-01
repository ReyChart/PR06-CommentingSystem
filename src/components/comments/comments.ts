import { IElements, getElements } from '../utils/utils';

export class Comments {
  private readonly _comments: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateComments = `
    <img src="./aleks_1994b.png" alt="commenter avatar" class="all-commets__img avatar__img"/>
    <div class="all-comments__inner">
        <div class="all-comments__info">
            <h2 class="all-comments__info_name">Алексей_1994b</h2>
            <p class="all-comments__info_date">15.01 13:55</p>
        </div>
        <p class="all-comments__msg">Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.
        </p>
        <div class="all-comments__menu">
            <div class="all-comments__menu-answer">
                <img src="./arrow_answer.svg" alt="arrow answer" class="all-comments__menu-answer_icon"/>
                <p class="all-comments__menu-answer_text">Ответить</p>
            </div>
            <div class="all-comments__menu-favorite">
                <img src="./completed_heart.svg" alt="completed heart" class="all-comments__menu-favorite_icon"/>
                <p class="all-comments__menu-favorite_text">В избранном</p>
            </div>
            <div class="all-comments__menu-rating">
                <div class="all-comments__menu-rating_icon-wrapper">
                    <img src="./minus.svg" alt="icon minus" class="all-comments__menu-rating_icon-minus"/>
                </div>
                <p class="all-comments__menu-rating_number positive-number">6</p>
                <div class="all-comments__menu-rating_icon-wrapper">
                    <img src="./plus.svg" alt="icon plus" class="all-comments__menu-rating_icon-plus"/>
                </div>
            </div>
        </div>
    </div>
  `;

  constructor(comments: HTMLElement) {
    this._comments = comments;
    this.render();
  }

  render() {
    this._comments.innerHTML = this._templateComments;
    getElements(this._comments, this._elements);
  }
}
