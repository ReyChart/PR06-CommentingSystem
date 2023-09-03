import { IElements, getElements } from '../utils/utils';
import style from './controlPanel.module.scss';

enum Elements {
  allCommentsFilter = 'allCommentsFilter',
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
    <button class="${style.control_panel_comment}" data-element="${Elements.allCommentsFilter}">
      Комментарии <span class="${style.control_panel_count}" ${Elements.counter}>(80)</span>
    </button>
    <div class="${style.control_panel}">
      <button class="${style.control_panel_select}" data-element="${Elements.selectButton}">
        По количеству оценок <img src="./arrow_up.svg" alt="arrow up"/>
      </button>
      <ul class="${style.control_panel_list} ${style.hidden}" data-element="${Elements.selectDropdown}">
      ${this._selectData
        .map((item) => `<li class="${style.control_panel_item}" value="${item.key}">${item.value}</li>`)
        .join('')}
      </ul>
    </div>
    <button class="${style.control_panel_favorite}">
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
  }
}
