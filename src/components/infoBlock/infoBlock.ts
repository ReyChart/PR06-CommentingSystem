import style from './infoBlock.module.scss';
export class InfoBlock {
  private readonly _infoBlock: HTMLElement;
  private _templateInfoBlock = `
    ${[...Array(8)].map(() => `<div class="${style.info_block_small}"></div>`).join('')}
    <div class="${style.info_block_large}"></div>
  `;

  constructor(infoBlock: HTMLElement) {
    this._infoBlock = infoBlock;
    this.render();
  }

  public render() {
    this._infoBlock.innerHTML = this._templateInfoBlock;
  }
}
