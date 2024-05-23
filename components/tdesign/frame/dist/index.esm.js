/*!
 * @form-create/component-tdesign-frame v3.1.30
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

var css_248z = "._fc-frame ._fc-files img{display:inline-block;height:100%;vertical-align:top;width:100%}._fc-frame ._fc-upload-cover{background:rgba(0,0,0,.6);bottom:0;left:0;opacity:0;position:absolute;right:0;top:0;transition:opacity .3s}._fc-frame ._fc-upload-cover ._fc-frame-icon{color:#fff;font-size:20px;margin:0 2px}._fc-frame ._fc-files:hover ._fc-upload-cover{opacity:1}._fc-frame .t-upload{display:block}._fc-frame ._fc-frame-icon,._fc-frame ._fc-upload-btn{cursor:pointer;font-size:20px;width:20px}._fc-frame._fc-disabled ._fc-frame-icon,._fc-frame._fc-disabled ._fc-upload-btn{color:#999;cursor:not-allowed!important}._fc-frame .t-input-adornment__append ._fc-frame-icon{margin:5px 12px 0}._fc-files,._fc-frame ._fc-upload-btn{background:#fff;border:1px solid #c0ccda;box-shadow:2px 2px 5px rgba(0,0,0,.1);box-sizing:border-box;display:inline-block;height:112px;line-height:112px;margin-right:4px;overflow:hidden;position:relative;text-align:center;width:112px}";
styleInject(css_248z);

var script$2 = {
  name: 'IconFolder'
};

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
};
const _hoisted_2$2 = /*#__PURE__*/createElementVNode("path", {
  d: "M26 20h-2v4h-4v2h4v4h2v-4h4v-2h-4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$2 = /*#__PURE__*/createElementVNode("path", {
  d: "M28 8H16l-3.4-3.4c-.4-.4-.9-.6-1.4-.6H4c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h14v-2H4V6h7.2l3.4 3.4l.6.6H28v8h2v-8c0-1.1-.9-2-2-2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4 = [_hoisted_2$2, _hoisted_3$2];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_4);
}

script$2.render = render$2;

var IconFile = defineComponent({
  name: 'IconFile',
  render() {
    return h('svg', {
      style: {
        width: '20px',
        fontSize: '20px'
      },
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

var script$1 = {
  name: 'DeleteOutlined'
};

const _hoisted_1$1 = {
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$1 = /*#__PURE__*/createElementVNode("path", {
  d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$1 = [_hoisted_2$1];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}

script$1.render = render$1;

var script = {
  name: 'EyeOutlined'
};

const _hoisted_1 = {
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
const _hoisted_2 = /*#__PURE__*/createElementVNode("path", {
  d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z",
  fill: "currentColor"
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
    IconFolder: script$2,
    EyeOutlined: script
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
      return createVNode(resolveComponent("t-input-adornment"), {
        "append": () => createVNode(Type, {
          "onClick": this.showModal,
          "class": "_fc-frame-icon"
        }, null)
      }, {
        default: () => [createVNode(resolveComponent("TInput"), {
          "readonly": true,
          "clearable": !this.disabled,
          "showClearIconOnEmpty": !this.disabled,
          "value": this.fileList.map(v => this.getSrc(v)).toString(),
          "onClear": () => {
            this.fileList = [];
            this.input();
          },
          "key": 1
        }, null)]
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
      const Type = resolveComponent(this.handleIcon === true || this.handleIcon === undefined ? 'EyeOutlined' : this.handleIcon);
      return createVNode(Type, {
        "class": "_fc-frame-icon",
        "onClick": () => this.handleClick(val),
        "key": '5' + index
      }, null);
    },
    makeRemoveIcon(val, index) {
      return createVNode(script$1, {
        "class": "_fc-frame-icon",
        "onClick": () => this.handleRemove(val),
        "key": '6' + index
      }, null);
    },
    makeFiles() {
      return this.makeGroup(this.fileList.map((src, index) => {
        return this.makeItem(index, [createVNode(IconFile, {
          "size": "20",
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
              if (!this.disabled) {
                this.$emit('update:modelValue', value);
                this.$emit('change', value);
              }
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
      if (closeBtn) node.push(createVNode(resolveComponent("TButton"), {
        "onClick": () => this.onCancel() !== false && this.closeModal(true)
      }, _isSlot(closeBtnText) ? closeBtnText : {
        default: () => [closeBtnText]
      }));
      if (okBtn) node.push(createVNode(resolveComponent("TButton"), {
        "theme": "primary",
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
    }, [Node, createVNode(resolveComponent("TDialog"), {
      "mask": this.previewMask,
      "header": modalTitle,
      "visible": this.previewVisible,
      "style": "width: 600px;",
      "attach": "body",
      "onUpdate:visible": n => this.previewVisible = n,
      "footer": false
    }, {
      default: () => [createVNode("img", {
        "style": "width: 100%",
        "src": this.previewImage,
        "key": 1
      }, null)]
    }), createVNode(resolveComponent("TDialog"), mergeProps({
      width,
      header: title,
      ...this.modal
    }, {
      "visible": this.frameVisible,
      "attach": "body",
      "style": {
        width
      },
      "onClose": () => this.frameVisible = false,
      "onConfirm": () => this.closeModal(true),
      "key": 2
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
