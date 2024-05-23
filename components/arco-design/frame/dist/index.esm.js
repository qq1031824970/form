/*!
 * @form-create/component-arco-frame v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with frame
 * Released under the MIT License.
 */
import { openBlock, createElementBlock, createElementVNode, defineComponent, resolveComponent, createVNode, nextTick, mergeProps, isVNode } from 'vue';

function toArray(value) {
  return Array.isArray(value) ? value : [null, undefined, ''].indexOf(value) > -1 ? [] : [value];
}

// https://github.com/developit/mitt

function Mitt(all) {
  all = all || new Map();
  const mitt = {
    $on(type, handler) {
      const handlers = all.get(type);
      const added = handlers && handlers.push(handler);
      if (!added) {
        all.set(type, [handler]);
      }
    },
    $once(type, handler) {
      handler._once = true;
      mitt.$on(type, handler);
    },
    $off(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    $emit(type, ...args) {
      (all.get(type) || []).slice().map(handler => {
        if (handler._once) {
          mitt.$off(type, handler);
          delete handler._once;
        }
        handler(...args);
      });
      (all.get('*') || []).slice().map(handler => {
        handler(type, args);
      });
    }
  };
  return mitt;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "._fc-frame ._fc-files img{display:inline-block;height:100%;vertical-align:top;width:100%}._fc-frame ._fc-upload-cover{background:rgba(0,0,0,.6);bottom:0;left:0;opacity:0;position:absolute;right:0;top:0;transition:opacity .3s}._fc-frame ._fc-upload-cover ._fc-frame-icon{color:#fff;font-size:16px;margin:0 2px}._fc-frame ._fc-files:hover ._fc-upload-cover{opacity:1}._fc-frame .ant-upload{display:block}._fc-frame ._fc-frame-icon,._fc-frame ._fc-upload-btn{cursor:pointer}._fc-frame._fc-disabled ._fc-frame-icon,._fc-frame._fc-disabled ._fc-upload-btn{color:#999;cursor:not-allowed!important}._fc-files,._fc-frame ._fc-upload-btn{background:#fff;border:1px solid #c0ccda;border-radius:4px;box-shadow:2px 2px 5px rgba(0,0,0,.1);box-sizing:border-box;display:inline-block;height:80px;line-height:80px;margin-right:8px;overflow:hidden;position:relative;text-align:center;width:80px}._fc-frame ._fc-upload-cover svg{color:#fff;cursor:pointer;font-size:20px;margin:0 2px}";
styleInject(css_248z);

var script$4 = {
  name: 'IconFolder'
};

const _hoisted_1$4 = {
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "currentColor",
  class: "arco-icon arco-icon-folder",
  "stroke-width": "4",
  "stroke-linecap": "butt",
  "stroke-linejoin": "miter"
};
const _hoisted_2$4 = /*#__PURE__*/createElementVNode("path", {
  d: "M6 13h18l-2.527-3.557a1.077 1.077 0 0 0-.88-.443H7.06C6.474 9 6 9.448 6 10v3Zm0 0h33.882c1.17 0 2.118.895 2.118 2v21c0 1.105-.948 3-2.118 3H8.118C6.948 39 6 38.105 6 37V13Z"
}, null, -1);
const _hoisted_3$4 = [_hoisted_2$4];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_3$4);
}

script$4.render = render$4;

var script$3 = {
  name: 'IconDelete'
};

const _hoisted_1$3 = {
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "currentColor",
  class: "arco-icon arco-icon-delete",
  "stroke-width": "4",
  "stroke-linecap": "butt",
  "stroke-linejoin": "miter"
};
const _hoisted_2$3 = /*#__PURE__*/createElementVNode("path", {
  d: "M5 11h5.5m0 0v29a1 1 0 0 0 1 1h25a1 1 0 0 0 1-1V11m-27 0H16m21.5 0H43m-5.5 0H32m-16 0V7h16v4m-16 0h16M20 18v15m8-15v15"
}, null, -1);
const _hoisted_3$3 = [_hoisted_2$3];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
}

script$3.render = render$3;

var script$2 = {
  name: 'IconCloseCircle'
};

const _hoisted_1$2 = {
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "currentColor",
  class: "arco-icon arco-icon-close-circle",
  "stroke-width": "4",
  "stroke-linecap": "butt",
  "stroke-linejoin": "miter"
};
const _hoisted_2$2 = /*#__PURE__*/createElementVNode("path", {
  d: "m17.643 17.643 6.364 6.364m0 0 6.364 6.364m-6.364-6.364 6.364-6.364m-6.364 6.364-6.364 6.364M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z"
}, null, -1);
const _hoisted_3$2 = [_hoisted_2$2];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
}

script$2.render = render$2;

var script$1 = {
  name: 'IconEye'
};

const _hoisted_1$1 = {
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "currentColor",
  class: "arco-icon arco-icon-eye",
  "stroke-width": "4",
  "stroke-linecap": "butt",
  "stroke-linejoin": "miter"
};
const _hoisted_2$1 = /*#__PURE__*/createElementVNode("path", {
  "clip-rule": "evenodd",
  d: "M24 37c6.627 0 12.627-4.333 18-13-5.373-8.667-11.373-13-18-13-6.627 0-12.627 4.333-18 13 5.373 8.667 11.373 13 18 13Z"
}, null, -1);
const _hoisted_3$1 = /*#__PURE__*/createElementVNode("path", {
  d: "M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
}, null, -1);
const _hoisted_4 = [_hoisted_2$1, _hoisted_3$1];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_4);
}

script$1.render = render$1;

var script = {
  name: 'IconFile'
};

const _hoisted_1 = {
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "currentColor",
  class: "arco-icon arco-icon-file",
  "stroke-width": "4",
  "stroke-linecap": "butt",
  "stroke-linejoin": "miter"
};
const _hoisted_2 = /*#__PURE__*/createElementVNode("path", {
  d: "M16 21h16m-16 8h10m11 13H11a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h21l7 7v27a2 2 0 0 1-2 2Z"
}, null, -1);
const _hoisted_3 = [_hoisted_2];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}

script.render = render;

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}
const NAME = 'fcFrame';
var Frame = defineComponent({
  name: NAME,
  props: {
    type: {
      type: String,
      default: 'input'
    },
    field: String,
    helper: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'icon-folder'
    },
    width: {
      type: [Number, String],
      default: 500
    },
    height: {
      type: String,
      default: '370px'
    },
    maxLength: {
      type: Number,
      default: 0
    },
    okBtnText: {
      type: String,
      default: '确定'
    },
    closeBtnText: {
      type: String,
      default: '关闭'
    },
    modalTitle: String,
    handleIcon: {
      type: [String, Boolean],
      default: undefined
    },
    title: String,
    allowRemove: {
      type: Boolean,
      default: true
    },
    onOpen: {
      type: Function,
      default: () => {}
    },
    onOk: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    onLoad: {
      type: Function,
      default: () => {}
    },
    onBeforeRemove: {
      type: Function,
      default: () => {}
    },
    onRemove: {
      type: Function,
      default: () => {}
    },
    onHandle: Function,
    modal: {
      type: Object,
      default: () => ({})
    },
    srcKey: [String, Number],
    modelValue: [Array, String, Number, Object],
    previewMask: undefined,
    footer: {
      type: Boolean,
      default: true
    },
    reload: {
      type: Boolean,
      default: true
    },
    closeBtn: {
      type: Boolean,
      default: true
    },
    okBtn: {
      type: Boolean,
      default: true
    },
    formCreateInject: Object
  },
  emits: ['update:modelValue', 'change'],
  components: {
    IconFolder: script$4,
    IconEye: script$1
  },
  data() {
    return {
      fileList: toArray(this.modelValue),
      previewVisible: false,
      frameVisible: false,
      previewImage: '',
      bus: new Mitt()
    };
  },
  watch: {
    modelValue(n) {
      this.fileList = toArray(n);
    }
  },
  methods: {
    close() {
      this.closeModal(true);
    },
    closeModal(close) {
      this.bus.$emit(close ? '$close' : '$ok');
      if (this.reload) {
        this.bus.$off('$ok');
        this.bus.$off('$close');
      }
      this.frameVisible = false;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    showModal() {
      if (this.disabled || false === this.onOpen()) {
        return;
      }
      this.frameVisible = true;
    },
    input() {
      const n = this.fileList;
      const val = this.maxLength === 1 ? n[0] || '' : n;
      this.$emit('update:modelValue', val);
      this.$emit('change', val);
    },
    makeInput() {
      const Type = resolveComponent(this.icon);
      const slots = {
        append: () => createVNode(Type, {
          "class": "_fc-frame-icon",
          "onClick": this.showModal
        }, null)
      };
      if (this.fileList.length && !this.disabled) {
        slots.suffix = () => createVNode(script$2, {
          "class": "_fc-frame-icon",
          "onClick": () => {
            this.fileList = [];
            this.input();
          }
        }, null);
      }
      return createVNode(resolveComponent("AInput"), {
        "readonly": true,
        "modelValue": this.fileList.map(v => this.getSrc(v)).toString(),
        "key": 1
      }, slots);
    },
    makeGroup(children) {
      if (!this.maxLength || this.fileList.length < this.maxLength) children.push(this.makeBtn());
      return createVNode("div", {
        "key": 2
      }, [children]);
    },
    makeItem(index, children) {
      return createVNode("div", {
        "class": "_fc-files",
        "key": '3' + index
      }, [children]);
    },
    valid(f) {
      const field = this.formCreateInject.field || this.field;
      if (field && f !== field) {
        throw new Error('[frame]无效的字段值');
      }
    },
    makeIcons(val, index) {
      if (this.handleIcon !== false || this.allowRemove === true) {
        const icons = [];
        if (this.type !== 'file' && this.handleIcon !== false || this.type === 'file' && this.handleIcon) icons.push(this.makeHandleIcon(val, index));
        if (this.allowRemove) icons.push(this.makeRemoveIcon(val, index));
        return createVNode("div", {
          "class": "_fc-upload-cover",
          "key": 4
        }, [icons]);
      }
    },
    makeHandleIcon(val, index) {
      const Type = resolveComponent(this.handleIcon === true || this.handleIcon === undefined ? 'icon-eye' : this.handleIcon);
      return createVNode(Type, {
        "onClick": () => this.handleClick(val),
        "key": '5' + index
      }, null);
    },
    makeRemoveIcon(val, index) {
      return createVNode(script$3, {
        "onClick": () => this.handleRemove(val),
        "key": '6' + index
      }, null);
    },
    makeFiles() {
      return this.makeGroup(this.fileList.map((src, index) => {
        return this.makeItem(index, [createVNode(script, {
          "onClick": () => this.handleClick(src)
        }, null), this.makeIcons(src, index)]);
      }));
    },
    makeImages() {
      return this.makeGroup(this.fileList.map((src, index) => {
        return this.makeItem(index, [createVNode("img", {
          "src": this.getSrc(src)
        }, null), this.makeIcons(src, index)]);
      }));
    },
    makeBtn() {
      const Type = resolveComponent(this.icon);
      return createVNode("div", {
        "class": "_fc-upload-btn",
        "onClick": () => this.showModal(),
        "key": 7
      }, [createVNode(Type, {
        "class": "_fc-frame-icon"
      }, null)]);
    },
    handleClick(src) {
      if (this.onHandle) {
        return this.onHandle(src);
      } else {
        this.previewImage = this.getSrc(src);
        this.previewVisible = true;
      }
    },
    handleRemove(src) {
      if (this.disabled) return;
      if (false !== this.onBeforeRemove(src)) {
        this.fileList.splice(this.fileList.indexOf(src), 1);
        this.input();
        this.onRemove(src);
      }
    },
    getSrc(src) {
      return !this.srcKey ? src : src[this.srcKey];
    },
    frameLoad(iframe) {
      this.onLoad(iframe);
      try {
        if (this.helper === true) {
          iframe['form_create_helper'] = {
            api: this.formCreateInject.api,
            close: field => {
              this.valid(field);
              this.closeModal();
            },
            set: (field, value) => {
              this.valid(field);
              if (!this.disabled) this.$emit('update:modelValue', value);
            },
            get: field => {
              this.valid(field);
              return this.modelValue;
            },
            onOk: fn => this.bus.$on('$ok', fn),
            onClose: fn => this.bus.$on('$close', fn)
          };
        }
      } catch (e) {
        console.error(e);
      }
    },
    makeFooter() {
      const {
        okBtnText,
        closeBtnText,
        closeBtn,
        okBtn,
        footer
      } = this.$props;
      const node = [];
      if (!footer) return node;
      if (closeBtn) node.push(createVNode(resolveComponent("AButton"), {
        "onClick": () => this.onCancel() !== false && this.closeModal(true)
      }, _isSlot(closeBtnText) ? closeBtnText : {
        default: () => [closeBtnText]
      }));
      if (okBtn) node.push(createVNode(resolveComponent("AButton"), {
        "type": "primary",
        "onClick": () => this.onOk() !== false && this.closeModal()
      }, _isSlot(okBtnText) ? okBtnText : {
        default: () => [okBtnText]
      }));
      return node;
    }
  },
  render() {
    const type = this.type;
    let Node;
    if (type === 'input') Node = this.makeInput();else if (type === 'image') Node = this.makeImages();else Node = this.makeFiles();
    const {
      width = '30%',
      height,
      src,
      title,
      modalTitle
    } = this.$props;
    nextTick(() => {
      if (this.$refs.frame) {
        this.frameLoad(this.$refs.frame.contentWindow || {});
      }
    });
    return createVNode("div", {
      "class": {
        '_fc-frame': true,
        '_fc-disabled': this.disabled
      }
    }, [Node, createVNode(resolveComponent("aModal"), {
      "mask": this.previewMask,
      "title": modalTitle,
      "visible": this.previewVisible,
      "onCancel": () => this.previewVisible = false,
      "footer": null
    }, {
      default: () => [createVNode("img", {
        "style": "width: 100%",
        "src": this.previewImage
      }, null)]
    }), createVNode(resolveComponent("aModal"), mergeProps({
      width,
      title,
      ...this.modal
    }, {
      "visible": this.frameVisible,
      "onCancel": () => this.closeModal(true)
    }), {
      default: () => [this.frameVisible || !this.reload ? createVNode("iframe", {
        "ref": "frame",
        "src": src,
        "frameborder": "0",
        "style": {
          height,
          'border': '0 none',
          'width': '100%'
        }
      }, null) : null],
      footer: () => this.makeFooter()
    })]);
  },
  beforeMount() {
    const {
      name,
      field,
      api
    } = this.formCreateInject;
    name && api.on('fc:closeModal:' + name, this.close);
    field && api.on('fc:closeModal:' + field, this.close);
  },
  beforeUnmount() {
    const {
      name,
      field,
      api
    } = this.formCreateInject;
    name && api.off('fc:closeModal:' + name, this.close);
    field && api.off('fc:closeModal:' + field, this.close);
  }
});

export { Frame as default };
