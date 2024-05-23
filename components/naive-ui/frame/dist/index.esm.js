/*!
 * @form-create/component-naive-frame v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with frame
 * Released under the MIT License.
 */
import { openBlock, createElementBlock, createElementVNode, defineComponent, h, resolveComponent, createVNode, nextTick, mergeProps, isVNode } from 'vue';

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

var css_248z = "._fc-frame ._fc-files img{display:inline-block;height:100%;vertical-align:top;width:100%}._fc-frame ._fc-upload-cover{background:rgba(0,0,0,.6);bottom:0;left:0;opacity:0;position:absolute;right:0;top:0;transition:opacity .3s}._fc-frame ._fc-upload-cover ._fc-frame-icon{color:#fff;cursor:pointer;font-size:16px;margin:0 2px}._fc-frame ._fc-files:hover ._fc-upload-cover{opacity:1}._fc-frame .ant-upload{display:block}._fc-frame ._fc-frame-icon,._fc-frame ._fc-upload-btn{cursor:pointer}._fc-frame._fc-disabled ._fc-frame-icon,._fc-frame._fc-disabled ._fc-upload-btn{color:#999;cursor:not-allowed!important}._fc-files,._fc-frame ._fc-upload-btn{background:#fff;border:1px solid #c0ccda;border-radius:4px;box-shadow:2px 2px 5px rgba(0,0,0,.1);box-sizing:border-box;display:inline-block;height:96px;line-height:96px;margin-right:8px;overflow:hidden;position:relative;text-align:center;width:96px}._fc-frame ._fc-upload-cover .n-icon{color:#fff;cursor:pointer;font-size:20px;margin:0 2px}";
styleInject(css_248z);

var script = {
  name: 'IconFolder'
};

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
};
const _hoisted_2 = /*#__PURE__*/createElementVNode("path", {
  d: "M26 20h-2v4h-4v2h4v4h2v-4h4v-2h-4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3 = /*#__PURE__*/createElementVNode("path", {
  d: "M28 8H16l-3.4-3.4c-.4-.4-.9-.6-1.4-.6H4c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h14v-2H4V6h7.2l3.4 3.4l.6.6H28v8h2v-8c0-1.1-.9-2-2-2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4 = [_hoisted_2, _hoisted_3];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}

script.render = render;

var IconClose = defineComponent({
  name: 'IconClose',
  render() {
    return h('svg', {
      viewBox: '0 0 12 12',
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': true
    }, h('g', {
      stroke: 'none',
      'stroke-width': '1',
      fill: 'none',
      'fill-rule': 'evenodd'
    }, h('g', {
      fill: 'currentColor',
      'fill-rule': 'nonzero'
    }, h('path', {
      d: 'M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z'
    }))));
  }
});

var IconFile = defineComponent({
  name: 'IconFile',
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg'
    }, h('g', {
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, h('path', {
      d: 'M14 3v4a1 1 0 0 0 1 1h4'
    }), h('path', {
      d: 'M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z'
    })));
  }
});

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
      default: '500px'
    },
    height: {
      type: [Number, String],
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
    IconFolder: script
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
    key(unique) {
      return unique;
    },
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
      const slots = {};
      if (this.fileList.length && !this.disabled) {
        slots.suffix = () => createVNode(resolveComponent("n-icon"), {
          "component": IconClose,
          "class": "_fc-frame-icon",
          "onClick": () => {
            this.fileList = [];
            this.input();
          }
        }, null);
      }
      return createVNode(resolveComponent("n-input-group"), null, {
        default: () => [createVNode(resolveComponent("NInput"), {
          "readonly": true,
          "value": this.fileList.map(v => this.getSrc(v)).toString(),
          "key": 1
        }, slots), createVNode(resolveComponent("n-input-group-label"), {
          "onClick": this.showModal,
          "class": "_fc-frame-icon"
        }, {
          default: () => [createVNode(resolveComponent("n-icon"), {
            "component": Type
          }, null)]
        })]
      });
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
      return createVNode(resolveComponent("n-icon"), {
        "size": 20,
        "component": Type,
        "onClick": () => this.handleClick(val),
        "key": '5' + index
      }, null);
    },
    makeRemoveIcon(val, index) {
      return createVNode(resolveComponent("n-icon"), {
        "size": 20,
        "component": resolveComponent('icon-trash'),
        "onClick": () => this.handleRemove(val),
        "key": '6' + index
      }, null);
    },
    makeFiles() {
      return this.makeGroup(this.fileList.map((src, index) => {
        return this.makeItem(index, [createVNode(resolveComponent("n-icon"), {
          "component": IconFile,
          "size": 20,
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
      }, [createVNode(resolveComponent("n-icon"), {
        "component": Type,
        "size": 20,
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
      if (closeBtn) node.push(createVNode(resolveComponent("NButton"), {
        "onClick": () => this.onCancel() !== false && this.closeModal(true)
      }, _isSlot(closeBtnText) ? closeBtnText : {
        default: () => [closeBtnText]
      }));
      if (okBtn) node.push(createVNode(resolveComponent("NButton"), {
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
    }, [Node, createVNode(resolveComponent("nModal"), {
      "preset": 'card',
      "mask": this.previewMask,
      "title": modalTitle,
      "show": this.previewVisible,
      "style": "width: 600px;",
      "onUpdate:show": n => this.previewVisible = n
    }, {
      default: () => [createVNode("img", {
        "style": "width: 100%",
        "src": this.previewImage
      }, null)]
    }), createVNode(resolveComponent("nModal"), mergeProps({
      "preset": 'dialog'
    }, {
      width,
      title,
      ...this.modal
    }, {
      "show": this.frameVisible,
      "style": {
        width
      },
      "onUpdate:show": () => this.closeModal(true)
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
      action: () => this.makeFooter()
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
