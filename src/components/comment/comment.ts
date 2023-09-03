import { IElements, getElements } from '../utils/utils';
import style from './comment.module.scss';
import { User } from '../../request';

enum Elements {
  avatar = 'avatar',
}

export type ParentComment = {
  comment: string;
  date: Date;
  favorite: boolean;
  rating: number;
  replies?: ChildComment[];
} & User;

export type ChildComment = {
  comment: string;
  date: Date;
  favorite: boolean;
  rating: number;
  parent: ParentComment;
} & User;

export class Comment {
  private readonly _comment: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateComment = `
      <img src="./aleks_1994b.png" alt="commenter avatar" class="${style.comment_avatar}"/>
      <div class="comments_inner">
          <div class="${style.comment_info}">
              <p>Алексей_1994b</p>
              <p>15.01 13:55</p>
          </div>
          <p>Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.
          </p>
          <div class="${style.comment_panel}">
              <button class="${style.comment_btn_answer}">
                <img src="./arrow_answer.svg" alt="arrow answer"/> Ответить
              </button>
              <button class="${style.comment_btn_favorite}">
                  <img src="./completed_heart.svg" alt="completed heart"/> В избранном
              </button>
              <div class="${style.comment_vote_system}">
                  <div class="${style.comment_vote_btn}">
                      <img src="./minus.svg" alt="icon minus" class="${style.btn_minus}"/>
                  </div>
                  <p class="${style.comment_rating} ${style.comment_positive}">6</p>
                  <div class="${style.comment_vote_btn}">
                      <img src="./plus.svg" alt="icon plus" class="${style.btn_plus}"/>
                  </div>
              </div>
          </div>
      </div>
    `;

  constructor(comment: HTMLElement) {
    this._comment = comment;
    this.render();
  }

  render() {
    this._comment.innerHTML = this._templateComment;
    getElements(this._comment, this._elements);
  }
}
