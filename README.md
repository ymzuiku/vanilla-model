# vanilla-element

拥有完整 TS 提示的 document.createElement 简化函数.

此库源码仅仅是以下几行：

```js
export const Ele = (tag, obj, children) => {
  const el = document.createElement(tag);
  if (obj) {
    Ele.set(el, obj);
  }
  if (children && children.length) {
    el.append(...children);
  }
  return el;
};

Ele.set = (target, obj) => {
  const { style, ...rest } = obj;
  if (style) {
    Object.assign(target.style, style);
  }

  Object.assign(target, rest);

  return target;
};
```

## Example:

Easy create HTMLElement:

```js
import Ele from "vanilla-element";

// 可以创建类似树形的代码
const view = Ele("div", { className: "page", style: { fontSize: "3em" } }, [
  Ele("div", null, [
    Ele("h1", { textContent: "hello" }),
    Ele("p", { textContent: "world" }),
  ]),
]);

// 可以设置 Element 属性，其中 style 内容会进行覆盖合并
Ele.set(view, {
  id: "the-id",
  style: {
    backgroundColor: "#f77",
  },
});

document.body.append(view);
```

仅此而已
