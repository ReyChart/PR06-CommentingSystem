import { IElements, getElements } from './utils/utils';
import { InfoBlock } from './infoBlock/infoBlock';
import { CommentBlock } from './commentBlock/commentBlock';
import style from './main.module.scss';

enum Elements {
  infoBlock = 'infoBlock',
  commentsBlock = 'commentsBlock',
}

export class Main {
  private readonly _root: HTMLElement;
  private readonly _sections: IElements = {};
  private _template = `
    <header class="${style.header}"></header>
    <main class="${style.main}">
      <aside class="${style.sidebar}"></aside>
      <div class="${style.blocks_wrapper}">
        <section class="${style.info_block}" data-element="${Elements.infoBlock}"></section>
        <section data-element="${Elements.commentsBlock}"></section>
      </div>
    </main>
  `;

  constructor(root: HTMLElement) {
    this._root = root;
  }

  public render() {
    this._root.innerHTML = this._template;
    getElements(this._root, this._sections);
    new InfoBlock(this._sections[Elements.infoBlock]);
    new CommentBlock(this._sections[Elements.commentsBlock]);
  }
}
