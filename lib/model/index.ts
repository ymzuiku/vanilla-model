import css from "template-css";

export interface MaskElement extends HTMLElement {
  close: () => any;
}

export interface IModel {
  children?: (HTMLElement | string)[];
  maskClickClose?: boolean;
  animeTime?: number;
  opacity?: number;
  mask?: boolean;
  closeTimeout?: number;
  maskColor?: string;
  direction?: "left" | "top" | "right" | "bottom" | "center";
  style?: Partial<CSSStyleDeclaration>;
}

const positionList = {
  bottom: "ux-model-bottom",
  top: "ux-model-top",
  left: "ux-model-left",
  right: "ux-model-right",
  center: "ux-model-center",
};

const moveOutList = {
  bottom: {
    transform: "translate(0, 100vh)",
  },
  top: {
    transform: "translate(0, -100vh)",
  },
  left: {
    transform: "translate(-100vw, 0)",
  },
  right: {
    transform: "translate(100vw, 0)",
  },
  center: {
    transform: "scale(0.7)",
  },
};

const moveInList = {
  bottom: {
    transform: "translate(0, 0px)",
  },
  top: {
    transform: "translate(0, 0px)",
  },
  left: {
    transform: "translate(0px, 0)",
  },
  right: {
    transform: "translate(0px, 0)",
  },
  center: {
    transform: "scale(1)",
  },
};

export function VanillaModel({
  maskClickClose = false,
  animeTime = 300,
  direction = "bottom",
  opacity = 0.4,
  mask = true,
  maskColor = "bg-black",
  closeTimeout,
  children,
  ...rest
}: IModel): MaskElement {
  const pos = positionList[direction];

  const maskEl = (document.createElement("div") as unknown) as MaskElement;
  maskEl.className = ["ux-model", pos].join(" ");
  const contentEl = document.createElement("div");
  const moveOut = moveOutList[direction] as any;
  const moveIn = moveInList[direction] as any;

  setTimeout(() => {
    maskEl.style.background = "var(--model-mask, rgba(0,0,0,0.5))";
    Object.assign(contentEl.style, moveIn);
  });

  maskEl.close = () => {
    maskEl.style.background = "rgba(0,0,0,0)";

    if (direction === "center") {
      Object.assign(contentEl.style, { ...moveOut, opacity: 0 });
    } else {
      Object.assign(contentEl.style, { ...moveOut, opacity: 1 });
    }

    setTimeout(() => {
      Object.assign(maskEl.style, { pointerEvents: "none" });
      Object.assign(contentEl.style, { pointerEvents: "none" });
    }, animeTime / 2);

    setTimeout(() => {
      maskEl.remove();
    }, animeTime);
  };

  if (closeTimeout) {
    setTimeout(close, closeTimeout);
  }

  const oldMaskLen = document.body.querySelectorAll("[mask-plan]").length;
  if (oldMaskLen > 0) {
    opacity = opacity / oldMaskLen / 2;
  }

  maskEl.setAttribute("mask-plan", "1");
  Object.assign(maskEl.style, {
    transition: `all ${animeTime}ms var(--ease, ease-out)`,
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0px",
    left: "0px",
    background: "rgba(0,0,0,0)",
    pointerEvents: mask ? void 0 : "none",
    zIndex: "1100",
    overflow: "hidden",
  } as Partial<CSSStyleDeclaration>);

  maskEl.onclick = () => {
    if (maskClickClose && mask) {
      close();
    }
  };

  Object.assign(maskEl, rest);

  Object.assign(contentEl.style, {
    transition: `all ${animeTime}ms var(--ease, ease-out)`,
    ...moveOut,
  });

  if (children) {
    contentEl.append(...children);
  }

  maskEl.append(contentEl);

  return maskEl;
}

css`
  .ux-model {
    font-family: var(--sans);
    display: grid;
  }
  .ux-model-bottom {
    place-content: end center;
  }
  .ux-model-top {
    place-content: start center;
  }
  .ux-model-left {
    place-content: center start;
  }
  .ux-model-right {
    place-content: center end;
  }
  .ux-model-center {
    place-content: center;
  }
`;
