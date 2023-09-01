export class InfoBlock {
  private readonly _infoBlock: HTMLElement;
  private _templateInfoBlock = `
    ${[...Array(8)].map(() => `<div class="info-block__small"></div>`).join('')}
    <div class="info-block__large"></div>
  `;

  constructor(infoBlock: HTMLElement) {
    this._infoBlock = infoBlock;
    this.render();
  }

  public render() {
    this._infoBlock.innerHTML = this._templateInfoBlock;
  }
}
