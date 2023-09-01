import { IElements, getElements } from '../utils/utils';
import { ControlPanel } from '../controlPanel/controlPanel';
import { CommentForm } from '../commentForm/commentForm';
import { Comments } from '../comments/comments';
import { answerComment } from '../answerComment/answerComment';

enum Elements {
  controlPanel = 'controlPanel',
  commentForm = 'commentForm',
  comments = 'comments',
  answerComment = 'answerComment',
}

export class CommentBlock {
  private readonly _commentBlock: HTMLElement;
  private readonly _elements: IElements = {};
  private _templateCommentBlock = `
    <div class="сontrol-panel" data-element="${Elements.controlPanel}"></div>
    <div class="new-comments" data-element="${Elements.commentForm}"></div>
    <div class="all-comments" data-element="${Elements.comments}"></div>
    <div class="answer-comments" data-element="${Elements.answerComment}"></div>
  `;

  constructor(commentBlock: HTMLElement) {
    this._commentBlock = commentBlock;
    this.render();
  }

  public render() {
    this._commentBlock.innerHTML = this._templateCommentBlock;
    getElements(this._commentBlock, this._elements);
    new ControlPanel(this._elements[Elements.controlPanel]);
    new CommentForm(this._elements[Elements.commentForm]);
    new Comments(this._elements[Elements.comments]);
    new answerComment(this._elements[Elements.answerComment]);
  }
}
