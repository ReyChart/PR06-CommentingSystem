import { IElements, getElements } from '../utils/utils';

export class Comments {
  private readonly _comments: HTMLElement;
  private readonly _elements: IElements = {};

  constructor(comments: HTMLElement) {
    this._comments = comments;
    this.render();
  }

  render() {}
}
