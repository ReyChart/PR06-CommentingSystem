import { IElements, getElements } from '../utils/utils';

enum Elements {
  allCommentsFilter = 'allCommentsFilter',
  counter = 'counter',
  favoriteFilter = 'favoriteFilter',
  selectButton = 'selectButton',
  selectDropdown = 'selectDropdown',
}

export class ControlPanel {
  private readonly _controlPanel: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateControlPanel = `
    <div class="сontrol-panel__comments">
      <p class="сontrol-panel__comments_text" data-element="${Elements.allCommentsFilter}">Комментарии</p>
      <p class="сontrol-panel__comments_count" ${Elements.counter}>(80)</p>
    </div>
    <div class="сontrol-panel__list">
      <p class="сontrol-panel__list_text">По количеству оценок</p>
      <img src="./arrow_up.svg" alt="arrow up" class="сontrol-panel__list_arrow"/>
    </div>
    <div class="сontrol-panel__favorite">
      <p class="сontrol-panel__favorite_text">Избранное</p>
      <img src="./favorite_heart.svg" alt="favorite heart" class="сontrol-panel__favorite_heart"/>
    </div>
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
