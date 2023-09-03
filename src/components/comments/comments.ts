import { IElements, getElements } from '../utils/utils';
import style from './comments.module.scss';

export class Comments {
  private readonly _comments: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateComments = `
    <img src="./aleks_1994b.png" alt="commenter avatar" class="${style.comments_avatar}"/>
    <div class="comments_inner">
        <div class="${style.comments_info}">
            <p>Алексей_1994b</p>
            <p>15.01 13:55</p>
        </div>
        <p>Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.
        </p>
        <div class="${style.comments_panel}">
            <button class="${style.comments_btn_answer}">
              <img src="./arrow_answer.svg" alt="arrow answer"/> Ответить
            </button>
            <button class="${style.comments_btn_favorite}">
                <img src="./completed_heart.svg" alt="completed heart"/> В избранном
            </button>
            <div class="${style.comments_vote_system}">
                <div class="${style.comments_vote_btn}">
                    <img src="./minus.svg" alt="icon minus" class="${style.btn_minus}"/>
                </div>
                <p class="${style.comments_rating} ${style.comments_positive}">6</p>
                <div class="${style.comments_vote_btn}">
                    <img src="./plus.svg" alt="icon plus" class="${style.btn_plus}"/>
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
