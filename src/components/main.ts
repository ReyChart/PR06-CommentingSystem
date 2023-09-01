import { IElements, getElements } from './utils/utils';
import { InfoBlock } from './infoBlock/infoBlock';
import { CommentBlock } from './commentBlock/commentBlock';

enum Elements {
  infoBlock = 'infoBlock',
  commentsBlock = 'commentsBlock',
}

export class Main {
  private readonly _root: HTMLElement;
  private readonly _sections: IElements = {};
  private _template = `
    <header class="header"></header>
    <main class="main">
        <aside class="sidebar"></aside>
        <div class="blocks__wrapper">
            <div class="container">
                <section class="info-block" data-element="${Elements.infoBlock}"></section>
                <section class="comments-block" data-element="${Elements.commentsBlock}"></section>
            </div>
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
