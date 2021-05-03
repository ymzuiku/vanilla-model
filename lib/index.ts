type PartialDetail<T> = {
  [P in keyof T]?: Partial<T[P]>;
};

export const Ele = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  obj?: PartialDetail<HTMLElementTagNameMap[K]>,
  children?: (Element | string)[]
): HTMLElementTagNameMap[K] => {
  const el = document.createElement(tag);
  if (obj) {
    Ele.set(el, obj);
  }
  if (children && children.length) {
    el.append(...children);
  }
  return el;
};

Ele.set = <T>(target: T, obj: PartialDetail<T>): T => {
  const { style, ...rest } = obj as any;
  if (style) {
    Object.assign((target as any).style, style);
  }

  Object.assign(target, rest);

  return target;
};
