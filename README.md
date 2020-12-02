# watermark

基于`canvas`的轻量级水印指令。

# 用法

```js
import waterMark from '@/directives/waterMark/waterMark'
```

```js
directives: {
  waterMark
}
```

```html
<div v-waterMark="'自己做水印'" class="app"></div>

<div
  v-waterMark="{ text: '水印ing...', textColor: '#e22018' }"
  class="app"
></div>
```

# 参数

| 参数名    | 介绍         | 类型    | 默认值              |
| --------- | ------------ | ------- | ------------------- |
| observe   | 开启监测     | Boolean | true                |
| showMark  | 开启水印     | Boolean | true                |
| text      | 水印文字     | String  | qiYuei              |
| textColor | 水印文字颜色 | String  | rgba(10,10,10,0.08) |
