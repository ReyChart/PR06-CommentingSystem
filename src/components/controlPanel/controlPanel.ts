import { CommentType } from '../comment/comment';
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
        По актуальности <img src="./arrow_up.svg" alt="arrow up"/>
      </button>
      <ul class="${style.select_dropdown} ${style.hide}" data-element="${
    Elements.selectDropdown
  }">
        ${this._selectData
          .map(
            (item) =>
              `<li value="${item.key}"><img src="./checkbox.svg" alt="checkbox"/> ${item.value}</li>`
          )
          .join('')}
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
    this.addListeners();
  }

  updateCounter() {
    const counter = this._elements[Elements.counter] as HTMLElement;
    const commentsCounter = JSON.parse(localStorage.getItem('comments') as string).filter(
      (item: CommentType) => !item.parent
    ).length;

    counter.innerHTML = `(${commentsCounter})`;
  }

  onSelectButton = () => {
    const button = this._elements[Elements.selectButton] as HTMLButtonElement;
    const icon = button.firstElementChild as HTMLPictureElement;
    const dropdown = this._elements[Elements.selectDropdown] as HTMLUListElement;

    icon.classList.toggle(style.rotate);
    dropdown.classList.toggle(style.hide);
  };

  onSelectDropdown = (event: MouseEvent) => {
    const button = this._elements[Elements.selectButton] as HTMLButtonElement;
    const dropdown = this._elements[Elements.selectDropdown] as HTMLUListElement;

    if (event.target instanceof HTMLElement) {
      const listItem = event.target.closest('li');

      if (listItem) {
        const sortType = listItem.getAttribute('value') as string;
        const sortTypeLabel = this._selectData.find((item) => item.key === sortType);

        localStorage.setItem('sort', sortType);
        button.innerHTML = `${sortTypeLabel?.value} <img src="./arrow_up.svg" alt="arrow up"/>`;

        const ListItems = dropdown.querySelectorAll('li');
        ListItems.forEach((item) => {
          const checkMark = item.querySelector('img') as HTMLImageElement;
          checkMark.style.visibility = 'hidden';
        });

        const checkMark = listItem.querySelector('img') as HTMLImageElement;
        checkMark.style.visibility = 'visible';
      }
    }

    dropdown.classList.toggle(style.hide);
  };

  addListeners() {
    const selectButton = this._elements[Elements.selectButton] as HTMLButtonElement;
    const selectDropdown = this._elements[Elements.selectDropdown] as HTMLUListElement;

    selectButton.addEventListener('click', this.onSelectButton);
    selectDropdown.addEventListener('click', this.onSelectDropdown);
  }
}
