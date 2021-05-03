# vanilla-model

> Size < 1kb

性感的 Model、Alert 组件

## Install

```sh
$ npm install --save vanilla-life
```

## Use

```ts
import { VanillaAlert } from "vanilla-model";

const el = document.createElement("div");
el.textContent = "hello alert";

const alertEl = VanillaAlert({ children: [el] });

document.body.append(alertEl);
```
