import { IElements, getElements } from '../utils/utils';
import { Comment, CommentType } from '../comment/comment';

export class Comments {
  private readonly _comments: HTMLElement;
  private readonly _elements: IElements = {};
  private _commentsContainer: CommentType[];

  constructor(comments: HTMLElement) {
    this._comments = comments;
    this._commentsContainer = JSON.parse(
      localStorage.getItem('comments') as string
    );
    this.render();
  }

  render() {
    if (!this._commentsContainer.length) return;

    this._comments.innerHTML = this._commentsContainer
      .map((comment) => `<div data-element="${comment.uuid}"></div>`)
      .join('');
    getElements(this._comments, this._elements);

    Object.entries(this._elements).forEach(
      ([id, element]) => new Comment(element, id, this.updateComments)
    );
  }

  updateComments = () => {
    this._commentsContainer = JSON.parse(localStorage.getItem('comments')!);
    this.render();
  };
}
