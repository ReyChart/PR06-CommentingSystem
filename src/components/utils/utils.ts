import { CommentType } from '../comment/comment';

export interface IElements {
  [key: string]: HTMLElement;
}

export function getElements(root: HTMLElement, elements: IElements) {
  [...root.querySelectorAll('[data-element]')].forEach((element: Element) => {
    if (element instanceof HTMLElement) {
      elements[element.dataset.element as keyof typeof elements] = element;
    }
  });
}

export const _ = () => {};

export function sortBy(comments: CommentType[]) {
  const sortAttribute = localStorage.getItem('sort');

  switch (sortAttribute) {
    case 'date':
      return comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    case 'relevance':
      return comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    case 'rating':
      return comments.sort((a, b) => b.rating - a.rating);

    case 'replies':
      const storageComms = [...JSON.parse(localStorage.getItem('comments') as string)];
      const parentWithReplyCount = comments.map((comment) => {
        const replyCount = storageComms.filter((item) => item.parent === comment.uuid).length;
        return { ...comment, replyCount };
      });
      return parentWithReplyCount.sort((a, b) => b.replyCount - a.replyCount);
  }
}
