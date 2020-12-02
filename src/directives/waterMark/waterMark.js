const callback = mutationList => {
  mutationList.forEach(item => {
    let { type, attributeName, oldValue = '', target, removedNodes } = item
    oldValue = oldValue || ''
    // const classNames = target.className || ''
    const classList = target.classList || []
    const targetClassSet = new Set(classList)
    // 监控水印的class是否被删除
    if (type === 'attributes' && attributeName === 'class') {
      const oldClassSet = new Set(oldValue.split(' '))
      if (
        oldClassSet.has('water-mark-container') &&
        !targetClassSet.has('water-mark-container')
      ) {
        targetClassSet.add('water-mark-container')
        target.className = [...targetClassSet].join(' ')
      }
      // 水印父节点的w-mark-ele class不能去掉，用于remove水印节点时重新生成水印
      if (oldClassSet.has('w-mark-ele') && !targetClassSet.has('w-mark-ele')) {
        targetClassSet.add('w-mark-ele')
        target.className = [...targetClassSet].join(' ')
      }
    }
    // 监控水印的样式是否被修改
    if (
      type === 'attributes' &&
      attributeName === 'style' &&
      targetClassSet.has('water-mark-container')
    ) {
      target.style.display = 'block'
      target.style.visibility = 'visible'
      target.style.backgroundImage = `url(${getCanvas()})`
    }
    // 监控水印dom是否被删除
    if (type === 'childList' && removedNodes.length) {
      const waterMarkElem = target.querySelector('.water-mark-container')
      if (!waterMarkElem && targetClassSet.has('w-mark-ele')) {
        addMark(target)
      }
    }
  })
}
const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserverde

const watermarkDom = new MutationObserver(callback)
const observeOpt = {
  childList: true,
  attributes: true,
  subtree: true,
  attributeFilter: ['style', 'class'],
  attributeOldValue: true
}

function getCanvas({ text = 'qiYuei', textColor = 'rgba(10,10,10,0.08)' }) {
  const _canvas = document.createElement('canvas')
  _canvas.width = 200
  _canvas.height = 150
  const cans = _canvas.getContext('2d')
  cans.rotate((-10 * Math.PI) / 180)
  cans.font = '16px Microsoft JhengHei'
  cans.fillStyle = textColor
  cans.textAlign = 'left'
  cans.textBaseline = 'middle'
  cans.fillText(text, 0, _canvas.height / 2)
  return _canvas.toDataURL('image/png')
}

const DEFAULT_OPT = {
  showMark: true, // 是否显示水印，默认为显示
  observe: true // 是否监测
}

const addMark = (el, selector, options) => {
  const markElem = el.querySelector('.water-mark-container')
  if (markElem) return
  const parentEl = selector ? el.querySelector(selector) : el
  parentEl.style.position = 'relative'
  const _div = document.createElement('div')
  _div.height = '100%'
  _div.className = 'water-mark-container'

  _div.style.backgroundImage = `url(${getCanvas(options)})`
  parentEl.appendChild(_div)
  // 添加dom变动观察
  if (options.observe) {
    watermarkDom.observe(parentEl, observeOpt)
  }
}

function removeMark(el) {
  // 停止观察dom变动
  watermarkDom.disconnect()
  // console.info('remove---', el)
  const markElem = el.querySelector('.water-mark-container')
  markElem && markElem.remove()
}

export default {
  inserted(el, binding) {
    let options = { ...DEFAULT_OPT }
    if (typeof binding.value === 'string') {
      options = { ...options, text: binding.value }
    } else {
      options = { ...options, ...binding.value }
    }
    // 格式 直接是string 或者是
    const className = `${el.className} w-mark-ele`
    el.className = className.trim()
    if (options.showMark) {
      addMark(el, options.selector, options)
    }
  },
  update(el, binding) {
    let options = { ...DEFAULT_OPT }
    if (typeof binding.value === 'string') {
      options = { ...options, text: binding.value }
    } else {
      options = { ...options, ...binding.value }
    }
    if (!options.showMark) {
      removeMark(el)
    } else {
      addMark(el, options.selector, options)
    }
  }
}
