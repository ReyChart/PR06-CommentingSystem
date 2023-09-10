import { IElements, getElements } from '../utils/utils';
import style from './controlPanel.module.scss';

enum Elements {
  commentsFilter = 'commentsFilter',
  counter = 'counter',
  selectButton = 'selectButton',
  selectDropdown = 'selectDropdown',
  favoriteFilter = 'favoriteFilter',
}

export class ControlPanel {
  private readonly _controlPanel: HTMLElement;
  private readonly _elements: IElements = {};
  private _selectData = [
    { key: 'date', value: 'По дате' },
    { key: 'rating', value: 'По количеству оценок' },
    { key: 'relevance', value: 'По актуальности' },
    { key: 'answer', value: 'По количеству ответов' },
  ];

  private _templateControlPanel = `
    <button class="${style.comments_btn}" data-element="${Elements.commentsFilter}">
      Комментарии <span data-element="${Elements.counter}"></span>
    </button>
    <div class="${style.select}">
      <button class="${style.select_btn}" data-element="${Elements.selectButton}">
        По количеству оценок <img src="./arrow_up.svg" alt="arrow up"/>
      </button>
      <ul class="${style.select_dropdown} ${style.hidden}" data-element="${Elements.selectDropdown}">
        ${this._selectData.map((item) => `<li value="${item.key}">${item.value}</li>`).join('')}
      </ul>
    </div>
    <button class="${style.favorite_btn}" data-element="${Elements.favoriteFilter}">
      Избранное <img src="./favorite_heart.svg" alt="favorite heart"/>
    </button>
  `;

  constructor(controlPanel: HTMLElement) {
    this._controlPanel = controlPanel;

    this.render();
  }

  render() {
    this._controlPanel.innerHTML = this._templateControlPanel;
    getElements(this._controlPanel, this._elements);
    this.updateCounter();
  }

  updateCounter() {
    const counter = this._elements[Elements.counter] as HTMLElement;
    const commentsCounter = JSON.parse(localStorage.getItem('comments') as string).length;

    counter.innerHTML = `(${commentsCounter})`;
  }
}
