/*!
 * @form-create/component-antdv-frame v3.1.30
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

var script$4 = {
  name: 'CloseCircleOutlined'
};

const _hoisted_1$4 = {
  class: "anticon"
};
const _hoisted_2$4 = /*#__PURE__*/createElementVNode("svg", {
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, [/*#__PURE__*/createElementVNode("path", {
  d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4l-66.1-.3c-4.4 0-8 3.5-8 8c0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4l66 .3c4.4 0 8-3.5 8-8c0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z",
  fill: "currentColor"
}), /*#__PURE__*/createElementVNode("path", {
  d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448s448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z",
  fill: "currentColor"
})], -1);
const _hoisted_3$4 = [_hoisted_2$4];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$4, _hoisted_3$4);
}

script$4.render = render$4;

var script$3 = {
  name: 'FolderOutlined'
};

const _hoisted_1$3 = {
  class: "anticon"
};
const _hoisted_2$3 = /*#__PURE__*/createElementVNode("svg", {
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, [/*#__PURE__*/createElementVNode("path", {
  d: "M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z",
  fill: "currentColor"
})], -1);
const _hoisted_3$3 = [_hoisted_2$3];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$3, _hoisted_3$3);
}

script$3.render = render$3;

var script$2 = {
  name: 'FileOutlined'
};

const _hoisted_1$2 = {
  class: "anticon"
};
const _hoisted_2$2 = /*#__PURE__*/createElementVNode("svg", {
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, [/*#__PURE__*/createElementVNode("path", {
  d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z",
  fill: "currentColor"
})], -1);
const _hoisted_3$2 = [_hoisted_2$2];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$2, _hoisted_3$2);
}

script$2.render = render$2;

var script$1 = {
  name: 'DeleteOutlined'
};

const _hoisted_1$1 = {
  class: "anticon"
};
const _hoisted_2$1 = /*#__PURE__*/createElementVNode("svg", {
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, [/*#__PURE__*/createElementVNode("path", {
  d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z",
  fill: "currentColor"
})], -1);
const _hoisted_3$1 = [_hoisted_2$1];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$1, _hoisted_3$1);
}

script$1.render = render$1;

var script = {
  name: 'EyeOutlined'
};

const _hoisted_1 = {
  class: "anticon"
};
const _hoisted_2 = /*#__PURE__*/createElementVNode("svg", {
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, [/*#__PURE__*/createElementVNode("path", {
  d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z",
  fill: "currentColor"
})], -1);
const _hoisted_3 = [_hoisted_2];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1, _hoisted_3);
}

script.render = render;

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

var css_248z = "._fc-frame ._fc-files img{display:inline-block;height:100%;vertical-align:top;width:100%}._fc-frame ._fc-upload-cover{background:rgba(0,0,0,.6);bottom:0;left:0;opacity:0;position:absolute;right:0;top:0;transition:opacity .3s}._fc-frame ._fc-upload-cover ._fc-frame-icon{color:#fff;font-size:16px;margin:0 2px}._fc-frame ._fc-files:hover ._fc-upload-cover{opacity:1}._fc-frame .anticon{font-size:16px;width:16px}._fc-frame .ant-upload{display:block}._fc-frame ._fc-frame-icon,._fc-frame ._fc-upload-btn{cursor:pointer}._fc-frame._fc-disabled ._fc-frame-icon,._fc-frame._fc-disabled ._fc-upload-btn{color:#999;cursor:not-allowed!important}._fc-files,._fc-frame ._fc-upload-btn{background:#fff;border:1px solid #c0ccda;border-radius:4px;box-shadow:2px 2px 5px rgba(0,0,0,.1);box-sizing:border-box;display:inline-block;height:104px;line-height:104px;margin-right:4px;overflow:hidden;position:relative;text-align:center;width:104px}";
styleInject(css_248z);

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
      default: 'FolderOutlined'
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
    FolderOutlined: script$3,
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
        addonAfter: () => createVNode(Type, {
          "class": "_fc-frame-icon",
          "onClick": this.showModal
        }, null)
      };
      if (this.fileList.length && !this.disabled) {
        slots.suffix = () => createVNode(script$4, {
          "class": "_fc-frame-icon",
          "onClick": () => {
            this.fileList = [];
            this.input();
          }
        }, null);
      }
      return createVNode(resolveComponent("AInput"), {
        "readonly": true,
        "value": this.fileList.map(v => this.getSrc(v)).toString(),
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
        return this.makeItem(index, [createVNode(script$2, {
          "class": "_fc-frame-icon",
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
    const aModal = resolveComponent('AModal');
    return createVNode("div", {
      "class": {
        '_fc-frame': true,
        '_fc-disabled': this.disabled
      }
    }, [Node, createVNode(aModal, mergeProps({
      "mask": this.previewMask,
      "title": modalTitle
    }, {
      [aModal && aModal.props.open ? 'open' : 'visible']: this.previewVisible
    }, {
      "onCancel": () => this.previewVisible = false,
      "footer": null
    }), {
      default: () => [createVNode("img", {
        "style": "width: 100%",
        "src": this.previewImage
      }, null)]
    }), createVNode(aModal, mergeProps({
      width,
      title,
      ...this.modal
    }, {
      [aModal && aModal.props.open ? 'open' : 'visible']: this.frameVisible
    }, {
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
