/*!
 * @form-create/component-elm-frame v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with frame
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FcFrame = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

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

    var css_248z = "._fc-frame ._fc-files img{display:inline-block;height:100%;vertical-align:top;width:100%}._fc-frame ._fc-upload-btn{border:1px dashed #c0ccda;cursor:pointer}._fc-frame._fc-disabled ._fc-upload-btn,._fc-frame._fc-disabled .el-button{color:#999;cursor:not-allowed!important}._fc-frame ._fc-upload-cover{background:rgba(0,0,0,.6);bottom:0;left:0;opacity:0;position:absolute;right:0;top:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;transition:opacity .3s}._fc-frame ._fc-upload-cover i{color:#fff;cursor:pointer;font-size:20px;margin:0 2px}._fc-frame ._fc-files:hover ._fc-upload-cover{opacity:1}._fc-frame .el-upload{display:block}._fc-frame ._fc-upload-icon{cursor:pointer}._fc-files,._fc-frame ._fc-upload-btn{background:#fff;border:1px solid #c0ccda;border-radius:4px;-webkit-box-shadow:2px 2px 5px rgba(0,0,0,.1);box-shadow:2px 2px 5px rgba(0,0,0,.1);-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;height:58px;line-height:58px;margin-right:4px;overflow:hidden;position:relative;text-align:center;width:58px}";
    styleInject(css_248z);

    var script$4 = {
      name: 'IconCircleClose'
    };

    const _hoisted_1$4 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$4 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M466.752 512l-90.496-90.496a32 32 0 0145.248-45.248L512 466.752l90.496-90.496a32 32 0 1145.248 45.248L557.248 512l90.496 90.496a32 32 0 11-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 01-45.248-45.248L466.752 512z"
    }, null, -1);
    const _hoisted_3$4 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
    }, null, -1);
    const _hoisted_4 = [_hoisted_2$4, _hoisted_3$4];
    function render$4(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$4, _hoisted_4);
    }

    script$4.render = render$4;

    var script$3 = {
      name: 'IconDocument'
    };

    const _hoisted_1$3 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$3 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 01-32 32H160a32 32 0 01-32-32V96a32 32 0 0132-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
    }, null, -1);
    const _hoisted_3$3 = [_hoisted_2$3];
    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
    }

    script$3.render = render$3;

    var script$2 = {
      name: 'IconDelete'
    };

    const _hoisted_1$2 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$2 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M160 256H96a32 32 0 010-64h256V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64h-64v672a32 32 0 01-32 32H192a32 32 0 01-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32zm192 0a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32z"
    }, null, -1);
    const _hoisted_3$2 = [_hoisted_2$2];
    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
    }

    script$2.render = render$2;

    var script$1 = {
      name: 'IconView'
    };

    const _hoisted_1$1 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$1 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
    }, null, -1);
    const _hoisted_3$1 = [_hoisted_2$1];
    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
    }

    script$1.render = render$1;

    var script = {
      name: 'IconFolderOpened'
    };

    const _hoisted_1 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M878.08 448H241.92l-96 384h636.16l96-384zM832 384v-64H485.76L357.504 192H128v448l57.92-231.744A32 32 0 01216.96 384H832zm-24.96 512H96a32 32 0 01-32-32V160a32 32 0 0132-32h287.872l128.384 128H864a32 32 0 0132 32v96h23.04a32 32 0 0131.04 39.744l-112 448A32 32 0 01807.04 896z"
    }, null, -1);
    const _hoisted_3 = [_hoisted_2];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1, _hoisted_3);
    }

    script.render = render;

    function _isSlot(s) {
      return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !vue.isVNode(s);
    }
    const NAME = 'fcFrame';
    var Frame = vue.defineComponent({
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
          default: 'IconFolderOpened'
        },
        width: {
          type: String,
          default: '500px'
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
        IconFolderOpened: script,
        IconView: script$1
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
          this.closeModel(true);
        },
        closeModel(close) {
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
        showModel() {
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
          return vue.createVNode(vue.resolveComponent("ElInput"), vue.mergeProps({
            type: 'text',
            modelValue: this.fileList.map(v => this.getSrc(v)).toString(),
            readonly: true
          }, {
            "key": 1
          }), {
            append: () => vue.createVNode(vue.resolveComponent("ElButton"), {
              "icon": vue.resolveComponent(this.icon),
              "onClick": () => this.showModel()
            }, null),
            suffix: () => this.fileList.length && !this.disabled ? vue.createVNode(vue.resolveComponent("ElIcon"), {
              "class": "el-input__icon _fc-upload-icon",
              "onClick": () => {
                this.fileList = [];
                this.input();
              }
            }, {
              default: () => [vue.createVNode(script$4, null, null)]
            }) : null
          });
        },
        makeGroup(children) {
          if (!this.maxLength || this.fileList.length < this.maxLength) {
            children.push(this.makeBtn());
          }
          return vue.createVNode("div", {
            "key": 2
          }, [children]);
        },
        makeItem(index, children) {
          return vue.createVNode("div", {
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
            if (this.type !== 'file' && this.handleIcon !== false || this.type === 'file' && this.handleIcon) {
              icons.push(this.makeHandleIcon(val, index));
            }
            if (this.allowRemove) {
              icons.push(this.makeRemoveIcon(val, index));
            }
            return vue.createVNode("div", {
              "class": "_fc-upload-cover",
              "key": 4
            }, [icons]);
          }
        },
        makeHandleIcon(val, index) {
          const Type = vue.resolveComponent(this.handleIcon === true || this.handleIcon === undefined ? 'icon-view' : this.handleIcon);
          return vue.createVNode(vue.resolveComponent("ElIcon"), {
            "onClick": () => this.handleClick(val),
            "key": '5' + index
          }, {
            default: () => [vue.createVNode(Type, null, null)]
          });
        },
        makeRemoveIcon(val, index) {
          return vue.createVNode(vue.resolveComponent("ElIcon"), {
            "onClick": () => this.handleRemove(val),
            "key": '6' + index
          }, {
            default: () => [vue.createVNode(script$2, null, null)]
          });
        },
        makeFiles() {
          return this.makeGroup(this.fileList.map((src, index) => {
            return this.makeItem(index, [vue.createVNode(vue.resolveComponent("ElIcon"), {
              "onClick": () => this.handleClick(src)
            }, {
              default: () => [vue.createVNode(script$3, null, null)]
            }), this.makeIcons(src, index)]);
          }));
        },
        makeImages() {
          return this.makeGroup(this.fileList.map((src, index) => {
            return this.makeItem(index, [vue.createVNode("img", {
              "src": this.getSrc(src)
            }, null), this.makeIcons(src, index)]);
          }));
        },
        makeBtn() {
          const Type = vue.resolveComponent(this.icon);
          return vue.createVNode("div", {
            "class": "_fc-upload-btn",
            "onClick": () => this.showModel(),
            "key": 7
          }, [vue.createVNode(vue.resolveComponent("ElIcon"), null, {
            default: () => [vue.createVNode(Type, null, null)]
          })]);
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
          if (this.disabled) {
            return;
          }
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
                  this.closeModel();
                },
                set: (field, value) => {
                  this.valid(field);
                  !this.disabled && this.$emit('update:modelValue', value);
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
          if (!footer) {
            return;
          }
          return vue.createVNode("div", null, [closeBtn ? vue.createVNode(vue.resolveComponent("ElButton"), {
            "onClick": () => this.onCancel() !== false && (this.frameVisible = false)
          }, _isSlot(closeBtnText) ? closeBtnText : {
            default: () => [closeBtnText]
          }) : null, okBtn ? vue.createVNode(vue.resolveComponent("ElButton"), {
            "type": "primary",
            "onClick": () => this.onOk() !== false && this.closeModel()
          }, _isSlot(okBtnText) ? okBtnText : {
            default: () => [okBtnText]
          }) : null]);
        }
      },
      render() {
        const type = this.type;
        let node;
        if (type === 'input') {
          node = this.makeInput();
        } else if (type === 'image') {
          node = this.makeImages();
        } else {
          node = this.makeFiles();
        }
        const {
          width = '30%',
          height,
          src,
          title,
          modalTitle
        } = this.$props;
        vue.nextTick(() => {
          if (this.$refs.frame) {
            this.frameLoad(this.$refs.frame.contentWindow || {});
          }
        });
        return vue.createVNode("div", {
          "class": {
            '_fc-frame': true,
            '_fc-disabled': this.disabled
          }
        }, [node, vue.createVNode(vue.resolveComponent("ElDialog"), {
          "appendToBody": true,
          "modal": this.previewMask,
          "title": modalTitle,
          "modelValue": this.previewVisible,
          "onClose": this.handleCancel
        }, {
          default: () => [vue.createVNode("img", {
            "style": "width: 100%",
            "src": this.previewImage
          }, null)]
        }), vue.createVNode(vue.resolveComponent("ElDialog"), vue.mergeProps({
          "appendToBody": true
        }, {
          width,
          title,
          ...this.modal
        }, {
          "modelValue": this.frameVisible,
          "onClose": () => this.closeModel(true)
        }), {
          default: () => [this.frameVisible || !this.reload ? vue.createVNode("iframe", {
            "ref": "frame",
            "src": src,
            "frameBorder": "0",
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

    exports["default"] = Frame;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
