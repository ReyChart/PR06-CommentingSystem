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
