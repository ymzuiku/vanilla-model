import css from "template-css";
import { VanillaModel, IModel } from "../model";

interface IAlertProps extends IModel {
  title?: string;
  events?: { close: Function };
  ok?: any;
  cancel?: any;
  oncancel?: (close: unknown) => any;
  onok?: (close: unknown) => any;
}

function _Button(children: any, onclick: any, events: any, isCancel?: boolean) {
  const comp = document.createElement("div");
  comp.className = ["ux-alert-btn", isCancel && "ux-alert-btn-cancel"].join(
    " "
  );
  comp.onclick = () => {
    if (onclick) {
      onclick(events.close);
    } else {
      events.close();
    }
  };

  if (children) {
    comp.append(...children);
  }

  return comp;
}

function _AlertElement({
  events,
  title,
  ok,
  oncancel,
  onok,
  cancel = "Cancel",
  children,
}: IAlertProps) {
  const comp = document.createElement("form");
  comp.className = "ux-alert-form";

  if (title) {
    const titleEl = document.createElement("div");
    Object.assign(titleEl, {
      className: "ux-alert-form-title",
      textContent: title,
    });
    comp.append(title);
  }

  const childrenBox = document.createElement("div");
  childrenBox.className = "ux-alert-content";
  if (children) {
    childrenBox.append(...children);
  }
  comp.append(childrenBox);

  // btn-box
  const btnBox = document.createElement("div");
  btnBox.className = "ux-alert-btns";
  comp.append(btnBox);

  if (ok) {
    const okBtn = _Button([ok], onok, events);
    Object.assign(okBtn.style, {
      borderBotton: "1px solid var(--gray-300, #aaa)",
    } as Partial<CSSStyleDeclaration>);
    btnBox.append(okBtn);
  }

  const cancelBtn = _Button([cancel], onok, events, true);
  btnBox.append(cancelBtn);

  comp.onsubmit = () => {
    onok && onok((events as any).close);
  };

  return comp;
}

/** 实例之后加入到 document.body 中
 *  document.body.append(<UxAlert>hello</UxAlert>)
 */
export function VanillaAlert(props: IAlertProps = {}) {
  const model = VanillaModel({
    direction: "center",
    children: [
      _AlertElement({
        events: {
          close: () => {
            model.close();
          },
        },
        ...props,
      }),
    ],
  });
  return model;
}

css`
  .ux-alert-btns {
    display: grid;
    grid-auto-flow: row;
  }
  @media (min-width: 640px) {
    .ux-alert-btns {
      display: grid;
      grid-auto-flow: column;
    }
  }
  .ux-alert-btn {
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid var(--disable-weak, #eee);
    text-align: center;
    padding: var(--a2, 16px);
    cursor: pointer;
    color: var(--primary, #f33);
  }
  @media (pointer: fine) {
    .ux-alert-btn {
      border-left: 1px solid var(--disable-weak, #eee);
    }
    .ux-alert-btn:hover {
      background: var(--active-weak, #faa);
    }
  }
  .ux-alert-btn:active {
    background: var(--active, #f66);
  }
  .ux-alert-btn-cancel {
    color: var(--label-deep, #888) !important;
  }
  .ux-alert-form {
    width: 80vw;
    max-width: 500px;
    background: var(--bg, #fff);
    border-radius: var(--r, 6px);
    box-shadow: 0px 4px 10px var(--black-10, rgba(0, 0, 0, 0.1));
    overflow: hidden;
  }
  /* @media (max-width: 640px) {
    .ux-alert-form {
      width: 70vw;
      max-width: 1024px;
    }
  } */
  .ux-alert-title {
    font-size: 16px;
    font-weight: 500;
    padding: 20px;
    padding-bottom: 0px;
    background: var(--bg, #fff);
  }
  .ux-alert-content {
    padding: 20px;
    background: var(--bg, #fff);
  }
`;
