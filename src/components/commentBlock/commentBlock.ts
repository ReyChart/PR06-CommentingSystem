import { IElements, getElements } from '../utils/utils';
import { ControlPanel } from '../controlPanel/controlPanel';
import { CommentForm } from '../commentForm/commentForm';
import { Comments } from '../comments/comments';
import style from './commentBlock.module.scss';

enum Elements {
  controlPanel = 'controlPanel',
  commentForm = 'commentForm',
  comments = 'comments',
  answerComment = 'answerComment',
}

export class CommentBlock {
  private readonly _commentBlock: HTMLElement;
  private readonly _elements: IElements = {};

  private _controlPanel!: ControlPanel;
  private _comments!: Comments;

  private _templateCommentBlock = `
    <div class="${style.control_panel}" data-element="${Elements.controlPanel}"></div>
    <div class="${style.comment_form}" data-element="${Elements.commentForm}"></div>
    <div data-element="${Elements.comments}"></div>
  `;

  constructor(commentBlock: HTMLElement) {
    this._commentBlock = commentBlock;

    this.render();
  }

  public render() {
    this._commentBlock.innerHTML = this._templateCommentBlock;
    getElements(this._commentBlock, this._elements);

    if (!localStorage.getItem('comments')) localStorage.setItem('comments', '[]');
    localStorage.setItem('sort', 'relevance');
    if (!localStorage.getItem('favorite')) localStorage.setItem('favorite', '[]');
    localStorage.setItem('favoriteState', 'false');

    this._controlPanel = new ControlPanel(
      this._elements[Elements.controlPanel],
      this.updateComments,
      this.showFavoriteComments
    );
    new CommentForm(
      this._elements[Elements.commentForm],
      this.updateComments,
      this.updateCounter
    );
    this._comments = new Comments(this._elements[Elements.comments]);
  }

  updateCounter = () => {
    this._controlPanel.updateCounter();
  };

  updateComments = () => {
    this._comments.updateComments();
  };

  showFavoriteComments = () => {
    this._comments.showFavoriteComments();
  };
}
