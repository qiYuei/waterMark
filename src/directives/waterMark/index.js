import watermark from './waterMark'

const install = function(Vue) {
  Vue.directive('watermark', watermark)
}

watermark.install = install

export default watermark
