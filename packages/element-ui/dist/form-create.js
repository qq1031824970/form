/*!
 * @form-create/element-ui v3.1.32
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.formCreate = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    function getSlot(slots, exclude) {
      return Object.keys(slots).reduce((lst, name) => {
        if (!exclude || exclude.indexOf(name) === -1) {
          lst.push(slots[name]);
        }
        return lst;
      }, []);
    }

    function toArray(value) {
      return Array.isArray(value) ? value : [null, undefined, ''].indexOf(value) > -1 ? [] : [value];
    }

    const NAME$9 = 'fcCheckbox';
    var Checkbox = vue.defineComponent({
      name: NAME$9,
      inheritAttrs: false,
      props: {
        formCreateInject: Object,
        modelValue: {
          type: Array,
          default: () => []
        },
        type: String,
        input: Boolean,
        inputValue: String
      },
      emits: ['update:modelValue', 'fc.el'],
      setup(props, _) {
        const options = vue.toRef(props.formCreateInject, 'options', []);
        const value = vue.toRef(props, 'modelValue');
        const inputValue = vue.toRef(props, 'inputValue', '');
        const customValue = vue.ref(inputValue.value);
        const input = vue.toRef(props, 'input', false);
        const updateCustomValue = n => {
          const _value = [...toArray(value.value)];
          const idx = _value.indexOf(customValue.value);
          customValue.value = n;
          if (idx > -1) {
            _value.splice(idx, 1);
            _value.push(n);
            onInput(_value);
          }
        };
        vue.watch(inputValue, n => {
          if (!input.value) {
            customValue.value = n;
            return undefined;
          }
          updateCustomValue(n);
        });
        const _options = () => {
          return Array.isArray(options.value) ? options.value : [];
        };
        const onInput = n => {
          _.emit('update:modelValue', n);
        };
        return {
          options: _options,
          value,
          onInput,
          updateCustomValue,
          makeInput(Type) {
            if (!input.value) {
              return undefined;
            }
            return vue.createVNode(Type, {
              "value": customValue.value,
              "label": customValue.value
            }, {
              default: () => [vue.createVNode(vue.resolveComponent("ElInput"), {
                "modelValue": customValue.value,
                "onUpdate:modelValue": updateCustomValue
              }, null)]
            });
          }
        };
      },
      render() {
        var _this$$slots$default, _this$$slots;
        const name = this.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox';
        const Type = vue.resolveComponent(name);
        return vue.createVNode(vue.resolveComponent("ElCheckboxGroup"), vue.mergeProps(this.$attrs, {
          "modelValue": this.value,
          "onUpdate:modelValue": this.onInput,
          "ref": "el"
        }), {
          default: () => [this.options().map((opt, index) => {
            const props = {
              ...opt
            };
            const value = props.value;
            const label = props.label;
            delete props.value;
            delete props.label;
            return vue.createVNode(Type, vue.mergeProps(props, {
              "label": value,
              "value": value,
              "key": name + index + '-' + value
            }), {
              default: () => [label || value || '']
            });
          }), (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots), this.makeInput(Type)],
          ...getSlot(this.$slots, ['default'])
        });
      },
      mounted() {
        this.$emit('fc.el', this.$refs.el);
      }
    });

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

    var css_248z$3 = "._fc-frame ._fc-files img{display:inline-block;height:100%;vertical-align:top;width:100%}._fc-frame ._fc-upload-btn{border:1px dashed #c0ccda;cursor:pointer}._fc-frame._fc-disabled ._fc-upload-btn,._fc-frame._fc-disabled .el-button{color:#999;cursor:not-allowed!important}._fc-frame ._fc-upload-cover{background:rgba(0,0,0,.6);bottom:0;left:0;opacity:0;position:absolute;right:0;top:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;transition:opacity .3s}._fc-frame ._fc-upload-cover i{color:#fff;cursor:pointer;font-size:20px;margin:0 2px}._fc-frame ._fc-files:hover ._fc-upload-cover{opacity:1}._fc-frame .el-upload{display:block}._fc-frame ._fc-upload-icon{cursor:pointer}._fc-files,._fc-frame ._fc-upload-btn{background:#fff;border:1px solid #c0ccda;border-radius:4px;-webkit-box-shadow:2px 2px 5px rgba(0,0,0,.1);box-shadow:2px 2px 5px rgba(0,0,0,.1);-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;height:58px;line-height:58px;margin-right:4px;overflow:hidden;position:relative;text-align:center;width:58px}";
    styleInject(css_248z$3);

    var script$6 = {
      name: 'IconCircleClose'
    };

    const _hoisted_1$6 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$6 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M466.752 512l-90.496-90.496a32 32 0 0145.248-45.248L512 466.752l90.496-90.496a32 32 0 1145.248 45.248L557.248 512l90.496 90.496a32 32 0 11-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 01-45.248-45.248L466.752 512z"
    }, null, -1);
    const _hoisted_3$6 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
    }, null, -1);
    const _hoisted_4 = [_hoisted_2$6, _hoisted_3$6];
    function render$6(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$6, _hoisted_4);
    }

    script$6.render = render$6;

    var script$5 = {
      name: 'IconDocument'
    };

    const _hoisted_1$5 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$5 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 01-32 32H160a32 32 0 01-32-32V96a32 32 0 0132-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
    }, null, -1);
    const _hoisted_3$5 = [_hoisted_2$5];
    function render$5(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$5, _hoisted_3$5);
    }

    script$5.render = render$5;

    var script$4 = {
      name: 'IconDelete'
    };

    const _hoisted_1$4 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$4 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M160 256H96a32 32 0 010-64h256V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64h-64v672a32 32 0 01-32 32H192a32 32 0 01-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32zm192 0a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32z"
    }, null, -1);
    const _hoisted_3$4 = [_hoisted_2$4];
    function render$4(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$4, _hoisted_3$4);
    }

    script$4.render = render$4;

    var script$3 = {
      name: 'IconView'
    };

    const _hoisted_1$3 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$3 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
    }, null, -1);
    const _hoisted_3$3 = [_hoisted_2$3];
    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
    }

    script$3.render = render$3;

    var script$2 = {
      name: 'IconFolderOpened'
    };

    const _hoisted_1$2 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$2 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M878.08 448H241.92l-96 384h636.16l96-384zM832 384v-64H485.76L357.504 192H128v448l57.92-231.744A32 32 0 01216.96 384H832zm-24.96 512H96a32 32 0 01-32-32V160a32 32 0 0132-32h287.872l128.384 128H864a32 32 0 0132 32v96h23.04a32 32 0 0131.04 39.744l-112 448A32 32 0 01807.04 896z"
    }, null, -1);
    const _hoisted_3$2 = [_hoisted_2$2];
    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
    }

    script$2.render = render$2;

    function _isSlot(s) {
      return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !vue.isVNode(s);
    }
    const NAME$8 = 'fcFrame';
    var Frame = vue.defineComponent({
      name: NAME$8,
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
        IconFolderOpened: script$2,
        IconView: script$3
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
              default: () => [vue.createVNode(script$6, null, null)]
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
            default: () => [vue.createVNode(script$4, null, null)]
          });
        },
        makeFiles() {
          return this.makeGroup(this.fileList.map((src, index) => {
            return this.makeItem(index, [vue.createVNode(vue.resolveComponent("ElIcon"), {
              "onClick": () => this.handleClick(src)
            }, {
              default: () => [vue.createVNode(script$5, null, null)]
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

    const NAME$7 = 'fcRadio';
    var Radio = vue.defineComponent({
      name: NAME$7,
      inheritAttrs: false,
      props: {
        formCreateInject: Object,
        modelValue: {
          type: [String, Number, Boolean],
          default: ''
        },
        type: String,
        input: Boolean,
        inputValue: String
      },
      emits: ['update:modelValue', 'fc.el'],
      setup(props, _) {
        const options = vue.toRef(props.formCreateInject, 'options', []);
        const value = vue.toRef(props, 'modelValue');
        const inputValue = vue.toRef(props, 'inputValue', '');
        const customValue = vue.ref(inputValue.value);
        const input = vue.toRef(props, 'input', false);
        const _options = () => {
          return Array.isArray(options.value) ? options.value : [];
        };
        vue.watch(inputValue, n => {
          if (!input.value) {
            customValue.value = n;
            return undefined;
          }
          updateCustomValue(n);
        });
        const onInput = n => {
          _.emit('update:modelValue', n);
        };
        const updateCustomValue = n => {
          const o = customValue.value;
          customValue.value = n;
          if (value.value === o) {
            onInput(n);
          }
        };
        return {
          options: _options,
          value,
          onInput,
          updateCustomValue,
          customValue,
          makeInput(Type) {
            if (!input.value) {
              return undefined;
            }
            return vue.createVNode(Type, {
              "value": customValue.value,
              "label": customValue.value
            }, {
              default: () => [vue.createVNode(vue.resolveComponent("ElInput"), {
                "modelValue": customValue.value,
                "onUpdate:modelValue": updateCustomValue
              }, null)]
            });
          }
        };
      },
      render() {
        var _this$$slots$default, _this$$slots;
        const name = this.type === 'button' ? 'ElRadioButton' : 'ElRadio';
        const Type = vue.resolveComponent(name);
        return vue.createVNode(vue.resolveComponent("ElRadioGroup"), vue.mergeProps(this.$attrs, {
          "modelValue": this.value,
          "onUpdate:modelValue": this.onInput,
          "ref": "el"
        }), {
          default: () => [this.options().map((opt, index) => {
            const props = {
              ...opt
            };
            const value = props.value;
            const label = props.label;
            delete props.value;
            delete props.label;
            return vue.createVNode(Type, vue.mergeProps(props, {
              "label": value,
              "value": value,
              "key": name + index + '-' + value
            }), {
              default: () => [label || value || '']
            });
          }), (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots), this.makeInput(Type)],
          ...getSlot(this.$slots, ['default'])
        });
      },
      mounted() {
        this.$emit('fc.el', this.$refs.el);
      }
    });

    const is = {
      type(arg, type) {
        return Object.prototype.toString.call(arg) === '[object ' + type + ']';
      },
      Undef(v) {
        return v === undefined || v === null;
      },
      Element(arg) {
        return typeof arg === 'object' && arg !== null && arg.nodeType === 1 && !is.Object(arg);
      },
      trueArray(data) {
        return Array.isArray(data) && data.length > 0;
      },
      Function(v) {
        const type = this.getType(v);
        return type === 'Function' || type === 'AsyncFunction';
      },
      getType(v) {
        const str = Object.prototype.toString.call(v);
        return /^\[object (.*)\]$/.exec(str)[1];
      },
      empty(value) {
        if (value === undefined || value === null) {
          return true;
        }
        if (Array.isArray(value) && Array.isArray(value) && !value.length) {
          return true;
        }
        return typeof value === 'string' && !value;
      }
    };
    ['Date', 'Object', 'String', 'Boolean', 'Array', 'Number'].forEach(t => {
      is[t] = function (arg) {
        return is.type(arg, t);
      };
    });
    function hasProperty(rule, k) {
      return {}.hasOwnProperty.call(rule, k);
    }

    const NAME$6 = 'fcSelect';
    var Select = vue.defineComponent({
      name: NAME$6,
      inheritAttrs: false,
      props: {
        formCreateInject: Object,
        modelValue: {
          type: [Array, String, Number, Boolean, Object],
          default: undefined
        },
        type: String
      },
      emits: ['update:modelValue', 'fc.el'],
      setup(props) {
        const options = vue.toRef(props.formCreateInject, 'options', []);
        const value = vue.toRef(props, 'modelValue');
        const _options = () => {
          return Array.isArray(options.value) ? options.value : [];
        };
        return {
          options: _options,
          value
        };
      },
      render() {
        var _this$$slots$default, _this$$slots;
        const makeOption = (props, index) => {
          return vue.createVNode(vue.resolveComponent("ElOption"), vue.mergeProps(props, {
            "key": '' + index + '-' + props.value
          }), null);
        };
        const makeOptionGroup = (props, index) => {
          return vue.createVNode(vue.resolveComponent("ElOptionGroup"), {
            "label": props.label,
            "key": '' + index + '-' + props.label
          }, {
            default: () => [is.trueArray(props.options) && props.options.map((v, index) => {
              return makeOption(v, index);
            })]
          });
        };
        const options = this.options();
        return vue.createVNode(vue.resolveComponent("ElSelect"), vue.mergeProps(this.$attrs, {
          "modelValue": this.value,
          "onUpdate:modelValue": v => this.$emit('update:modelValue', v),
          "ref": "el"
        }), {
          default: () => [options.map((props, index) => {
            return hasProperty(props || '', 'options') ? makeOptionGroup(props, index) : makeOption(props, index);
          }), (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)],
          ...getSlot(this.$slots, ['default'])
        });
      },
      mounted() {
        this.$emit('fc.el', this.$refs.el);
      }
    });

    const NAME$5 = 'fcTree';
    var Tree = vue.defineComponent({
      name: NAME$5,
      inheritAttrs: false,
      formCreateParser: {
        mergeProp(ctx) {
          const props = ctx.prop.props;
          if (!props.nodeKey) props.nodeKey = 'id';
          if (!props.props) props.props = {
            label: 'title'
          };
        }
      },
      props: {
        type: String,
        modelValue: {
          type: [Array, String, Number],
          default: () => []
        }
      },
      emits: ['update:modelValue', 'fc.el'],
      watch: {
        modelValue() {
          this.setValue();
        }
      },
      methods: {
        updateValue() {
          if (!this.$refs.tree) return;
          let value;
          if (this.type === 'selected') {
            value = this.$refs.tree.getCurrentKey();
          } else {
            value = this.$refs.tree.getCheckedKeys();
          }
          this.$emit('update:modelValue', value);
        },
        setValue() {
          if (!this.$refs.tree) return;
          const type = this.type;
          if (type === 'selected') {
            this.$refs.tree.setCurrentKey(this.modelValue);
          } else {
            this.$refs.tree.setCheckedKeys(toArray(this.modelValue));
          }
        }
      },
      render() {
        return vue.createVNode(vue.resolveComponent("ElTree"), vue.mergeProps(this.$attrs, {
          "ref": "tree",
          "onCheck": this.updateValue,
          "onNode-click": this.updateValue
        }), this.$slots);
      },
      mounted() {
        this.setValue();
        this.$emit('fc.el', this.$refs.tree);
      }
    });

    var css_248z$2 = "._fc-exceed .el-upload{display:none}.el-upload-list.is-disabled .el-upload{cursor:not-allowed!important}";
    styleInject(css_248z$2);

    var script$1 = {
      name: 'IconUpload'
    };

    const _hoisted_1$1 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2$1 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M160 832h704a32 32 0 110 64H160a32 32 0 110-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
    }, null, -1);
    const _hoisted_3$1 = [_hoisted_2$1];
    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
    }

    script$1.render = render$1;

    function parseFile(file, i) {
      return {
        url: file,
        name: getFileName(file),
        uid: i
      };
    }
    function getFileName(file) {
      return ('' + file).split('/').pop();
    }
    const NAME$4 = 'fcUpload';
    var Upload = vue.defineComponent({
      name: NAME$4,
      inheritAttrs: false,
      formCreateParser: {
        toFormValue(value) {
          return toArray(value);
        },
        toValue(formValue, ctx) {
          return ctx.prop.props.limit === 1 ? formValue[0] || '' : formValue;
        }
      },
      props: {
        previewMask: undefined,
        onPreview: Function,
        modalTitle: String,
        modelValue: [Array, String]
      },
      emits: ['update:modelValue', 'change', 'remove', 'fc.el'],
      data() {
        return {
          previewVisible: false,
          previewImage: '',
          fileList: []
        };
      },
      created() {
        this.fileList = toArray(this.modelValue).map(parseFile);
      },
      watch: {
        modelValue(n) {
          this.fileList = toArray(n).map(parseFile);
        }
      },
      methods: {
        handlePreview(file) {
          if (this.onPreview) {
            this.onPreview(...arguments);
          } else {
            this.previewImage = file.url;
            this.previewVisible = true;
          }
        },
        update(fileList) {
          let files = fileList.map(file => file.url).filter(url => url !== undefined);
          this.$emit('update:modelValue', files);
        },
        handleCancel() {
          this.previewVisible = false;
        },
        handleChange(file, fileList) {
          this.$emit('change', ...arguments);
          if (file.status === 'success') {
            this.update(fileList);
          }
        },
        handleRemove(file, fileList) {
          this.$emit('remove', ...arguments);
          this.update(fileList);
        }
      },
      render() {
        var _this$$slots$default, _this$$slots;
        const len = toArray(this.modelValue).length;
        return vue.createVNode(vue.Fragment, null, [vue.createVNode(vue.resolveComponent("ElUpload"), vue.mergeProps({
          "key": len,
          "list-type": "picture-card"
        }, this.$attrs, {
          "class": {
            '_fc-exceed': this.$attrs.limit ? this.$attrs.limit <= len : false
          },
          "onPreview": this.handlePreview,
          "onChange": this.handleChange,
          "onRemove": this.handleRemove,
          "fileList": this.fileList,
          "ref": "upload"
        }), {
          default: () => [((_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)) || vue.createVNode(vue.resolveComponent("ElIcon"), null, {
            default: () => [vue.createVNode(script$1, null, null)]
          })],
          ...getSlot(this.$slots, ['default'])
        }), vue.createVNode(vue.resolveComponent("ElDialog"), {
          "appendToBody": true,
          "modal": this.previewMask,
          "title": this.modalTitle,
          "modelValue": this.previewVisible,
          "onClose": this.handleCancel
        }, {
          default: () => [vue.createVNode("img", {
            "style": "width: 100%",
            "src": this.previewImage
          }, null)]
        })]);
      },
      mounted() {
        this.$emit('fc.el', this.$refs.upload);
      }
    });

    function $set(target, field, value) {
      target[field] = value;
    }
    function $del(target, field) {
      delete target[field];
    }

    function deepExtend(origin, target = {}, mode) {
      let isArr = false;
      for (let key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          let clone = target[key];
          if ((isArr = Array.isArray(clone)) || is.Object(clone)) {
            let nst = origin[key] === undefined;
            if (isArr) {
              isArr = false;
              nst && $set(origin, key, []);
            } else if (clone._clone && mode !== undefined) {
              if (mode) {
                clone = clone.getRule();
                nst && $set(origin, key, {});
              } else {
                $set(origin, key, clone._clone());
                continue;
              }
            } else {
              nst && $set(origin, key, {});
            }
            origin[key] = deepExtend(origin[key], clone, mode);
          } else {
            $set(origin, key, clone);
            if (!is.Undef(clone)) {
              if (!is.Undef(clone.__json)) {
                origin[key].__json = clone.__json;
              }
              if (!is.Undef(clone.__origin)) {
                origin[key].__origin = clone.__origin;
              }
            }
          }
        }
      }
      return mode !== undefined && Array.isArray(origin) ? origin.filter(v => !v || !v.__ctrl) : origin;
    }
    function deepCopy(value) {
      return deepExtend({}, {
        value
      }).value;
    }

    const _extends = Object.assign || function (a) {
      for (let b, c = 1; c < arguments.length; c++) {
        for (let d in b = arguments[c], b) {
          Object.prototype.hasOwnProperty.call(b, d) && $set(a, d, b[d]);
        }
      }
      return a;
    };
    function extend() {
      return _extends.apply(this, arguments);
    }
    function copy$1(obj) {
      if (typeof obj !== 'object' || obj === null) return obj;
      return obj instanceof Array ? [...obj] : {
        ...obj
      };
    }

    var css_248z$1 = "._fc-group{display:flex;flex-direction:column;justify-content:center;min-height:38px;width:100%}._fc-group-disabled ._fc-group-add,._fc-group-disabled ._fc-group-btn{cursor:not-allowed}._fc-group-handle{background-color:#fff;border:1px dashed #d9d9d9;border-radius:15px;bottom:-15px;display:flex;flex-direction:row;padding:3px 8px;position:absolute;right:30px}._fc-group-btn{cursor:pointer}._fc-group-idx{align-items:center;background:#eee;border-radius:15px;bottom:-15px;display:flex;font-weight:700;height:30px;justify-content:center;left:10px;position:absolute;width:30px}._fc-group-handle ._fc-group-btn+._fc-group-btn{margin-left:7px}._fc-group-container{border:1px dashed #d9d9d9;border-radius:5px;display:flex;flex-direction:column;margin:5px 5px 25px;padding:20px 20px 25px;position:relative}._fc-group-arrow{height:20px;position:relative;width:20px}._fc-group-arrow:before{border-left:2px solid #999;border-top:2px solid #999;content:\"\";height:9px;left:5px;position:absolute;top:8px;transform:rotate(45deg);width:9px}._fc-group-arrow._fc-group-down{transform:rotate(180deg)}._fc-group-plus-minus{cursor:pointer;height:20px;position:relative;width:20px}._fc-group-plus-minus:after,._fc-group-plus-minus:before{background-color:#409eff;content:\"\";height:2px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:60%}._fc-group-plus-minus:before{transform:translate(-50%,-50%) rotate(90deg)}._fc-group-plus-minus._fc-group-minus:before{display:none}._fc-group-plus-minus._fc-group-minus:after{background-color:#f56c6c}._fc-group-add{border:1px solid rgba(64,158,255,.5);border-radius:15px;cursor:pointer;height:25px;width:25px}._fc-group-add._fc-group-plus-minus:after,._fc-group-add._fc-group-plus-minus:before{width:50%}";
    styleInject(css_248z$1);

    const NAME$3 = 'fcGroup';
    var Group = vue.defineComponent({
      name: NAME$3,
      props: {
        field: String,
        rule: Array,
        expand: Number,
        options: Object,
        button: {
          type: Boolean,
          default: true
        },
        max: {
          type: Number,
          default: 0
        },
        min: {
          type: Number,
          default: 0
        },
        modelValue: {
          type: Array,
          default: () => []
        },
        defaultValue: Object,
        sortBtn: {
          type: Boolean,
          default: true
        },
        disabled: {
          type: Boolean,
          default: false
        },
        syncDisabled: {
          type: Boolean,
          default: true
        },
        onBeforeRemove: {
          type: Function,
          default: () => {}
        },
        onBeforeAdd: {
          type: Function,
          default: () => {}
        },
        formCreateInject: Object,
        parse: Function
      },
      data() {
        return {
          len: 0,
          cacheRule: {},
          cacheValue: {},
          sort: [],
          form: vue.markRaw(this.formCreateInject.form.$form())
        };
      },
      emits: ['update:modelValue', 'change', 'itemMounted', 'remove', 'add'],
      watch: {
        rule: {
          handler(n, o) {
            Object.keys(this.cacheRule).forEach(v => {
              const item = this.cacheRule[v];
              if (item.$f) {
                const val = item.$f.formData();
                if (n === o) {
                  item.$f.deferSyncValue(() => {
                    deepExtend(item.rule, n);
                    item.$f.setValue(val);
                  }, true);
                } else {
                  const val = item.$f.formData();
                  item.$f.once('reloading', () => {
                    item.$f.setValue(val);
                  });
                  item.rule = deepCopy(n);
                }
              }
            });
          },
          deep: true
        },
        disabled(n) {
          if (this.syncDisabled) {
            const lst = this.cacheRule;
            Object.keys(lst).forEach(k => {
              lst[k].$f.disabled(n);
            });
          }
        },
        expand(n) {
          let d = n - this.modelValue.length;
          if (d > 0) {
            this.expandRule(d);
          }
        },
        modelValue: {
          handler(n) {
            n = n || [];
            let keys = Object.keys(this.sort),
              total = keys.length,
              len = total - n.length;
            if (len < 0) {
              for (let i = len; i < 0; i++) {
                this.addRule(n.length + i, true);
              }
              for (let i = 0; i < total; i++) {
                this.setValue(keys[i], n[i]);
              }
            } else {
              if (len > 0) {
                for (let i = 0; i < len; i++) {
                  this.removeRule(keys[total - i - 1]);
                }
              }
              n.forEach((val, i) => {
                this.setValue(keys[i], n[i]);
              });
            }
          },
          deep: true
        }
      },
      methods: {
        _value(v) {
          return v && hasProperty(v, this.field) ? v[this.field] : v;
        },
        cache(k, val) {
          this.cacheValue[k] = JSON.stringify(val);
        },
        input(value) {
          this.$emit('update:modelValue', value);
          this.$emit('change', value);
        },
        formData(key, formData) {
          const cacheRule = this.cacheRule;
          const keys = this.sort;
          if (keys.filter(k => cacheRule[k].$f).length !== keys.length) {
            return;
          }
          const value = keys.map(k => {
            const data = key === k ? formData : {
              ...this.cacheRule[k].$f.form
            };
            const value = this.field ? data[this.field] || null : data;
            this.cache(k, value);
            return value;
          });
          this.input(value);
        },
        setValue(key, value) {
          const field = this.field;
          if (field) {
            value = {
              [field]: this._value(value)
            };
          }
          if (this.cacheValue[key] === JSON.stringify(field ? value[field] : value)) {
            return;
          }
          this.cache(key, value);
        },
        addRule(i, emit) {
          const rule = this.formCreateInject.form.copyRules(this.rule || []);
          const options = this.options ? {
            ...this.options
          } : {
            submitBtn: false,
            resetBtn: false
          };
          if (this.defaultValue) {
            if (!options.formData) options.formData = {};
            const defVal = deepCopy(this.defaultValue);
            extend(options.formData, this.field ? {
              [this.field]: defVal
            } : defVal);
          }
          this.parse && this.parse({
            rule,
            options,
            index: this.sort.length
          });
          this.cacheRule[++this.len] = {
            rule,
            options
          };
          if (emit) {
            vue.nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
          }
        },
        add$f(i, key, $f) {
          this.cacheRule[key].$f = $f;
          vue.nextTick(() => {
            if (this.syncDisabled) {
              $f.disabled(this.disabled);
            }
            this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
          });
        },
        removeRule(key, emit) {
          const index = Object.keys(this.cacheRule).indexOf(key);
          delete this.cacheRule[key];
          delete this.cacheValue[key];
          if (emit) {
            vue.nextTick(() => this.$emit('remove', index));
          }
        },
        add(i) {
          if (this.disabled || false === this.onBeforeAdd(this.modelValue)) {
            return;
          }
          const value = [...this.modelValue];
          value.push(this.defaultValue ? deepCopy(this.defaultValue) : this.field ? null : {});
          this.input(value);
        },
        del(index, key) {
          if (this.disabled || false === this.onBeforeRemove(this.modelValue, index)) {
            return;
          }
          this.removeRule(key, true);
          const value = [...this.modelValue];
          value.splice(index, 1);
          this.input(value);
        },
        addIcon(key) {
          return vue.createVNode("div", {
            "class": "_fc-group-btn _fc-group-plus-minus",
            "onClick": this.add
          }, null);
        },
        delIcon(index, key) {
          return vue.createVNode("div", {
            "class": "_fc-group-btn _fc-group-plus-minus _fc-group-minus",
            "onClick": () => this.del(index, key)
          }, null);
        },
        sortUpIcon(index) {
          return vue.createVNode("div", {
            "class": "_fc-group-btn _fc-group-arrow _fc-group-up",
            "onClick": () => this.changeSort(index, -1)
          }, null);
        },
        sortDownIcon(index) {
          return vue.createVNode("div", {
            "class": "_fc-group-btn _fc-group-arrow _fc-group-down",
            "onClick": () => this.changeSort(index, 1)
          }, null);
        },
        changeSort(index, sort) {
          const a = this.sort[index];
          this.sort[index] = this.sort[index + sort];
          this.sort[index + sort] = a;
          this.formData(0);
        },
        makeIcon(total, index, key) {
          if (this.$slots.button) {
            return this.$slots.button({
              total,
              index,
              vm: this,
              key,
              del: () => this.del(index, key),
              add: this.add
            });
          }
          const btn = [];
          if ((!this.max || total < this.max) && total === index + 1) {
            btn.push(this.addIcon(key));
          }
          if (total > this.min) {
            btn.push(this.delIcon(index, key));
          }
          if (this.sortBtn && index) {
            btn.push(this.sortUpIcon(index));
          }
          if (this.sortBtn && index !== total - 1) {
            btn.push(this.sortDownIcon(index));
          }
          return btn;
        },
        emitEvent(name, args, index, key) {
          this.$emit(name, ...args, this.cacheRule[key].$f, index);
        },
        expandRule(n) {
          for (let i = 0; i < n; i++) {
            this.addRule(i);
          }
        }
      },
      created() {
        vue.watch(() => ({
          ...this.cacheRule
        }), n => {
          this.sort = Object.keys(n);
        }, {
          immediate: true
        });
        const d = (this.expand || 0) - this.modelValue.length;
        for (let i = 0; i < this.modelValue.length; i++) {
          this.addRule(i);
        }
        if (d > 0) {
          this.expandRule(d);
        }
      },
      render() {
        const keys = this.sort;
        const button = this.button;
        const Type = this.form;
        const disabled = this.disabled;
        const children = keys.length === 0 ? this.$slots.default ? this.$slots.default({
          vm: this,
          add: this.add
        }) : vue.createVNode("div", {
          "key": 'a_def',
          "class": "_fc-group-plus-minus _fc-group-add fc-clock",
          "onClick": this.add
        }, null) : keys.map((key, index) => {
          const {
            rule,
            options
          } = this.cacheRule[key];
          const btn = button && !disabled ? this.makeIcon(keys.length, index, key) : [];
          return vue.createVNode("div", {
            "class": "_fc-group-container",
            "key": key
          }, [vue.createVNode(Type, vue.mergeProps({
            "key": key
          }, {
            'onUpdate:modelValue': formData => this.formData(key, formData),
            'onEmit-event': (name, ...args) => this.emitEvent(name, args, index, key),
            'onUpdate:api': $f => this.add$f(index, key, $f),
            inFor: true,
            modelValue: this.field ? {
              [this.field]: this._value(this.modelValue[index])
            } : this.modelValue[index],
            rule,
            option: options,
            extendOption: true
          }), null), vue.createVNode("div", {
            "class": "_fc-group-idx"
          }, [index + 1]), btn.length ? vue.createVNode("div", {
            "class": "_fc-group-handle fc-clock"
          }, [btn]) : null]);
        });
        return vue.createVNode("div", {
          "key": 'con',
          "class": '_fc-group ' + (disabled ? '_fc-group-disabled' : '')
        }, [children]);
      }
    });

    const NAME$2 = 'fcSubForm';
    var Sub = vue.defineComponent({
      name: NAME$2,
      props: {
        rule: Array,
        options: {
          type: Object,
          default: () => vue.reactive({
            submitBtn: false,
            resetBtn: false
          })
        },
        modelValue: {
          type: Object,
          default: () => ({})
        },
        disabled: {
          type: Boolean,
          default: false
        },
        syncDisabled: {
          type: Boolean,
          default: true
        },
        formCreateInject: Object
      },
      data() {
        return {
          cacheValue: {},
          subApi: {},
          form: vue.markRaw(this.formCreateInject.form.$form())
        };
      },
      emits: ['fc:subform', 'update:modelValue', 'change', 'itemMounted'],
      watch: {
        disabled(n) {
          this.syncDisabled && this.subApi.disabled(n);
        },
        modelValue(n) {
          this.setValue(n);
        }
      },
      methods: {
        formData(value) {
          this.cacheValue = JSON.stringify(value);
          this.$emit('update:modelValue', value);
          this.$emit('change', value);
        },
        setValue(value) {
          const str = JSON.stringify(value);
          if (this.cacheValue === str) {
            return;
          }
          this.cacheValue = str;
          this.subApi.coverValue(value || {});
        },
        add$f(api) {
          this.subApi = api;
          vue.nextTick(() => {
            this.syncDisabled && api.disabled(this.disabled);
            this.$emit('itemMounted', api);
          });
        }
      },
      render() {
        const Type = this.form;
        return vue.createVNode(Type, {
          "onUpdate:modelValue": this.formData,
          "modelValue": this.modelValue,
          "onEmit-event": this.$emit,
          "onUpdate:api": this.add$f,
          "rule": this.rule,
          "option": this.options,
          "extendOption": true
        }, null);
      }
    });

    var script = {
      name: 'IconWarning'
    };

    const _hoisted_1 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm48-176a48 48 0 11-96 0 48 48 0 0196 0zm-48-464a32 32 0 0132 32v288a32 32 0 01-64 0V288a32 32 0 0132-32z"
    }, null, -1);
    const _hoisted_3 = [_hoisted_2];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1, _hoisted_3);
    }

    script.render = render;

    var components = [Checkbox, Frame, Radio, Select, Tree, Upload, Group, Sub, script];

    function toString(val) {
      return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
    }

    function toLine(name) {
      let line = name.replace(/([A-Z])/g, '-$1').toLocaleLowerCase();
      if (line.indexOf('-') === 0) line = line.substr(1);
      return line;
    }
    function upper(str) {
      return str.replace(str[0], str[0].toLocaleUpperCase());
    }

    function format(type, msg, rule) {
      return `[form-create ${type}]: ${msg}` + (rule ? '\n\nrule: ' + JSON.stringify(rule.getRule ? rule.getRule() : rule) : '');
    }
    function err(msg, rule) {
      console.error(format('err', msg, rule));
    }
    function logError(e) {
      err(e.toString());
      console.error(e);
    }

    const PREFIX = '[[FORM-CREATE-PREFIX-';
    const SUFFIX = '-FORM-CREATE-SUFFIX]]';
    const $T = '$FN:';
    const $TX = '$FNX:';
    const $ON = '$GLOBAL:';
    const FUNCTION = 'function';
    function toJson(obj, space) {
      return JSON.stringify(deepExtend(Array.isArray(obj) ? [] : {}, obj, true), function (key, val) {
        if (val && val._isVue === true) return undefined;
        if (typeof val !== FUNCTION) {
          return val;
        }
        if (val.__json) {
          return val.__json;
        }
        if (val.__origin) val = val.__origin;
        if (val.__emit) return undefined;
        return PREFIX + val + SUFFIX;
      }, space);
    }
    function makeFn(fn) {
      return new Function('return ' + fn)();
    }
    function parseFn(fn, mode) {
      if (fn && is.String(fn) && fn.length > 4) {
        let v = fn.trim();
        let flag = false;
        try {
          if (v.indexOf(SUFFIX) > 0 && v.indexOf(PREFIX) === 0) {
            v = v.replace(SUFFIX, '').replace(PREFIX, '');
            flag = true;
          } else if (v.indexOf($T) === 0) {
            v = v.replace($T, '');
            flag = true;
          } else if (v.indexOf($ON) === 0) {
            const name = v.replace($ON, '');
            v = function (...args) {
              const callback = args[0].api.getGlobalEvent(name);
              if (callback) {
                return callback.call(this, ...args);
              }
              return undefined;
            };
            v.__json = fn;
            v.__inject = true;
            return v;
          } else if (v.indexOf($TX) === 0) {
            v = makeFn('function($inject){' + v.replace($TX, '') + '}');
            v.__json = fn;
            v.__inject = true;
            return v;
          } else if (!mode && v.indexOf(FUNCTION) === 0 && v !== FUNCTION) {
            flag = true;
          }
          if (!flag) return fn;
          const val = makeFn(v.indexOf(FUNCTION) === -1 && v.indexOf('(') !== 0 ? FUNCTION + ' ' + v : v);
          val.__json = fn;
          return val;
        } catch (e) {
          err(`解析失败:${v}\n\nerr: ${e}`);
          return undefined;
        }
      }
      return fn;
    }
    function parseJson(json, mode) {
      return JSON.parse(json, function (k, v) {
        if (is.Undef(v) || !v.indexOf) return v;
        return parseFn(v, mode);
      });
    }

    let id$2 = 0;
    function uniqueId() {
      const num = 370 + ++id$2;
      return 'F' + Math.random().toString(36).substr(3, 3) + Number(`${Date.now()}`).toString(36) + num.toString(36) + 'c';
    }

    function deepSet(data, idx, val) {
      let _data = data,
        to;
      (idx || '').split('.').forEach(v => {
        if (to) {
          if (!_data[to] || typeof _data[to] != 'object') {
            _data[to] = {};
          }
          _data = _data[to];
        }
        to = v;
      });
      _data[to] = val;
      return _data;
    }

    const NAME$1 = 'FormCreate';
    const getRuleInject = (vm, parent) => {
      if (!vm || vm === parent) {
        return;
      }
      if (vm.props.formCreateInject) {
        return vm.props.formCreateInject;
      }
      if (vm.parent) {
        return getRuleInject(vm.parent, parent);
      }
    };
    function $FormCreate(FormCreate, components, directives) {
      return vue.defineComponent({
        name: NAME$1,
        components,
        directives,
        props: {
          rule: {
            type: Array,
            required: true,
            default: () => []
          },
          option: {
            type: Object,
            default: () => ({})
          },
          extendOption: Boolean,
          modelValue: Object,
          disabled: {
            type: Boolean,
            default: undefined
          },
          api: Object,
          name: String,
          subForm: {
            type: Boolean,
            default: true
          },
          inFor: Boolean
        },
        emits: ['update:api', 'update:modelValue', 'mounted', 'submit', 'change', 'emit-event', 'control', 'remove-rule', 'remove-field', 'sync', 'reload', 'repeat-field', 'update', 'validate-field-fail', 'validate-fail', 'created'],
        render() {
          return this.fc.render();
        },
        setup(props) {
          const vm = vue.getCurrentInstance();
          vue.provide('parentFC', vm);
          const parent = vue.inject('parentFC', null);
          const {
            rule,
            modelValue,
            subForm,
            inFor
          } = vue.toRefs(props);
          const data = vue.reactive({
            ctxInject: {},
            destroyed: false,
            isShow: true,
            unique: 1,
            renderRule: [...(rule.value || [])],
            updateValue: JSON.stringify(modelValue.value || {})
          });
          const fc = new FormCreate(vm);
          const fapi = fc.api();
          const isMore = inFor.value;
          const addSubForm = () => {
            if (parent) {
              const inject = getRuleInject(vm, parent);
              if (inject) {
                let sub;
                if (isMore) {
                  sub = toArray(inject.getSubForm());
                  sub.push(fapi);
                } else {
                  sub = fapi;
                }
                inject.subForm(sub);
              }
            }
          };
          const rmSubForm = () => {
            const inject = getRuleInject(vm, parent);
            if (inject) {
              if (isMore) {
                const sub = toArray(inject.getSubForm());
                const idx = sub.indexOf(fapi);
                if (idx > -1) {
                  sub.splice(idx, 1);
                }
              } else {
                inject.subForm();
              }
            }
          };
          let styleEl = null;
          vue.onBeforeMount(() => {
            let content = '';
            const globalClass = props.option && props.option.globalClass || {};
            Object.keys(globalClass).forEach(k => {
              let subCss = '';
              globalClass[k].style && Object.keys(globalClass[k].style).forEach(key => {
                subCss += toLine(key) + ':' + globalClass[k].style[key] + ';';
              });
              if (globalClass[k].content) {
                subCss += globalClass[k].content + ';';
              }
              if (subCss) {
                content += `.${k}{${subCss}}`;
              }
            });
            if (props.option && props.option.style) {
              content += props.option.style;
            }
            if (content) {
              styleEl = document.createElement('style');
              styleEl.type = 'text/css';
              styleEl.innerHTML = content;
              document.head.appendChild(styleEl);
            }
          });
          vue.onMounted(() => {
            fc.mounted();
          });
          vue.onBeforeUnmount(() => {
            styleEl && document.head.removeChild(styleEl);
            rmSubForm();
            data.destroyed = true;
            fc.unmount();
          });
          vue.onUpdated(() => {
            fc.updated();
          });
          vue.watch(subForm, n => {
            n ? addSubForm() : rmSubForm();
          }, {
            immediate: true
          });
          vue.watch(() => [...rule.value], n => {
            if (fc.$handle.isBreakWatch() || n.length === data.renderRule.length && n.every(v => data.renderRule.indexOf(v) > -1)) return;
            fc.$handle.reloadRule(rule.value);
            vm.setupState.renderRule();
          });
          vue.watch(() => props.option, () => {
            fc.initOptions();
            fapi.refresh();
          }, {
            deep: true
          });
          vue.watch(() => props.disabled, () => {
            fapi.refresh();
          });
          vue.watch(modelValue, n => {
            if (JSON.stringify(n || {}) === data.updateValue) return;
            fapi.config.forceCoverValue ? fapi.coverValue(n || {}) : fapi.setValue(n || {});
          }, {
            deep: true
          });
          return {
            fc: vue.markRaw(fc),
            parent: parent ? vue.markRaw(parent) : parent,
            fapi: vue.markRaw(fapi),
            ...vue.toRefs(data),
            refresh() {
              ++data.unique;
            },
            renderRule() {
              data.renderRule = [...(rule.value || [])];
            },
            updateValue(value) {
              if (data.destroyed) return;
              const json = JSON.stringify(value);
              if (data.updateValue === json) {
                return;
              }
              data.updateValue = json;
              vm.emit('update:modelValue', value);
            }
          };
        },
        created() {
          const vm = vue.getCurrentInstance();
          vm.emit('update:api', vm.setupState.fapi);
          vm.setupState.fc.init();
        }
      });
    }

    const normalMerge = ['props'];
    const toArrayMerge = ['class', 'style', 'directives'];
    const functionalMerge = ['on'];
    const mergeProps = (objects, initial = {}, opt = {}) => {
      const _normalMerge = [...normalMerge, ...(opt['normal'] || [])];
      const _toArrayMerge = [...toArrayMerge, ...(opt['array'] || [])];
      const _functionalMerge = [...functionalMerge, ...(opt['functional'] || [])];
      const propsMerge = opt['props'] || [];
      return objects.reduce((a, b) => {
        for (const key in b) {
          if (a[key]) {
            if (propsMerge.indexOf(key) > -1) {
              a[key] = mergeProps([b[key]], a[key]);
            } else if (_normalMerge.indexOf(key) > -1) {
              a[key] = {
                ...a[key],
                ...b[key]
              };
            } else if (_toArrayMerge.indexOf(key) > -1) {
              const arrA = a[key] instanceof Array ? a[key] : [a[key]];
              const arrB = b[key] instanceof Array ? b[key] : [b[key]];
              a[key] = [...arrA, ...arrB];
            } else if (_functionalMerge.indexOf(key) > -1) {
              for (const event in b[key]) {
                if (a[key][event]) {
                  const arrA = a[key][event] instanceof Array ? a[key][event] : [a[key][event]];
                  const arrB = b[key][event] instanceof Array ? b[key][event] : [b[key][event]];
                  a[key][event] = [...arrA, ...arrB];
                } else {
                  a[key][event] = b[key][event];
                }
              }
            } else if (key === 'hook') {
              for (let hook in b[key]) {
                if (a[key][hook]) {
                  a[key][hook] = mergeFn(a[key][hook], b[key][hook]);
                } else {
                  a[key][hook] = b[key][hook];
                }
              }
            } else {
              a[key] = b[key];
            }
          } else {
            if (_normalMerge.indexOf(key) > -1 || _functionalMerge.indexOf(key) > -1 || propsMerge.indexOf(key) > -1) {
              a[key] = {
                ...b[key]
              };
            } else if (_toArrayMerge.indexOf(key) > -1) {
              a[key] = b[key] instanceof Array ? [...b[key]] : typeof b[key] === 'object' ? {
                ...b[key]
              } : b[key];
            } else a[key] = b[key];
          }
        }
        return a;
      }, initial);
    };
    const mergeFn = (fn1, fn2) => function () {
      fn1 && fn1.apply(this, arguments);
      fn2 && fn2.apply(this, arguments);
    };

    const keyAttrs = ['type', 'slot', 'emitPrefix', 'value', 'name', 'native', 'hidden', 'display', 'inject', 'options', 'emit', 'link', 'prefix', 'suffix', 'update', 'sync', 'optionsTo', 'key', 'slotUpdate', 'computed', 'preview', 'component', 'cache', 'modelEmit'];
    const arrayAttrs = ['validate', 'children', 'control'];
    const normalAttrs = ['effect'];
    function attrs() {
      return [...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge, ...arrayAttrs, ...normalAttrs];
    }

    function enumerable(value, writable) {
      return {
        value,
        enumerable: false,
        configurable: false,
        writable: !!writable
      };
    }

    //todo 优化位置
    function copyRule(rule, mode) {
      return copyRules([rule], mode || false)[0];
    }
    function copyRules(rules, mode) {
      return deepExtend([], [...rules], mode || false);
    }
    function mergeRule(rule, merge) {
      mergeProps(Array.isArray(merge) ? merge : [merge], rule, {
        array: arrayAttrs,
        normal: normalAttrs
      });
      return rule;
    }
    function getRule(rule) {
      const r = is.Function(rule.getRule) ? rule.getRule() : rule;
      if (!r.type) {
        r.type = 'input';
      }
      return r;
    }
    function mergeGlobal(target, merge) {
      if (!target) return merge;
      Object.keys(merge || {}).forEach(k => {
        if (merge[k]) {
          target[k] = mergeRule(target[k] || {}, merge[k]);
        }
      });
      return target;
    }
    function funcProxy(that, proxy) {
      Object.defineProperties(that, Object.keys(proxy).reduce((initial, k) => {
        initial[k] = {
          get() {
            return proxy[k]();
          }
        };
        return initial;
      }, {}));
    }
    function byCtx(rule) {
      return rule.__fc__ || (rule.__origin__ ? rule.__origin__.__fc__ : null);
    }
    function invoke(fn, def) {
      try {
        def = fn();
      } catch (e) {
        logError(e);
      }
      return def;
    }
    function makeSlotBag() {
      const slotBag = {};
      const slotName = n => n || 'default';
      return {
        setSlot(slot, vnFn) {
          slot = slotName(slot);
          if (!vnFn || Array.isArray(vnFn) && vnFn.length) return;
          if (!slotBag[slot]) slotBag[slot] = [];
          slotBag[slot].push(vnFn);
        },
        getSlot(slot, val) {
          slot = slotName(slot);
          const children = [];
          (slotBag[slot] || []).forEach(fn => {
            if (Array.isArray(fn)) {
              children.push(...fn);
            } else if (is.Function(fn)) {
              const res = fn(...(val || []));
              if (Array.isArray(res)) {
                children.push(...res);
              } else {
                children.push(res);
              }
            } else if (!is.Undef(fn)) {
              children.push(fn);
            }
          });
          return children;
        },
        getSlots() {
          const slots = {};
          Object.keys(slotBag).forEach(k => {
            slots[k] = (...args) => {
              return this.getSlot(k, args);
            };
          });
          return slots;
        },
        slotLen(slot) {
          slot = slotName(slot);
          return slotBag[slot] ? slotBag[slot].length : 0;
        },
        mergeBag(bag) {
          if (!bag) return this;
          const slots = is.Function(bag.getSlots) ? bag.getSlots() : bag;
          if (Array.isArray(bag) || vue.isVNode(bag)) {
            this.setSlot(undefined, () => bag);
          } else {
            Object.keys(slots).forEach(k => {
              this.setSlot(k, slots[k]);
            });
          }
          return this;
        }
      };
    }
    function toProps(rule) {
      const prop = {
        ...(rule.props || {})
      };
      Object.keys(rule.on || {}).forEach(k => {
        const name = `on${upper(k)}`;
        if (Array.isArray(prop[name])) {
          prop[name] = [...prop[name], rule.on[k]];
        } else if (prop[name]) {
          prop[name] = [prop[name], rule.on[k]];
        } else {
          prop[name] = rule.on[k];
        }
      });
      prop.key = rule.key;
      prop.ref = rule.ref;
      prop.class = rule.class;
      prop.style = rule.style;
      if (prop.slot) delete prop.slot;
      return prop;
    }
    function setPrototypeOf(o, proto) {
      Object.setPrototypeOf(o, proto);
      return o;
    }

    function baseRule() {
      return {
        props: {},
        on: {},
        options: [],
        children: [],
        hidden: false,
        display: true,
        value: undefined
      };
    }
    function creatorFactory(name, init) {
      return (title, field, value, props = {}) => {
        const maker = new Creator(name, title, field, value, props);
        if (init) {
          if (is.Function(init)) init(maker);else maker.props(init);
        }
        return maker;
      };
    }
    function Creator(type, title, field, value, props) {
      this._data = extend(baseRule(), {
        type,
        title,
        field,
        value,
        props: props || {}
      });
      this.event = this.on;
    }
    extend(Creator.prototype, {
      getRule() {
        return this._data;
      },
      setProp(key, value) {
        $set(this._data, key, value);
        return this;
      },
      modelField(field) {
        this._data.modelField = field;
        return this;
      },
      _clone() {
        const clone = new this.constructor();
        clone._data = copyRule(this._data);
        return clone;
      }
    });
    function appendProto(attrs) {
      attrs.forEach(name => {
        Creator.prototype[name] = function (key) {
          mergeRule(this._data, {
            [name]: arguments.length < 2 ? key : {
              [key]: arguments[1]
            }
          });
          return this;
        };
      });
    }
    appendProto(attrs());

    const commonMaker = creatorFactory('');
    function create(type, field, title) {
      let make = commonMaker('', field);
      make._data.type = type;
      make._data.title = title;
      return make;
    }
    function makerFactory() {
      return {
        create,
        factory: creatorFactory
      };
    }

    // https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js
    function getError(action, option, xhr) {
      const msg = `fail to ${action} ${xhr.status}'`;
      const err = new Error(msg);
      err.status = xhr.status;
      err.url = action;
      return err;
    }
    function getBody(xhr) {
      const text = xhr.responseText || xhr.response;
      if (!text) {
        return text;
      }
      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    }
    function fetch$1(option) {
      if (typeof XMLHttpRequest === 'undefined') {
        return;
      }
      const xhr = new XMLHttpRequest();
      const action = option.action;
      xhr.onerror = function error(e) {
        option.onError(e);
      };
      xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
          return option.onError(getError(action, option, xhr), getBody(xhr));
        }
        option.onSuccess(getBody(xhr));
      };
      xhr.open(option.method || 'get', action, true);
      let formData;
      if (option.data) {
        if ((option.dataType || '').toLowerCase() !== 'json') {
          formData = new FormData();
          Object.keys(option.data).map(key => {
            formData.append(key, option.data[key]);
          });
        } else {
          formData = JSON.stringify(option.data);
          xhr.setRequestHeader('content-type', 'application/json');
        }
      }
      if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
      }
      const headers = option.headers || {};
      Object.keys(headers).forEach(item => {
        if (headers[item] !== null) {
          xhr.setRequestHeader(item, headers[item]);
        }
      });
      xhr.send(formData);
    }
    function asyncFetch(config) {
      return new Promise((resolve, reject) => {
        fetch$1({
          ...config,
          onSuccess(res) {
            let fn = v => v;
            const parse = parseFn(config.parse);
            if (is.Function(parse)) {
              fn = parse;
            } else if (parse && is.String(parse)) {
              fn = v => {
                parse.split('.').forEach(k => {
                  if (v) {
                    v = v[k];
                  }
                });
                return v;
              };
            }
            resolve(fn(res));
          },
          onError(err) {
            reject(err);
          }
        });
      });
    }

    function copy(value) {
      return deepCopy(value);
    }
    function Api(h) {
      function tidyFields(fields) {
        if (is.Undef(fields)) fields = h.fields();else if (!Array.isArray(fields)) fields = [fields];
        return fields;
      }
      function props(fields, key, val) {
        tidyFields(fields).forEach(field => {
          h.getCtxs(field).forEach(ctx => {
            $set(ctx.rule, key, val);
            h.$render.clearCache(ctx);
          });
        });
      }
      function allSubForm() {
        const subs = h.subForm;
        return Object.keys(subs).reduce((initial, k) => {
          const sub = subs[k];
          if (!sub) return initial;
          if (Array.isArray(sub)) initial.push(...sub);else initial.push(sub);
          return initial;
        }, []);
      }
      const api = {
        get config() {
          return h.options;
        },
        set config(val) {
          h.fc.options.value = val;
        },
        get options() {
          return h.options;
        },
        set options(val) {
          h.fc.options.value = val;
        },
        get form() {
          return h.form;
        },
        get rule() {
          return h.rules;
        },
        get parent() {
          return h.vm.setupState.parent && h.vm.setupState.parent.setupState.fapi;
        },
        get top() {
          if (api.parent) {
            return api.parent.top;
          }
          return api;
        },
        get children() {
          return allSubForm();
        },
        formData(fields) {
          return tidyFields(fields).reduce((initial, id) => {
            const ctx = h.getFieldCtx(id);
            if (!ctx) return initial;
            initial[ctx.field] = copy(ctx.rule.value);
            return initial;
          }, {});
        },
        getValue(field) {
          const ctx = h.getFieldCtx(field);
          if (!ctx) return;
          return copy(ctx.rule.value);
        },
        coverValue(formData) {
          const data = {
            ...(formData || {})
          };
          h.deferSyncValue(() => {
            api.fields().forEach(key => {
              const ctxs = h.fieldCtx[key];
              if (ctxs) {
                const flag = hasProperty(formData, key);
                ctxs.forEach(ctx => {
                  ctx.rule.value = flag ? formData[key] : undefined;
                });
                delete data[key];
              }
            });
            extend(h.appendData, data);
          });
        },
        setValue(field) {
          let formData = field;
          if (arguments.length >= 2) formData = {
            [field]: arguments[1]
          };
          h.deferSyncValue(() => {
            Object.keys(formData).forEach(key => {
              const ctxs = h.fieldCtx[key];
              if (!ctxs) return h.appendData[key] = formData[key];
              ctxs.forEach(ctx => {
                ctx.rule.value = formData[key];
              });
            });
          });
        },
        removeField(field) {
          const ctx = h.getCtx(field);
          h.deferSyncValue(() => {
            h.getCtxs(field).forEach(ctx => {
              ctx.rm();
            });
          }, true);
          return ctx ? ctx.origin : undefined;
        },
        removeRule(rule) {
          const ctx = rule && byCtx(rule);
          if (!ctx) return;
          ctx.rm();
          return ctx.origin;
        },
        fields: () => h.fields(),
        append: (rule, after, child) => {
          let index = h.sort.length - 1,
            rules;
          const ctx = h.getCtx(after);
          if (ctx) {
            if (child) {
              rules = ctx.getPending('children', ctx.rule.children);
              if (!Array.isArray(rules)) return;
              index = ctx.rule.children.length - 1;
            } else {
              index = ctx.root.indexOf(ctx.origin);
              rules = ctx.root;
            }
          } else rules = h.rules;
          rules.splice(index + 1, 0, rule);
        },
        prepend: (rule, after, child) => {
          let index = 0,
            rules;
          const ctx = h.getCtx(after);
          if (ctx) {
            if (child) {
              rules = ctx.getPending('children', ctx.rule.children);
              if (!Array.isArray(rules)) return;
            } else {
              index = ctx.root.indexOf(ctx.origin);
              rules = ctx.root;
            }
          } else rules = h.rules;
          rules.splice(index, 0, rule);
        },
        hidden(state, fields) {
          props(fields, 'hidden', !!state);
          h.refresh();
        },
        hiddenStatus(id) {
          const ctx = h.getCtx(id);
          if (!ctx) return;
          return !!ctx.rule.hidden;
        },
        display(state, fields) {
          props(fields, 'display', !!state);
          h.refresh();
        },
        displayStatus(id) {
          const ctx = h.getCtx(id);
          if (!ctx) return;
          return !!ctx.rule.display;
        },
        disabled(disabled, fields) {
          tidyFields(fields).forEach(field => {
            h.getCtxs(field).forEach(ctx => {
              $set(ctx.rule.props, 'disabled', !!disabled);
            });
          });
          h.refresh();
        },
        all(origin) {
          return Object.keys(h.ctxs).map(k => {
            const ctx = h.ctxs[k];
            return origin ? ctx.origin : ctx.rule;
          });
        },
        model(origin) {
          return h.fields().reduce((initial, key) => {
            const ctx = h.fieldCtx[key][0];
            initial[key] = origin ? ctx.origin : ctx.rule;
            return initial;
          }, {});
        },
        component(origin) {
          return Object.keys(h.nameCtx).reduce((initial, key) => {
            const ctx = h.nameCtx[key].map(ctx => origin ? ctx.origin : ctx.rule);
            initial[key] = ctx.length === 1 ? ctx[0] : ctx;
            return initial;
          }, {});
        },
        bind() {
          return api.form;
        },
        reload: rules => {
          h.reloadRule(rules);
        },
        updateOptions(options) {
          h.fc.updateOptions(options);
          api.refresh();
        },
        onSubmit(fn) {
          api.updateOptions({
            onSubmit: fn
          });
        },
        sync: field => {
          if (Array.isArray(field)) {
            field.forEach(v => api.sync(v));
            return;
          }
          let ctxs = is.Object(field) ? byCtx(field) : h.getCtxs(field);
          if (!ctxs) {
            return;
          }
          ctxs = Array.isArray(ctxs) ? ctxs : [ctxs];
          ctxs.forEach(ctx => {
            if (!ctx.deleted) {
              const subForm = h.subForm[ctx.id];
              if (subForm) {
                if (Array.isArray(subForm)) {
                  subForm.forEach(form => {
                    form.refresh();
                  });
                } else if (subForm) {
                  subForm.refresh();
                }
              }
              //ctx.updateKey(true);
              h.$render.clearCache(ctx);
            }
          });
          h.refresh();
        },
        refresh: () => {
          allSubForm().forEach(sub => {
            sub.refresh();
          });
          h.$render.clearCacheAll();
          h.refresh();
        },
        refreshOptions() {
          h.$manager.updateOptions(h.options);
          api.refresh();
        },
        hideForm: hide => {
          h.vm.setupState.isShow = !hide;
        },
        changeStatus: () => {
          return h.changeStatus;
        },
        clearChangeStatus: () => {
          h.changeStatus = false;
        },
        updateRule(id, rule) {
          h.getCtxs(id).forEach(ctx => {
            extend(ctx.rule, rule);
          });
        },
        updateRules(rules) {
          Object.keys(rules).forEach(id => {
            api.updateRule(id, rules[id]);
          });
        },
        mergeRule: (id, rule) => {
          h.getCtxs(id).forEach(ctx => {
            mergeRule(ctx.rule, rule);
          });
        },
        mergeRules(rules) {
          Object.keys(rules).forEach(id => {
            api.mergeRule(id, rules[id]);
          });
        },
        getRule: (id, origin) => {
          const ctx = h.getCtx(id);
          if (ctx) {
            return origin ? ctx.origin : ctx.rule;
          }
        },
        getRenderRule: id => {
          const ctx = h.getCtx(id);
          if (ctx) {
            return ctx.prop;
          }
        },
        getRefRule: id => {
          const ctxs = h.getCtxs(id);
          if (ctxs) {
            const rules = ctxs.map(ctx => {
              return ctx.rule;
            });
            return rules.length === 1 ? rules[0] : rules;
          }
        },
        setEffect(id, attr, value) {
          const ctx = h.getCtx(id);
          if (ctx && attr) {
            if (attr[0] === '$') {
              attr = attr.substr(1);
            }
            if (hasProperty(ctx.rule, '$' + attr)) {
              $set(ctx.rule, '$' + attr, value);
            }
            if (!hasProperty(ctx.rule, 'effect')) {
              ctx.rule.effect = {};
            }
            $set(ctx.rule.effect, attr, value);
          }
        },
        clearEffectData(id, attr) {
          const ctx = h.getCtx(id);
          if (ctx) {
            if (attr && attr[0] === '$') {
              attr = attr.substr(1);
            }
            ctx.clearEffectData(attr);
            api.sync(id);
          }
        },
        updateValidate(id, validate, merge) {
          if (merge) {
            api.mergeRule(id, {
              validate
            });
          } else {
            props(id, 'validate', validate);
          }
        },
        updateValidates(validates, merge) {
          Object.keys(validates).forEach(id => {
            api.updateValidate(id, validates[id], merge);
          });
        },
        refreshValidate() {
          api.refresh();
        },
        resetFields(fields) {
          tidyFields(fields).forEach(field => {
            h.getCtxs(field).forEach(ctx => {
              h.$render.clearCache(ctx);
              ctx.rule.value = copy(ctx.defaultValue);
            });
          });
        },
        method(id, name) {
          const el = api.el(id);
          if (!el || !el[name]) throw new Error(format('err', `${name}方法不存在`));
          return (...args) => {
            return el[name](...args);
          };
        },
        exec(id, name, ...args) {
          return invoke(() => api.method(id, name)(...args));
        },
        toJson(space) {
          return toJson(api.rule, space);
        },
        trigger(id, event, ...args) {
          const el = api.el(id);
          el && el.$emit(event, ...args);
        },
        el(id) {
          const ctx = h.getCtx(id);
          if (ctx) return ctx.el || h.vm.refs[ctx.ref];
        },
        closeModal: id => {
          h.bus.$emit('fc:closeModal:' + id);
        },
        getSubForm(field) {
          const ctx = h.getCtx(field);
          return ctx ? h.subForm[ctx.id] : undefined;
        },
        getChildrenRuleList(id) {
          const flag = typeof id === 'object';
          const ctx = flag ? byCtx(id) : h.getCtx(id);
          const rule = ctx ? ctx.rule : flag ? id : api.getRule(id);
          if (!rule) {
            return [];
          }
          const rules = [];
          const findRules = children => {
            children && children.forEach(item => {
              if (typeof item !== 'object') {
                return;
              }
              if (item.field) {
                rules.push(item);
              }
              rules.push(...api.getChildrenRuleList(item));
            });
          };
          findRules(ctx ? ctx.loadChildrenPending() : rule.children);
          return rules;
        },
        getChildrenFormData(id) {
          const rules = api.getChildrenRuleList(id);
          return rules.reduce((formData, rule) => {
            formData[rule.field] = copy(rule.value);
            return formData;
          }, {});
        },
        setChildrenFormData(id, formData, cover) {
          const rules = api.getChildrenRuleList(id);
          rules.forEach(rule => {
            if (hasProperty(formData, rule.field)) {
              rule.value = formData[rule.field];
            } else if (cover) {
              rule.value = undefined;
            }
          });
        },
        getGlobalEvent(name) {
          let event = api.options.globalEvent[name];
          if (event) {
            if (typeof event === 'object') {
              event = event.handle;
            }
            return parseFn(event);
          }
          return undefined;
        },
        getGlobalData(name) {
          return new Promise((resolve, inject) => {
            let config = api.options.globalData[name];
            if (!config) {
              resolve(h.fc.loadData[name]);
            }
            if (config.type === 'fetch') {
              api.fetch(config).then(res => {
                resolve({
                  res,
                  config
                });
              }).catch(inject);
            } else {
              resolve(config.data);
            }
          });
        },
        nextTick(fn) {
          h.bus.$once('next-tick', fn);
          h.refresh();
        },
        nextRefresh(fn) {
          h.nextRefresh();
          fn && invoke(fn);
        },
        deferSyncValue(fn, sync) {
          h.deferSyncValue(fn, sync);
        },
        emit(name, ...args) {
          h.vm.emit(name, ...args);
        },
        bus: h.bus,
        fetch(opt) {
          h.options.beforeFetch && invoke(() => h.options.beforeFetch(opt, {
            api
          }));
          return asyncFetch(opt);
        },
        helper: {
          tidyFields,
          props
        }
      };
      ['on', 'once', 'off'].forEach(n => {
        api[n] = function (...args) {
          h.bus[`$${n}`](...args);
        };
      });
      api.changeValue = api.changeField = api.setValue;
      return api;
    }

    function useCache(Render) {
      extend(Render.prototype, {
        initCache() {
          this.clearCacheAll();
        },
        clearCache(ctx) {
          if (ctx.rule.cache) {
            return;
          }
          if (!this.cache[ctx.id]) {
            if (ctx.parent) {
              this.clearCache(ctx.parent);
            }
            return;
          }
          if (this.cache[ctx.id].use === true || this.cache[ctx.id].parent) {
            this.$handle.refresh();
          }
          if (this.cache[ctx.id].parent) {
            this.clearCache(this.cache[ctx.id].parent);
          }
          this.cache[ctx.id] = null;
        },
        clearCacheAll() {
          this.cache = {};
        },
        setCache(ctx, vnode, parent) {
          this.cache[ctx.id] = {
            vnode,
            use: false,
            parent,
            slot: ctx.rule.slot
          };
        },
        getCache(ctx) {
          const cache = this.cache[ctx.id];
          if (cache) {
            cache.use = true;
            return cache.vnode;
          }
          return undefined;
        }
      });
    }

    function toCase(str) {
      const to = str.replace(/(-[a-z])/g, function (v) {
        return v.replace('-', '').toLocaleUpperCase();
      });
      return lower(to);
    }
    function lower(str) {
      return str.replace(str[0], str[0].toLowerCase());
    }

    function useRender$1(Render) {
      extend(Render.prototype, {
        initRender() {
          this.cacheConfig = {};
        },
        getTypeSlot(ctx) {
          const _fn = vm => {
            if (vm) {
              let slot = undefined;
              if (ctx.rule.field) {
                slot = vm.slots['field-' + toLine(ctx.rule.field)] || vm.slots['field-' + ctx.rule.field];
              }
              if (!slot) {
                slot = vm.slots['type-' + toLine(ctx.type)] || vm.slots['type-' + ctx.type];
              }
              if (slot) {
                return slot;
              }
              return _fn(vm.setupState.parent);
            }
          };
          return _fn(this.vm);
        },
        render() {
          // console.warn('renderrrrr', this.id);
          if (!this.vm.setupState.isShow) {
            return;
          }
          this.$manager.beforeRender();
          const slotBag = makeSlotBag();
          this.sort.forEach(k => {
            this.renderSlot(slotBag, this.$handle.ctxs[k]);
          });
          return this.$manager.render(slotBag);
        },
        renderSlot(slotBag, ctx, parent) {
          if (this.isFragment(ctx)) {
            ctx.initProp();
            this.mergeGlobal(ctx);
            ctx.initNone();
            const slots = this.renderChildren(ctx.loadChildrenPending(), ctx);
            const def = slots.default;
            def && slotBag.setSlot(ctx.rule.slot, () => def());
            delete slots.default;
            slotBag.mergeBag(slots);
          } else {
            slotBag.setSlot(ctx.rule.slot, this.renderCtx(ctx, parent));
          }
        },
        mergeGlobal(ctx) {
          const g = this.$handle.options.global;
          if (!g) return;
          if (!this.cacheConfig[ctx.trueType]) {
            this.cacheConfig[ctx.trueType] = vue.computed(() => {
              const g = this.$handle.options.global;
              return mergeRule({}, [g['*'], g[ctx.originType] || g[ctx.type] || g[ctx.type] || {}]);
            });
          }
          ctx.prop = mergeRule({}, [this.cacheConfig[ctx.trueType].value, ctx.prop]);
        },
        setOptions(ctx) {
          const opt = ctx.loadPending({
            key: 'options',
            origin: ctx.prop.options,
            def: []
          });
          ctx.prop.options = opt;
          if (ctx.prop.optionsTo && opt) {
            deepSet(ctx.prop, ctx.prop.optionsTo, opt);
          }
        },
        deepSet(ctx) {
          const deep = ctx.rule.deep;
          deep && Object.keys(deep).sort((a, b) => a.length < b.length ? -1 : 1).forEach(str => {
            deepSet(ctx.prop, str, deep[str]);
          });
        },
        parseSide(side, ctx) {
          return is.Object(side) ? mergeRule({
            props: {
              formCreateInject: ctx.prop.props.formCreateInject
            }
          }, side) : side;
        },
        renderSides(vn, ctx, temp) {
          const prop = ctx[temp ? 'rule' : 'prop'];
          return [this.renderRule(this.parseSide(prop.prefix, ctx)), vn, this.renderRule(this.parseSide(prop.suffix, ctx))];
        },
        renderId(name, type) {
          const ctxs = this.$handle[type === 'field' ? 'fieldCtx' : 'nameCtx'][name];
          return ctxs ? ctxs.map(ctx => this.renderCtx(ctx, ctx.parent)) : undefined;
        },
        renderCtx(ctx, parent) {
          try {
            if (ctx.type === 'hidden') return;
            const rule = ctx.rule;
            if (!this.cache[ctx.id] || this.cache[ctx.id].slot !== rule.slot) {
              let vn;
              ctx.initProp();
              this.mergeGlobal(ctx);
              ctx.initNone();
              this.$manager.tidyRule(ctx);
              this.deepSet(ctx);
              this.setOptions(ctx);
              this.ctxProp(ctx);
              let prop = ctx.prop;
              prop.preview = !!(hasProperty(prop, 'preview') ? prop.preview : this.options.preview || false);
              prop.props.formCreateInject = this.injectProp(ctx);
              let cacheFlag = prop.cache !== false;
              const preview = prop.preview;
              if (prop.hidden) {
                this.setCache(ctx, undefined, parent);
                return;
              }
              vn = (...slotValue) => {
                const inject = {
                  rule,
                  prop,
                  preview,
                  api: this.$handle.api,
                  model: prop.model || {},
                  slotValue
                };
                if (slotValue.length && rule.slotUpdate) {
                  invoke(() => rule.slotUpdate(inject));
                }
                let children = {};
                const _load = ctx.loadChildrenPending();
                if (ctx.parser.renderChildren) {
                  children = ctx.parser.renderChildren(_load, ctx);
                } else if (ctx.parser.loadChildren !== false) {
                  children = this.renderChildren(_load, ctx);
                }
                const slot = this.getTypeSlot(ctx);
                let _vn;
                if (slot) {
                  inject.children = children;
                  _vn = slot(inject);
                } else {
                  _vn = preview ? ctx.parser.preview(copy$1(children), ctx) : ctx.parser.render(copy$1(children), ctx);
                }
                _vn = this.renderSides(_vn, ctx);
                if (!(!ctx.input && is.Undef(prop.native)) && prop.native !== true) {
                  _vn = this.$manager.makeWrap(ctx, _vn);
                }
                if (ctx.none) {
                  if (Array.isArray(_vn)) {
                    _vn = _vn.map(v => {
                      if (!v || !v.__v_isVNode) {
                        return v;
                      }
                      return this.none(v);
                    });
                  } else {
                    _vn = this.none(_vn);
                  }
                }
                cacheFlag && this.setCache(ctx, () => {
                  return this.stable(_vn);
                }, parent);
                return _vn;
              };
              this.setCache(ctx, vn, parent);
            }
            return (...args) => {
              const cache = this.getCache(ctx);
              if (cache) {
                return cache(...args);
              } else if (this.cache[ctx.id]) {
                return;
              }
              const _vn = this.renderCtx(ctx, ctx.parent);
              if (_vn) {
                return _vn();
              }
            };
          } catch (e) {
            console.error(e);
            return;
          }
        },
        none(vn) {
          if (vn) {
            if (Array.isArray(vn.props.class)) {
              vn.props.class.push('fc-none');
            } else {
              vn.props.class = vn.props.class ? [vn.props.class, 'fc-none'] : 'fc-none';
            }
            return vn;
          }
        },
        stable(vn) {
          const list = Array.isArray(vn) ? vn : [vn];
          list.forEach(v => {
            if (v && v.__v_isVNode && v.children && typeof v.children === 'object') {
              v.children.$stable = true;
              this.stable(v.children);
            }
          });
          return vn;
        },
        getModelField(ctx) {
          return ctx.rule.modelField || ctx.parser.modelField || this.fc.modelFields[this.vNode.aliasMap[ctx.type]] || this.fc.modelFields[ctx.type] || this.fc.modelFields[ctx.originType] || 'modelValue';
        },
        isFragment(ctx) {
          return ctx.type === 'fragment' || ctx.type === 'template';
        },
        injectProp(ctx) {
          const state = this.vm.setupState;
          if (!state.ctxInject[ctx.id]) {
            state.ctxInject[ctx.id] = {
              api: this.$handle.api,
              form: this.fc.create,
              subForm: subForm => {
                this.$handle.addSubForm(ctx, subForm);
              },
              getSubForm: () => {
                return this.$handle.subForm[ctx.id];
              },
              options: [],
              children: [],
              preview: false,
              id: ctx.id,
              field: ctx.field,
              rule: ctx.rule,
              input: ctx.input
            };
          }
          const inject = state.ctxInject[ctx.id];
          extend(inject, {
            preview: ctx.prop.preview,
            options: ctx.prop.options,
            children: ctx.loadChildrenPending()
          });
          return inject;
        },
        ctxProp(ctx) {
          const {
            ref,
            key,
            rule
          } = ctx;
          this.$manager.mergeProp(ctx);
          ctx.parser.mergeProp(ctx);
          const props = [{
            ref: ref,
            key: rule.key || `${key}fc`,
            slot: undefined,
            on: {
              vnodeMounted: vn => {
                vn.el.__rule__ = ctx.rule;
                this.onMounted(ctx, vn.el);
              },
              'fc.el': el => {
                ctx.exportEl = el;
                if (el) {
                  (el.$el || el).__rule__ = ctx.rule;
                }
              }
            }
          }];
          if (ctx.input) {
            if (this.vm.props.disabled !== undefined) {
              ctx.prop.props.disabled = !!this.vm.props.disabled;
            }
            const field = this.getModelField(ctx);
            const model = {
              callback: value => {
                this.onInput(ctx, value);
              },
              value: this.$handle.getFormData(ctx)
            };
            props.push({
              on: {
                [`update:${field}`]: model.callback,
                ...(ctx.prop.modelEmit ? {
                  [ctx.prop.modelEmit]: () => this.onEmitInput(ctx)
                } : {})
              },
              props: {
                [field]: model.value
              }
            });
            ctx.prop.model = model;
          }
          mergeProps(props, ctx.prop);
          return ctx.prop;
        },
        onMounted(ctx, el) {
          ctx.el = this.vm.refs[ctx.ref] || el;
          ctx.parser.mounted(ctx);
          this.$handle.effect(ctx, 'mounted');
        },
        onInput(ctx, value) {
          if (ctx.prop.modelEmit) {
            this.$handle.onBaseInput(ctx, value);
            return;
          }
          this.$handle.onInput(ctx, value);
        },
        onEmitInput(ctx) {
          this.$handle.setValue(ctx, ctx.parser.toValue(ctx.modelValue, ctx), ctx.modelValue);
        },
        renderChildren(children, ctx) {
          if (!is.trueArray(children)) return {};
          const slotBag = makeSlotBag();
          children.map(child => {
            if (!child) return;
            if (is.String(child)) return slotBag.setSlot(null, child);
            if (child.__fc__) {
              return this.renderSlot(slotBag, child.__fc__, ctx);
            }
            if (child.type) {
              vue.nextTick(() => {
                this.$handle.loadChildren(children, ctx);
                this.$handle.refresh();
              });
            }
          });
          return slotBag.getSlots();
        },
        defaultRender(ctx, children) {
          const prop = ctx.prop;
          if (prop.component) return this.vNode.makeComponent(prop.component, prop, children);
          if (this.vNode[ctx.type]) return this.vNode[ctx.type](prop, children);
          if (this.vNode[ctx.originType]) return this.vNode[ctx.originType](prop, children);
          return this.vNode.make(lower(ctx.originType), prop, children);
        },
        renderRule(rule, children, origin) {
          if (!rule) return undefined;
          if (is.String(rule)) return rule;
          let type;
          if (origin) {
            type = rule.type;
          } else {
            type = rule.is;
            if (rule.type) {
              type = toCase(rule.type);
              const alias = this.vNode.aliasMap[type];
              if (alias) type = toCase(alias);
            }
          }
          if (!type) return undefined;
          const slotBag = makeSlotBag();
          if (is.trueArray(rule.children)) {
            rule.children.forEach(v => {
              v && slotBag.setSlot(v === null || v === void 0 ? void 0 : v.slot, () => this.renderRule(v));
            });
          }
          const props = {
            ...rule
          };
          delete props.type;
          delete props.is;
          return this.vNode.make(type, props, slotBag.mergeBag(children).getSlots());
        }
      });
    }

    let id$1 = 1;
    function Render(handle) {
      extend(this, {
        $handle: handle,
        fc: handle.fc,
        vm: handle.vm,
        $manager: handle.$manager,
        vNode: new handle.fc.CreateNode(handle.vm),
        id: id$1++
      });
      funcProxy(this, {
        options() {
          return handle.options;
        },
        sort() {
          return handle.sort;
        }
      });
      this.initCache();
      this.initRender();
    }
    useCache(Render);
    useRender$1(Render);

    function useInject(Handler) {
      extend(Handler.prototype, {
        parseInjectEvent(rule, on) {
          const inject = rule.inject || this.options.injectEvent;
          return this.parseEventLst(rule, on, inject);
        },
        parseEventLst(rule, data, inject, deep) {
          Object.keys(data).forEach(k => {
            const fn = this.parseEvent(rule, data[k], inject, deep);
            if (fn) {
              data[k] = fn;
            }
          });
          return data;
        },
        parseEvent(rule, fn, inject, deep) {
          if (is.Function(fn) && (inject !== false && !is.Undef(inject) || fn.__inject)) {
            return this.inject(rule, fn, inject);
          } else if (!deep && Array.isArray(fn) && fn[0] && (is.String(fn[0]) || is.Function(fn[0]))) {
            return this.parseEventLst(rule, fn, inject, true);
          } else if (is.String(fn)) {
            const val = parseFn(fn);
            if (val && fn !== val) {
              return val.__inject ? this.parseEvent(rule, val, inject, true) : val;
            }
          }
        },
        parseEmit(ctx) {
          let event = {},
            rule = ctx.rule,
            {
              emitPrefix,
              field,
              name,
              inject
            } = rule;
          let emit = rule.emit || [];
          if (is.trueArray(emit)) {
            emit.forEach(eventName => {
              if (!eventName) return;
              let eventInject;
              let emitKey = emitPrefix || field || name;
              if (is.Object(eventName)) {
                eventInject = eventName.inject;
                eventName = eventName.name;
                emitKey = eventName.prefix || emitKey;
              }
              if (emitKey) {
                const fieldKey = toLine(`${emitKey}-${eventName}`);
                const fn = (...arg) => {
                  if (this.vm.emitsOptions) {
                    this.vm.emitsOptions[fieldKey] = null;
                  }
                  this.vm.emit(fieldKey, ...arg);
                  this.vm.emit('emit-event', fieldKey, ...arg);
                  this.bus.$emit(fieldKey, ...arg);
                };
                fn.__emit = true;
                if (!eventInject && inject === false) {
                  event[eventName] = fn;
                } else {
                  let _inject = eventInject || inject || this.options.injectEvent;
                  event[eventName] = is.Undef(_inject) ? fn : this.inject(rule, fn, _inject);
                }
              }
            });
          }
          ctx.computed.on = event;
          return event;
        },
        getInjectData(self, inject) {
          const {
            option,
            rule
          } = this.vm.props;
          return {
            $f: this.api,
            api: this.api,
            rule,
            self: self.__origin__,
            option,
            inject
          };
        },
        inject(self, _fn, inject) {
          if (_fn.__origin) {
            if (this.watching && !this.loading) return _fn;
            _fn = _fn.__origin;
          }
          const h = this;
          const fn = function (...args) {
            const data = h.getInjectData(self, inject);
            data.args = [...args];
            args.unshift(data);
            return _fn.apply(this, args);
          };
          fn.__origin = _fn;
          fn.__json = _fn.__json;
          return fn;
        }
      });
    }

    const EVENT = ['hook:updated', 'hook:mounted'];
    function usePage(Handler) {
      extend(Handler.prototype, {
        usePage() {
          const page = this.options.page;
          if (!page) return;
          let first = 25;
          let limit = getLimit(this.rules);
          if (is.Object(page)) {
            if (page.first) first = parseInt(page.first, 10) || first;
            if (page.limit) limit = parseInt(page.limit, 10) || limit;
          }
          extend(this, {
            first,
            limit,
            pageEnd: this.rules.length <= first
          });
          this.bus.$on('page-end', () => this.vm.emit('page-end', this.api));
          this.pageLoad();
        },
        pageLoad() {
          const pageFn = () => {
            if (this.pageEnd) {
              this.bus.$off(EVENT, pageFn);
              this.bus.$emit('page-end');
            } else {
              this.first += this.limit;
              this.pageEnd = this.rules.length <= this.first;
              this.loadRule();
              this.refresh();
            }
          };
          this.bus.$on(EVENT, pageFn);
        }
      });
    }
    function getLimit(rules) {
      return rules.length < 31 ? 31 : Math.ceil(rules.length / 3);
    }

    function useRender(Handler) {
      extend(Handler.prototype, {
        clearNextTick() {
          this.nextTick && clearTimeout(this.nextTick);
          this.nextTick = null;
        },
        bindNextTick(fn) {
          this.clearNextTick();
          this.nextTick = setTimeout(() => {
            fn();
            this.nextTick = null;
          }, 10);
        },
        render() {
          // console.warn('%c render', 'color:green');
          ++this.loadedId;
          if (this.vm.setupState.unique > 0) return this.$render.render();else {
            this.vm.setupState.unique = 1;
            return [];
          }
        }
      });
    }

    function bind(ctx) {
      Object.defineProperties(ctx.origin, {
        __fc__: enumerable(vue.markRaw(ctx), true)
      });
    }
    function RuleContext(handle, rule, defaultValue) {
      const id = uniqueId();
      const isInput = !!rule.field;
      extend(this, {
        id,
        ref: id,
        wrapRef: id + 'fi',
        rule,
        origin: rule.__origin__ || rule,
        name: rule.name,
        pending: {},
        none: false,
        watch: [],
        linkOn: [],
        root: [],
        ctrlRule: [],
        children: [],
        parent: null,
        group: rule.subRule ? this : null,
        cacheConfig: null,
        prop: {
          ...rule
        },
        computed: {},
        payload: {},
        refRule: {},
        input: isInput,
        el: undefined,
        exportEl: undefined,
        defaultValue: isInput ? deepCopy(defaultValue) : undefined,
        field: rule.field || undefined
      });
      this.updateType();
      this.updateKey();
      bind(this);
      this.update(handle, true);
    }
    extend(RuleContext.prototype, {
      getParentGroup() {
        let ctx = this.parent;
        while (ctx) {
          if (ctx.group) {
            return ctx;
          }
          ctx = ctx.parent;
        }
      },
      loadChildrenPending() {
        const children = this.rule.children || [];
        if (Array.isArray(children)) return children;
        return this.loadPending({
          key: 'children',
          origin: children,
          def: [],
          onLoad: data => {
            this.$handle && this.$handle.loadChildren(data, this);
          },
          onUpdate: (value, oldValue) => {
            if (this.$handle) {
              value === oldValue ? this.$handle.loadChildren(value, this) : this.$handle.updateChildren(this, value, oldValue);
            }
          },
          onReload: value => {
            if (this.$handle) {
              this.$handle.updateChildren(this, [], value);
            } else {
              delete this.pending.children;
            }
          }
        });
      },
      loadPending(config) {
        const {
          key,
          origin,
          def,
          onLoad,
          onReload,
          onUpdate
        } = config;
        if (this.pending[key] && this.pending[key].origin === origin) {
          return this.getPending(key, def);
        }
        delete this.pending[key];
        let value = origin;
        if (is.Function(origin)) {
          let source = invoke(() => origin({
            rule: this.rule,
            api: this.$api,
            update: data => {
              const value = data || def;
              const oldValue = this.getPending(key, def);
              this.setPending(key, origin, value);
              onUpdate && onUpdate(value, oldValue);
            },
            reload: () => {
              const oldValue = this.getPending(key, def);
              delete this.pending[key];
              onReload && onReload(oldValue);
              this.$api && this.$api.sync(this.rule);
            }
          }));
          if (source && is.Function(source.then)) {
            source.then(data => {
              const value = data || def;
              this.setPending(key, origin, value);
              onLoad && onLoad(value);
              this.$api && this.$api.sync(this.rule);
            }).catch(e => {
              console.error(e);
            });
            value = def;
            this.setPending(key, origin, value);
          } else {
            value = source || def;
            this.setPending(key, origin, value);
            onLoad && onLoad(value);
          }
        }
        return value;
      },
      getPending(key, def) {
        return this.pending[key] && this.pending[key].value || def;
      },
      setPending(key, origin, value) {
        this.pending[key] = {
          origin,
          value: vue.reactive(value)
        };
      },
      effectData(name) {
        if (!this.payload[name]) {
          this.payload[name] = {};
        }
        return this.payload[name];
      },
      clearEffectData(name) {
        if (name === undefined) {
          this.payload = {};
        } else {
          delete this.payload[name];
        }
      },
      updateKey(flag) {
        this.key = uniqueId();
        flag && this.parent && this.parent.updateKey(flag);
      },
      updateType() {
        this.originType = this.rule.type;
        this.type = toCase(this.rule.type);
      },
      setParser(parser) {
        this.parser = parser;
        parser.init(this);
      },
      initProp() {
        const rule = {
          ...this.rule
        };
        delete rule.children;
        this.prop = mergeRule({}, [rule, ...Object.keys(this.payload).map(k => this.payload[k]), this.computed]);
      },
      initNone() {
        this.none = !(is.Undef(this.prop.display) || !!this.prop.display);
      },
      injectValidate() {
        return toArray(this.prop.validate).map(item => {
          return {
            ...item,
            inject: {
              id: this.id,
              field: this.field,
              rule: this.rule,
              api: this.$handle.api
            }
          };
        });
      },
      check(handle) {
        return this.vm === handle.vm;
      },
      unwatch() {
        this.watch.forEach(un => un());
        this.watch = [];
        this.refRule = {};
      },
      unlink() {
        this.linkOn.forEach(un => un());
        this.linkOn = [];
      },
      link() {
        this.unlink();
        this.$handle.appendLink(this);
      },
      watchTo() {
        this.$handle.watchCtx(this);
      },
      delete() {
        const undef = void 0;
        this.unwatch();
        this.unlink();
        this.rmCtrl();
        if (this.parent) {
          this.parent.children.splice(this.parent.children.indexOf(this) >>> 0, 1);
        }
        extend(this, {
          deleted: true,
          prop: {
            ...this.rule
          },
          computed: {},
          el: undef,
          $handle: undef,
          $render: undef,
          $api: undef,
          vm: undef,
          vNode: undef,
          parent: null,
          children: [],
          cacheConfig: null,
          none: false
        });
      },
      rmCtrl() {
        this.ctrlRule.forEach(ctrl => ctrl.__fc__ && ctrl.__fc__.rm());
        this.ctrlRule = [];
      },
      rm() {
        const _rm = () => {
          let index = this.root.indexOf(this.origin);
          if (index > -1) {
            this.root.splice(index, 1);
            this.$handle && this.$handle.refresh();
          }
        };
        if (this.deleted) {
          _rm();
          return;
        }
        this.$handle.noWatch(() => {
          this.$handle.deferSyncValue(() => {
            this.rmCtrl();
            _rm();
            this.$handle.rmCtx(this);
            extend(this, {
              root: []
            });
          }, this.input);
        });
      },
      update(handle, init) {
        extend(this, {
          deleted: false,
          $handle: handle,
          $render: handle.$render,
          $api: handle.api,
          vm: handle.vm,
          trueType: handle.getType(this.originType),
          vNode: handle.$render.vNode,
          updated: false,
          cacheValue: this.rule.value
        });
        !init && this.unwatch();
        this.watchTo();
        this.link();
      }
    });

    const condition = {
      '==': b => a => a === b,
      '!=': b => a => a !== b,
      '<>': b => a => a !== b,
      '>': b => a => a > b,
      '>=': b => a => a >= b,
      '<': b => a => a < b,
      '<=': b => a => a <= b,
      'in': b => a => b && b.indexOf && b.indexOf(a) > -1,
      'on': b => a => a && a.indexOf && a.indexOf(b) > -1,
      'notIn': b => a => !condition.in(b)(a),
      'notOn': b => a => !condition.on(b)(a),
      'between': b => a => a > b[0] && a < b[1],
      'notBetween': b => a => a < b[0] || a > b[1]
    };
    function useLoader(Handler) {
      extend(Handler.prototype, {
        nextRefresh(fn) {
          const id = this.loadedId;
          vue.nextTick(() => {
            id === this.loadedId && (fn ? fn() : this.refresh());
          });
        },
        parseRule(_rule) {
          const rule = getRule(_rule);
          Object.defineProperties(rule, {
            __origin__: enumerable(_rule, true)
          });
          fullRule(rule);
          this.appendValue(rule);
          [rule, rule['prefix'], rule['suffix']].forEach(item => {
            if (!item) {
              return;
            }
            this.loadFn(item, rule);
          });
          this.loadCtrl(rule);
          if (rule.update) {
            rule.update = parseFn(rule.update);
          }
          return rule;
        },
        loadFn(item, rule) {
          ['on', 'props', 'deep'].forEach(k => {
            item[k] && this.parseInjectEvent(rule, item[k]);
          });
        },
        loadCtrl(rule) {
          rule.control && rule.control.forEach(ctrl => {
            if (ctrl.handle) {
              ctrl.handle = parseFn(ctrl.handle);
            }
          });
        },
        syncProp(ctx) {
          const rule = ctx.rule;
          is.trueArray(rule.sync) && mergeProps([{
            on: rule.sync.reduce((pre, prop) => {
              pre[`update:${prop}`] = val => {
                rule.props[prop] = val;
                this.vm.emit('sync', prop, val, rule, this.fapi);
              };
              return pre;
            }, {})
          }], ctx.computed);
        },
        loadRule() {
          // console.warn('%c load', 'color:blue');
          this.cycleLoad = false;
          this.loading = true;
          if (this.pageEnd) {
            this.bus.$emit('load-start');
          }
          this.deferSyncValue(() => {
            this._loadRule(this.rules);
            this.loading = false;
            if (this.cycleLoad && this.pageEnd) {
              return this.loadRule();
            }
            this.syncForm();
            if (this.pageEnd) {
              this.bus.$emit('load-end');
            }
            this.vm.setupState.renderRule();
          });
        },
        loadChildren(children, parent) {
          this.cycleLoad = false;
          this.loading = true;
          this.bus.$emit('load-start');
          this._loadRule(children, parent);
          this.loading = false;
          if (this.cycleLoad) {
            return this.loadRule();
          } else {
            this.syncForm();
            this.bus.$emit('load-end');
          }
          this.$render.clearCache(parent);
        },
        _loadRule(rules, parent) {
          const preIndex = i => {
            let pre = rules[i - 1];
            if (!pre || !pre.__fc__) {
              return i > 0 ? preIndex(i - 1) : -1;
            }
            let index = this.sort.indexOf(pre.__fc__.id);
            return index > -1 ? index : preIndex(i - 1);
          };
          const loadChildren = (children, parent) => {
            if (is.trueArray(children)) {
              this._loadRule(children, parent);
            }
          };
          const ctxs = rules.map((_rule, index) => {
            if (parent && !is.Object(_rule)) return;
            if (!this.pageEnd && !parent && index >= this.first) return;
            if (_rule.__fc__ && _rule.__fc__.root === rules && this.ctxs[_rule.__fc__.id]) {
              loadChildren(_rule.__fc__.loadChildrenPending(), _rule.__fc__);
              return _rule.__fc__;
            }
            let rule = getRule(_rule);
            const isRepeat = () => {
              return !!(rule.field && this.fieldCtx[rule.field] && this.fieldCtx[rule.field][0] !== _rule.__fc__);
            };
            this.ruleEffect(rule, 'init', {
              repeat: isRepeat()
            });
            if (isRepeat()) {
              this.vm.emit('repeat-field', _rule, this.api);
            }
            let ctx;
            let isCopy = false;
            let isInit = !!_rule.__fc__;
            let defaultValue = rule.value;
            if (isInit) {
              ctx = _rule.__fc__;
              defaultValue = ctx.defaultValue;
              const check = !ctx.check(this);
              if (ctx.deleted) {
                if (check) {
                  if (isCtrl(ctx)) {
                    return;
                  }
                  ctx.update(this);
                }
              } else {
                if (check) {
                  if (isCtrl(ctx)) {
                    return;
                  }
                  rules[index] = _rule = _rule._clone ? _rule._clone() : copyRule(_rule);
                  ctx = null;
                  isCopy = true;
                }
              }
            }
            if (!ctx) {
              const rule = this.parseRule(_rule);
              ctx = new RuleContext(this, rule, isInit ? defaultValue : rule.value);
              this.bindParser(ctx);
            } else {
              if (ctx.originType !== ctx.rule.type) {
                ctx.updateType();
                this.bindParser(ctx);
              }
              this.appendValue(ctx.rule);
              if (ctx.parent && ctx.parent !== parent) {
                this.rmSubRuleData(ctx);
              }
            }
            this.parseEmit(ctx);
            this.syncProp(ctx);
            ctx.parent = parent || null;
            ctx.root = rules;
            this.setCtx(ctx);
            !isCopy && !isInit && this.effect(ctx, 'load');
            this.effect(ctx, 'created');
            const _load = ctx.loadChildrenPending();
            ctx.parser.loadChildren === false || loadChildren(_load, ctx);
            if (!parent) {
              const _preIndex = preIndex(index);
              if (_preIndex > -1 || !index) {
                this.sort.splice(_preIndex + 1, 0, ctx.id);
              } else {
                this.sort.push(ctx.id);
              }
            }
            const r = ctx.rule;
            if (!ctx.updated) {
              ctx.updated = true;
              if (is.Function(r.update)) {
                this.bus.$once('load-end', () => {
                  this.refreshUpdate(ctx, r.value, 'init');
                });
              }
              this.effect(ctx, 'loaded');
            }

            // if (ctx.input)
            //     Object.defineProperty(r, 'value', this.valueHandle(ctx));
            if (this.refreshControl(ctx)) this.cycleLoad = true;
            return ctx;
          }).filter(v => !!v);
          if (parent) {
            parent.children = ctxs;
          }
        },
        refreshControl(ctx) {
          return ctx.input && ctx.rule.control && this.useCtrl(ctx);
        },
        useCtrl(ctx) {
          const controls = getCtrl(ctx),
            validate = [],
            api = this.api;
          if (!controls.length) return false;
          for (let i = 0; i < controls.length; i++) {
            const control = controls[i],
              handleFn = control.handle || (condition[control.condition || '=='] || condition['=='])(control.value);
            if (!is.trueArray(control.rule)) continue;
            const data = {
              ...control,
              valid: invoke(() => handleFn(ctx.rule.value, api)),
              ctrl: findCtrl(ctx, control.rule),
              isHidden: is.String(control.rule[0])
            };
            if (data.valid && data.ctrl || !data.valid && !data.ctrl && !data.isHidden) continue;
            validate.push(data);
          }
          if (!validate.length) return false;
          const hideLst = [];
          let flag = false;
          this.deferSyncValue(() => {
            validate.reverse().forEach(({
              isHidden,
              valid,
              rule,
              prepend,
              append,
              child,
              ctrl,
              method
            }) => {
              if (isHidden) {
                valid ? ctx.ctrlRule.push({
                  __ctrl: true,
                  children: rule,
                  valid
                }) : ctx.ctrlRule.splice(ctx.ctrlRule.indexOf(ctrl), 1);
                hideLst[valid ? 'push' : 'unshift'](() => {
                  if (method === 'disabled') {
                    this.api.disabled(!valid, rule);
                  } else if (method === 'display') {
                    this.api.display(valid, rule);
                  } else if (method === 'required') {
                    rule.forEach(item => {
                      this.api.setEffect(item, 'required', valid);
                    });
                    if (!valid) {
                      this.api.clearValidateState(rule);
                    }
                  } else {
                    this.api.hidden(!valid, rule);
                  }
                });
                return;
              }
              if (valid) {
                flag = true;
                const ruleCon = {
                  type: 'fragment',
                  native: true,
                  __ctrl: true,
                  children: rule
                };
                ctx.ctrlRule.push(ruleCon);
                this.bus.$once('load-start', () => {
                  // this.cycleLoad = true;
                  if (prepend) {
                    api.prepend(ruleCon, prepend, child);
                  } else if (append || child) {
                    api.append(ruleCon, append || ctx.id, child);
                  } else {
                    ctx.root.splice(ctx.root.indexOf(ctx.origin) + 1, 0, ruleCon);
                  }
                });
              } else {
                ctx.ctrlRule.splice(ctx.ctrlRule.indexOf(ctrl), 1);
                const ctrlCtx = byCtx(ctrl);
                ctrlCtx && ctrlCtx.rm();
              }
            });
          });
          hideLst.length && vue.nextTick(() => {
            hideLst.forEach(v => v());
          });
          this.vm.emit('control', ctx.origin, this.api);
          this.effect(ctx, 'control');
          return flag;
        },
        reloadRule(rules) {
          return this._reloadRule(rules);
        },
        _reloadRule(rules) {
          // console.warn('%c reload', 'color:red');
          if (!rules) rules = this.rules;
          const ctxs = {
            ...this.ctxs
          };
          this.clearNextTick();
          this.initData(rules);
          this.fc.rules = rules;
          this.deferSyncValue(() => {
            this.bus.$once('load-end', () => {
              Object.keys(ctxs).filter(id => this.ctxs[id] === undefined).forEach(id => this.rmCtx(ctxs[id]));
              this.$render.clearCacheAll();
            });
            this.reloading = true;
            this.loadRule();
            this.reloading = false;
            this.refresh();
            this.bus.$emit('reloading', this.api);
          });
          this.bus.$off('next-tick', this.nextReload);
          this.bus.$once('next-tick', this.nextReload);
          this.bus.$emit('update', this.api);
        },
        //todo 组件生成全部通过 alias
        refresh() {
          this.vm.setupState.refresh();
        }
      });
    }
    function fullRule(rule) {
      const def = baseRule();
      Object.keys(def).forEach(k => {
        if (!hasProperty(rule, k)) rule[k] = def[k];
      });
      return rule;
    }
    function getCtrl(ctx) {
      const control = ctx.rule.control || [];
      if (is.Object(control)) return [control];else return control;
    }
    function findCtrl(ctx, rule) {
      for (let i = 0; i < ctx.ctrlRule.length; i++) {
        const ctrl = ctx.ctrlRule[i];
        if (ctrl.children === rule) return ctrl;
      }
    }
    function isCtrl(ctx) {
      return !!ctx.rule.__ctrl;
    }

    function useInput(Handler) {
      extend(Handler.prototype, {
        setValue(ctx, value, formValue, setFlag) {
          if (ctx.deleted) return;
          ctx.rule.value = value;
          this.changeStatus = true;
          this.nextRefresh();
          this.$render.clearCache(ctx);
          this.setFormData(ctx, formValue);
          this.syncValue();
          this.valueChange(ctx, value);
          this.vm.emit('change', ctx.field, value, ctx.origin, this.api, setFlag || false);
          this.effect(ctx, 'value');
          this.emitEvent('change', ctx.field, value, {
            rule: ctx.origin,
            api: this.api,
            setFlag: setFlag || false
          });
        },
        onInput(ctx, value) {
          let val;
          if (ctx.input && (this.isQuote(ctx, val = ctx.parser.toValue(value, ctx)) || this.isChange(ctx, value))) {
            this.setValue(ctx, val, value);
          }
        },
        onBaseInput(ctx, value) {
          this.setFormData(ctx, value);
          ctx.modelValue = value;
          this.nextRefresh();
          this.$render.clearCache(ctx);
        },
        setFormData(ctx, value) {
          ctx.modelValue = value;
          const group = ctx.getParentGroup();
          if (group) {
            if (!this.subRuleData[group.id]) {
              this.subRuleData[group.id] = {};
            }
            this.subRuleData[group.id][ctx.field] = ctx.rule.value;
          }
          $set(this.formData, ctx.id, value);
        },
        rmSubRuleData(ctx) {
          const group = ctx.getParentGroup();
          if (group && this.subRuleData[group.id]) {
            delete this.subRuleData[group.id][ctx.field];
          }
        },
        getFormData(ctx) {
          return this.formData[ctx.id];
        },
        syncForm() {
          const data = vue.reactive({});
          this.fields().reduce((initial, field) => {
            const ctx = this.getCtx(field);
            initial[field] = vue.toRef(ctx.rule, 'value');
            return initial;
          }, data);
          this.form = data;
          this.syncValue();
        },
        appendValue(rule) {
          if (!rule.field || !hasProperty(this.appendData, rule.field)) return;
          rule.value = this.appendData[rule.field];
          delete this.appendData[rule.field];
        },
        addSubForm(ctx, subForm) {
          this.subForm[ctx.id] = subForm;
        },
        deferSyncValue(fn, sync) {
          if (!this.deferSyncFn) {
            this.deferSyncFn = fn;
          }
          if (!this.deferSyncFn.sync) {
            this.deferSyncFn.sync = sync;
          }
          invoke(fn);
          if (this.deferSyncFn === fn) {
            this.deferSyncFn = null;
            if (fn.sync) {
              this.syncValue();
            }
          }
        },
        syncValue() {
          if (this.deferSyncFn) {
            return this.deferSyncFn.sync = true;
          }
          this.vm.setupState.updateValue({
            ...this.form
          });
        },
        isChange(ctx, value) {
          return JSON.stringify(this.getFormData(ctx), strFn) !== JSON.stringify(value, strFn);
        },
        isQuote(ctx, value) {
          return (is.Object(value) || Array.isArray(value)) && value === ctx.rule.value;
        },
        refreshUpdate(ctx, val, origin, field) {
          if (is.Function(ctx.rule.update)) {
            const state = invoke(() => ctx.rule.update(val, ctx.origin, this.api, {
              origin: origin || 'change',
              linkField: field
            }));
            if (state === undefined) return;
            ctx.rule.hidden = state === true;
          }
        },
        valueChange(ctx, val) {
          this.refreshRule(ctx, val);
          this.bus.$emit('change-' + ctx.field, val);
        },
        refreshRule(ctx, val, origin, field) {
          if (this.refreshControl(ctx)) {
            this.$render.clearCacheAll();
            this.loadRule();
            this.bus.$emit('update', this.api);
            this.refresh();
          }
          this.refreshUpdate(ctx, val, origin, field);
        },
        appendLink(ctx) {
          const link = ctx.rule.link;
          is.trueArray(link) && link.forEach(field => {
            const fn = () => this.refreshRule(ctx, ctx.rule.value, 'link', field);
            this.bus.$on('change-' + field, fn);
            ctx.linkOn.push(() => this.bus.$off('change-' + field, fn));
          });
        },
        fields() {
          return Object.keys(this.fieldCtx);
        }
      });
    }
    function strFn(key, val) {
      return typeof val === 'function' ? '' + val : val;
    }

    const BaseParser = {
      init(ctx) {},
      toFormValue(value, ctx) {
        return value;
      },
      toValue(formValue, ctx) {
        return formValue;
      },
      mounted(ctx) {},
      render(children, ctx) {
        return ctx.$render.defaultRender(ctx, children);
      },
      preview(children, ctx) {
        return this.render(children, ctx);
      },
      mergeProp(ctx) {}
    };

    const noneKey = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject', 'sync', 'payload', 'optionsTo', 'update', 'slotUpdate', 'computed', 'component', 'cache'];
    function useContext(Handler) {
      extend(Handler.prototype, {
        getCtx(id) {
          return this.getFieldCtx(id) || this.getNameCtx(id)[0] || this.ctxs[id];
        },
        getCtxs(id) {
          return this.fieldCtx[id] || this.nameCtx[id] || (this.ctxs[id] ? [this.ctxs[id]] : []);
        },
        setIdCtx(ctx, key, type) {
          const field = `${type}Ctx`;
          if (!this[field][key]) {
            this[field][key] = [ctx];
          } else {
            this[field][key].push(ctx);
          }
        },
        rmIdCtx(ctx, key, type) {
          const field = `${type}Ctx`;
          const lst = this[field][key];
          if (!lst) return false;
          const flag = lst.splice(lst.indexOf(ctx) >>> 0, 1).length > 0;
          if (!lst.length) {
            delete this[field][key];
          }
          return flag;
        },
        getFieldCtx(field) {
          return (this.fieldCtx[field] || [])[0];
        },
        getNameCtx(name) {
          return this.nameCtx[name] || [];
        },
        setCtx(ctx) {
          let {
            id,
            field,
            name,
            rule
          } = ctx;
          this.ctxs[id] = ctx;
          name && this.setIdCtx(ctx, name, 'name');
          if (!ctx.input) return;
          this.setIdCtx(ctx, field, 'field');
          this.setFormData(ctx, ctx.parser.toFormValue(rule.value, ctx));
          if (this.isMounted && !this.reloading) {
            this.vm.emit('change', ctx.field, rule.value, ctx.origin, this.api);
          }
        },
        getParser(ctx) {
          const list = this.fc.parsers;
          return list[ctx.originType] || list[toCase(ctx.type)] || list[ctx.trueType] || BaseParser;
        },
        bindParser(ctx) {
          ctx.setParser(this.getParser(ctx));
        },
        getType(alias) {
          const map = this.fc.CreateNode.aliasMap;
          const type = map[alias] || map[toCase(alias)] || alias;
          return toCase(type);
        },
        noWatch(fn) {
          if (!this.noWatchFn) {
            this.noWatchFn = fn;
          }
          invoke(fn);
          if (this.noWatchFn === fn) {
            this.noWatchFn = null;
          }
        },
        watchCtx(ctx) {
          const all = attrs();
          all.filter(k => k[0] !== '_' && k[0] !== '$' && noneKey.indexOf(k) === -1).forEach(key => {
            const ref = vue.toRef(ctx.rule, key);
            const flag = key === 'children';
            ctx.refRule[key] = ref;
            ctx.watch.push(vue.watch(flag ? () => is.Function(ref.value) ? ref.value : [...(ref.value || [])] : () => ref.value, (_, o) => {
              let n = ref.value;
              if (this.isBreakWatch()) return;
              if (flag && ctx.parser.loadChildren === false) {
                this.$render.clearCache(ctx);
                this.nextRefresh();
                return;
              }
              this.watching = true;
              if (key === 'link') {
                ctx.link();
                return;
              } else if (['props', 'on', 'deep'].indexOf(key) > -1) {
                this.parseInjectEvent(ctx.rule, n || {});
                if (key === 'props' && ctx.input) {
                  this.setFormData(ctx, ctx.parser.toFormValue(ctx.rule.value, ctx));
                }
              } else if (key === 'emit') {
                this.parseEmit(ctx);
              } else if (key === 'hidden' && Boolean(n) !== Boolean(o)) {
                this.$render.clearCacheAll();
              } else if (['prefix', 'suffix'].indexOf(key) > -1) n && this.loadFn(n, ctx.rule);else if (key === 'type') {
                ctx.updateType();
                this.bindParser(ctx);
              } else if (flag) {
                if (is.Function(o)) {
                  o = ctx.getPending('children', []);
                }
                if (is.Function(n)) {
                  n = ctx.loadChildrenPending();
                }
                this.updateChildren(ctx, n, o);
              }
              this.$render.clearCache(ctx);
              this.refresh();
              this.watching = false;
            }, {
              deep: !flag,
              sync: flag
            }));
          });
          if (ctx.input) {
            const val = vue.toRef(ctx.rule, 'value');
            ctx.watch.push(vue.watch(() => val.value, () => {
              let formValue = ctx.parser.toFormValue(val.value, ctx);
              if (this.isChange(ctx, formValue)) {
                this.setValue(ctx, val.value, formValue, true);
              }
            }));
          }
          this.bus.$once('load-end', () => {
            let computed = ctx.rule.computed;
            if (!computed) {
              return;
            }
            if (typeof computed !== 'object') {
              computed = {
                value: computed
              };
            }
            Object.keys(computed).forEach(k => {
              ctx.watch.push(vue.watch(() => {
                const item = computed[k];
                if (!item) return undefined;
                let fn;
                if (is.Function(item)) {
                  fn = () => item(this.api.form, this.api);
                } else {
                  const group = ctx.getParentGroup();
                  fn = () => new Function('formulas', 'top', 'group', '$rule', '$api', `with(top){with(this){with(group){with(formulas){ return ${item} }}}}`).call(this.api.form, this.fc.formulas, this.api.top.form, group ? this.subRuleData[group.id] || {} : {}, ctx.rule, this.api);
                }
                return invoke(fn, undefined);
              }, n => {
                setTimeout(() => {
                  if (k === 'value') {
                    this.onInput(ctx, n);
                  } else if (k[0] === '$') {
                    this.api.setEffect(ctx.id, k, n);
                  } else {
                    deepSet(ctx.rule, k, n);
                  }
                });
              }, {
                immediate: true
              }));
            });
          });
          this.watchEffect(ctx);
        },
        updateChildren(ctx, n, o) {
          this.deferSyncValue(() => {
            o && o.forEach(child => {
              if ((n || []).indexOf(child) === -1 && child && !is.String(child) && child.__fc__ && child.__fc__.parent === ctx && child.__fc__.root !== n) {
                this.rmCtx(child.__fc__);
              }
            });
            if (is.trueArray(n)) {
              this.loadChildren(n, ctx);
              this.bus.$emit('update', this.api);
            }
          });
        },
        rmSub(sub) {
          is.trueArray(sub) && sub.forEach(r => {
            r && r.__fc__ && this.rmCtx(r.__fc__);
          });
        },
        rmCtx(ctx) {
          if (ctx.deleted) return;
          const {
            id,
            field,
            input,
            name
          } = ctx;
          $del(this.ctxs, id);
          $del(this.formData, id);
          $del(this.subForm, id);
          $del(this.vm.setupState.ctxInject, id);
          const group = ctx.getParentGroup();
          if (group && this.subRuleData[group.id]) {
            $del(this.subRuleData[group.id], field);
          }
          if (ctx.group) {
            $del(this.subRuleData, id);
          }
          input && this.rmIdCtx(ctx, field, 'field');
          name && this.rmIdCtx(ctx, name, 'name');
          if (input && !hasProperty(this.fieldCtx, field)) {
            $del(this.form, field);
          }
          this.deferSyncValue(() => {
            if (!this.reloading) {
              if (ctx.parser.loadChildren !== false) {
                const children = ctx.getPending('children', ctx.rule.children);
                if (is.trueArray(children)) {
                  children.forEach(h => h.__fc__ && this.rmCtx(h.__fc__));
                }
              }
              if (ctx.root === this.rules) {
                this.vm.setupState.renderRule();
              }
            }
          }, input);
          const index = this.sort.indexOf(id);
          if (index > -1) {
            this.sort.splice(index, 1);
          }
          this.$render.clearCache(ctx);
          ctx.delete();
          this.effect(ctx, 'deleted');
          input && !this.fieldCtx[field] && this.vm.emit('remove-field', field, ctx.rule, this.api);
          ctx.rule.__ctrl || this.vm.emit('remove-rule', ctx.rule, this.api);
          return ctx;
        }
      });
    }

    function useLifecycle(Handler) {
      extend(Handler.prototype, {
        mounted() {
          const _mounted = () => {
            this.isMounted = true;
            this.lifecycle('mounted');
          };
          if (this.pageEnd) {
            _mounted();
          } else {
            this.bus.$once('page-end', _mounted);
          }
        },
        lifecycle(name) {
          this.vm.emit(name, this.api);
          this.emitEvent(name, this.api);
        },
        emitEvent(name, ...args) {
          const _fn = this.options[name] || this.options[toCase('on-' + name)];
          if (_fn) {
            const fn = parseFn(_fn);
            is.Function(fn) && invoke(() => fn(...args));
          }
          this.bus.$emit(name, ...args);
        }
      });
    }

    function useEffect(Handler) {
      extend(Handler.prototype, {
        useProvider() {
          const ps = this.fc.providers;
          Object.keys(ps).forEach(k => {
            let prop = ps[k];
            if (is.Function(prop)) {
              prop = prop(this.fc);
            }
            prop._c = getComponent(prop);
            this.onEffect(prop);
            this.providers[k] = prop;
          });
        },
        onEffect(provider) {
          const used = [];
          (provider._c || ['*']).forEach(name => {
            const type = name === '*' ? '*' : this.getType(name);
            if (used.indexOf(type) > -1) return;
            used.push(type);
            this.bus.$on(`p:${provider.name}:${type}:${provider.input ? 1 : 0}`, (event, args) => {
              provider[event] && provider[event](...args);
            });
          });
          provider._used = used;
        },
        watchEffect(ctx) {
          let effect = {
            required: () => {
              var _ctx$rule;
              return (hasProperty(ctx.rule, '$required') ? ctx.rule['$required'] : (_ctx$rule = ctx.rule) === null || _ctx$rule === void 0 || (_ctx$rule = _ctx$rule.effect) === null || _ctx$rule === void 0 ? void 0 : _ctx$rule.required) || false;
            }
          };
          Object.keys(ctx.rule.effect || {}).forEach(k => {
            effect[k] = () => ctx.rule.effect[k];
          });
          Object.keys(ctx.rule).forEach(k => {
            if (k[0] === '$') {
              effect[k.substr(1)] = () => ctx.rule[k];
            }
          });
          Object.keys(effect).forEach(k => {
            ctx.watch.push(vue.watch(effect[k], n => {
              this.effect(ctx, 'watch', {
                [k]: n
              });
            }, {
              deep: true
            }));
          });
        },
        ruleEffect(rule, event, append) {
          this.emitEffect({
            rule,
            input: !!rule.field,
            type: this.getType(rule.type)
          }, event, append);
        },
        effect(ctx, event, custom) {
          this.emitEffect({
            rule: ctx.rule,
            input: ctx.input,
            type: ctx.trueType,
            ctx,
            custom
          }, event);
        },
        getEffect(rule, name) {
          if (hasProperty(rule, '$' + name)) {
            return rule['$' + name];
          }
          if (hasProperty(rule, 'effect') && hasProperty(rule.effect, name)) return rule.effect[name];
          return undefined;
        },
        emitEffect({
          ctx,
          rule,
          input,
          type,
          custom
        }, event, append) {
          if (!type || ['fcFragment', 'fragment'].indexOf(type) > -1) return;
          const effect = custom ? custom : Object.keys(rule).reduce((i, k) => {
            if (k[0] === '$') {
              i[k.substr(1)] = rule[k];
            }
            return i;
          }, {
            ...(rule.effect || {})
          });
          Object.keys(effect).forEach(attr => {
            const p = this.providers[attr];
            if (!p || p.input && !input) return;
            let _type;
            if (!p._c) {
              _type = '*';
            } else if (p._used.indexOf(type) > -1) {
              _type = type;
            } else {
              return;
            }
            const data = {
              value: effect[attr],
              getValue: () => this.getEffect(rule, attr),
              ...(append || {})
            };
            if (ctx) {
              data.getProp = () => ctx.effectData(attr);
              data.clearProp = () => ctx.clearEffectData(attr);
              data.mergeProp = prop => mergeRule(data.getProp(), [prop]);
              data.id = ctx.id;
            }
            this.bus.$emit(`p:${attr}:${_type}:${p.input ? 1 : 0}`, event, [data, rule, this.api]);
          });
        }
      });
    }
    function unique(arr) {
      return arr.filter(function (item, index, arr) {
        return arr.indexOf(item, 0) === index;
      });
    }
    function getComponent(p) {
      const c = p.components;
      if (Array.isArray(c)) {
        const arr = unique(c.filter(v => v !== '*'));
        return arr.length ? arr : false;
      } else if (is.String(c)) return [c];else return false;
    }

    function Handler(fc) {
      funcProxy(this, {
        options() {
          return fc.options.value || {};
        },
        bus() {
          return fc.bus;
        }
      });
      extend(this, {
        fc,
        vm: fc.vm,
        watching: false,
        loading: false,
        reloading: false,
        noWatchFn: null,
        deferSyncFn: null,
        isMounted: false,
        formData: vue.reactive({}),
        subRuleData: vue.reactive({}),
        subForm: {},
        form: vue.reactive({}),
        appendData: {},
        providers: {},
        cycleLoad: null,
        loadedId: 1,
        nextTick: null,
        changeStatus: false,
        pageEnd: true,
        nextReload: () => {
          this.lifecycle('reload');
        }
      });
      this.initData(fc.rules);
      this.$manager = new fc.manager(this);
      this.$render = new Render(this);
      this.api = fc.extendApi(Api(this), this);
    }
    extend(Handler.prototype, {
      initData(rules) {
        extend(this, {
          ctxs: {},
          fieldCtx: {},
          nameCtx: {},
          sort: [],
          rules
        });
      },
      init() {
        this.appendData = {
          ...(this.options.formData || {}),
          ...(this.fc.vm.props.modelValue || {}),
          ...this.appendData
        };
        this.useProvider();
        this.usePage();
        this.loadRule();
        this.$manager.__init();
        this.lifecycle('created');
      },
      isBreakWatch() {
        return this.loading || this.noWatchFn || this.reloading;
      }
    });
    useInject(Handler);
    usePage(Handler);
    useRender(Handler);
    useLoader(Handler);
    useInput(Handler);
    useContext(Handler);
    useLifecycle(Handler);
    useEffect(Handler);

    const NAME = 'fcFragment';
    var fragment = vue.defineComponent({
      name: NAME,
      inheritAttrs: false,
      props: ['vnode'],
      render() {
        return this.vnode;
      }
    });

    function tidyDirectives(directives) {
      return Object.keys(directives).map(n => {
        const data = directives[n];
        const directive = vue.resolveDirective(n);
        if (!directive) return;
        return [directive, data.value, data.arg, data.modifiers];
      }).filter(v => !!v);
    }
    function makeDirective(data, vn) {
      let directives = data.directives;
      if (!directives) return vn;
      if (!Array.isArray(directives)) {
        directives = [directives];
      }
      return vue.withDirectives(vn, directives.reduce((lst, v) => {
        return lst.concat(tidyDirectives(v));
      }, []));
    }
    function CreateNodeFactory() {
      const aliasMap = {};
      function CreateNode() {}
      extend(CreateNode.prototype, {
        make(tag, data, children) {
          return makeDirective(data, this.h(tag, toProps(data), children));
        },
        makeComponent(type, data, children) {
          try {
            return makeDirective(data, vue.createVNode(type, toProps(data), children));
          } catch (e) {
            console.error(e);
            return vue.createVNode('');
          }
        },
        h(tag, data, children) {
          const isNativeTag = vue.getCurrentInstance().appContext.config.isNativeTag(tag);
          if (isNativeTag) {
            delete data.formCreateInject;
          }
          try {
            return vue.createVNode(isNativeTag ? tag : vue.resolveComponent(tag), data, children);
          } catch (e) {
            console.error(e);
            return vue.createVNode('');
          }
        },
        aliasMap
      });
      extend(CreateNode, {
        aliasMap,
        alias(alias, name) {
          aliasMap[alias] = name;
        },
        use(nodes) {
          Object.keys(nodes).forEach(k => {
            const line = toLine(k);
            const lower = toString(k).toLocaleLowerCase();
            const v = nodes[k];
            [k, line, lower].forEach(n => {
              CreateNode.alias(k, v);
              CreateNode.prototype[n] = function (data, children) {
                return this.make(v, data, children);
              };
            });
          });
        }
      });
      return CreateNode;
    }

    function createManager(proto) {
      class CustomManager extends Manager {}
      Object.assign(CustomManager.prototype, proto);
      return CustomManager;
    }
    function Manager(handler) {
      extend(this, {
        $handle: handler,
        vm: handler.vm,
        options: {},
        ref: 'fcForm',
        mergeOptionsRule: {
          normal: ['form', 'row', 'info', 'submitBtn', 'resetBtn']
        }
      });
      this.updateKey();
      this.init();
    }
    extend(Manager.prototype, {
      __init() {
        this.$render = this.$handle.$render;
        this.$r = (...args) => this.$render.renderRule(...args);
      },
      updateKey() {
        this.key = uniqueId();
      },
      //TODO interface
      init() {},
      update() {},
      beforeRender() {},
      form() {
        return this.vm.refs[this.ref];
      },
      getSlot(name) {
        const _fn = vm => {
          if (vm) {
            let slot = vm.slots[name];
            if (slot) {
              return slot;
            }
            return _fn(vm.setupState.parent);
          }
          return undefined;
        };
        return _fn(this.vm);
      },
      mergeOptions(args, opt) {
        return mergeProps(args.map(v => this.tidyOptions(v)), opt, this.mergeOptionsRule);
      },
      updateOptions(options) {
        this.options = this.mergeOptions([options], this.getDefaultOptions());
        this.update();
      },
      tidyOptions(options) {
        return options;
      },
      tidyRule(ctx) {},
      mergeProp(ctx) {},
      getDefaultOptions() {
        return {};
      },
      render(children) {}
    });

    const loadData = function (fc) {
      const loadData = {
        name: 'loadData',
        _fn: [],
        created(inject, rule, api) {
          this.deleted(inject);
          let attrs = toArray(inject.getValue());
          const events = [];
          attrs.forEach(attr => {
            if (attr) {
              const on = () => {
                if (attr.watch !== false) {
                  fc.bus.$off('p.loadData.' + attr.attr, on);
                  fc.bus.$once('p.loadData.' + attr.attr, on);
                }
                let value = undefined;
                if (attr.attr) {
                  value = fc.loadData[attr.attr] || attr.default;
                  if (attr.copy) {
                    value = deepCopy(value);
                  }
                }
                deepSet(inject.getProp(), attr.to || 'options', value);
                api.sync(rule);
              };
              events.push(() => fc.bus.$off('p.loadData.' + attr.attr, on));
              on();
            }
          });
          this._fn[inject.id] = events;
        },
        deleted(inject) {
          if (this._fn[inject.id]) {
            this._fn[inject.id].forEach(un => {
              un();
            });
          }
          inject.clearProp();
        }
      };
      loadData.watch = loadData.created;
      return loadData;
    };
    const componentValidate = {
      name: 'componentValidate',
      load(attr, rule, api) {
        const method = attr.getValue();
        if (!method) {
          attr.clearProp();
          api.clearValidateState([rule.field]);
        } else {
          attr.getProp().validate = [{
            validator(...args) {
              const ctx = byCtx(rule);
              if (ctx) {
                return api.exec(ctx.id, method === true ? 'formCreateValidate' : method, ...args, {
                  attr,
                  rule,
                  api
                });
              }
            }
          }];
        }
      },
      watch(...args) {
        componentValidate.load(...args);
      }
    };
    const fetch = function (fc) {
      function parseOpt(option) {
        if (is.String(option)) {
          option = {
            action: option,
            to: 'options'
          };
        }
        return option;
      }
      function run(inject, rule, api) {
        let option = inject.value;
        if (is.Function(option)) {
          option = option(rule, api);
        }
        option = parseOpt(option);
        const set = val => {
          if (val === undefined) {
            inject.clearProp();
          } else {
            deepSet(inject.getProp(), option.to || 'options', val);
          }
          api.sync(rule);
        };
        if (!option || !option.action && !option.key) {
          set(undefined);
          return;
        }
        if (!option.to) {
          option.to = 'options';
        }
        if (option.key) {
          const item = fc.$handle.options.globalData[option.key];
          if (!item) {
            set(undefined);
            return;
          }
          if (item.type === 'static') {
            set(item.data);
            return;
          } else {
            option = {
              ...option,
              ...item
            };
          }
        }
        const onError = option.onError;
        const check = () => {
          if (!inject.getValue()) {
            inject.clearProp();
            api.sync(rule);
            return true;
          }
        };
        const config = {
          headers: {},
          ...option,
          onSuccess(body, flag) {
            if (check()) return;
            let fn = v => flag ? v : v.data;
            const parse = parseFn(option.parse);
            if (is.Function(parse)) {
              fn = parse;
            } else if (parse && is.String(parse)) {
              fn = v => {
                parse.split('.').forEach(k => {
                  if (v) {
                    v = v[k];
                  }
                });
                return v;
              };
            }
            set(fn(body, rule, api));
            api.sync(rule);
          },
          onError(e) {
            set(undefined);
            if (check()) return;
            (onError || (e => err(e.message || 'fetch fail ' + option.action)))(e, rule, api);
          }
        };
        fc.$handle.options.beforeFetch && invoke(() => fc.$handle.options.beforeFetch(config, {
          rule,
          api
        }));
        if (is.Function(option.action)) {
          option.action(rule, api).then(val => {
            config.onSuccess(val, true);
          }).catch(e => {
            config.onError(e);
          });
          return;
        }
        invoke(() => fc.create.fetch(config, {
          inject,
          rule,
          api
        }));
      }
      return {
        name: 'fetch',
        loaded(...args) {
          run(...args);
        },
        watch(...args) {
          run(...args);
        }
      };
    };
    var $provider = {
      fetch,
      loadData,
      componentValidate
    };

    const name$6 = 'html';
    var html = {
      name: name$6,
      loadChildren: false,
      render(children, ctx) {
        ctx.prop.props.innerHTML = children.default();
        return ctx.vNode.make(ctx.prop.props.tag || 'div', ctx.prop);
      },
      renderChildren(children) {
        return {
          default: () => children.filter(v => is.String(v)).join('')
        };
      }
    };

    function parseProp(name, id) {
      let prop;
      if (arguments.length === 2) {
        prop = arguments[1];
        id = prop[name];
      } else {
        prop = arguments[2];
      }
      return {
        id,
        prop
      };
    }
    function nameProp() {
      return parseProp('name', ...arguments);
    }
    function exportAttrs(attrs) {
      const key = attrs.key || [];
      const array = attrs.array || [];
      const normal = attrs.normal || [];
      keyAttrs.push(...key);
      arrayAttrs.push(...array);
      normalAttrs.push(...normal);
      appendProto([...key, ...array, ...normal]);
    }
    let id = 1;
    const instance = {};

    //todo 表单嵌套
    function FormCreateFactory(config) {
      const components = {
        [fragment.name]: fragment
      };
      const parsers = {};
      const directives = {};
      const modelFields = {};
      const useApps = [];
      const providers = {
        ...$provider
      };
      const maker = makerFactory();
      let globalConfig = {
        global: {}
      };
      const loadData = {};
      const CreateNode = CreateNodeFactory();
      const formulas = {};
      exportAttrs(config.attrs || {});
      function getApi(name) {
        const val = instance[name];
        if (Array.isArray(val)) {
          return val.map(v => {
            return v.api();
          });
        } else if (val) {
          return val.api();
        }
      }
      function useApp(fn) {
        useApps.push(fn);
      }
      function directive() {
        const data = nameProp(...arguments);
        if (data.id && data.prop) directives[data.id] = data.prop;
      }
      function register() {
        const data = nameProp(...arguments);
        if (data.id && data.prop) providers[data.id] = {
          ...data.prop,
          name: data.id
        };
      }
      function componentAlias(alias) {
        CreateNode.use(alias);
      }
      function parser() {
        const data = nameProp(...arguments);
        if (!data.id || !data.prop) return BaseParser;
        const name = toCase(data.id);
        const parser = data.prop;
        const base = parser.merge === true ? parsers[name] : undefined;
        parsers[name] = setPrototypeOf(parser, base || BaseParser);
        maker[name] = creatorFactory(name);
        parser.maker && extend(maker, parser.maker);
      }
      function component(id, component) {
        let name;
        if (is.String(id)) {
          name = id;
          if (component === undefined) {
            return components[name];
          }
        } else {
          name = id.displayName || id.name;
          component = id;
        }
        if (!name || !component) return;
        const nameAlias = toCase(name);
        components[name] = component;
        components[nameAlias] = component;
        delete CreateNode.aliasMap[name];
        delete CreateNode.aliasMap[nameAlias];
        delete parsers[name];
        delete parsers[nameAlias];
        if (component.formCreateParser) parser(name, component.formCreateParser);
      }
      function $form() {
        return $FormCreate(FormCreate, components, directives);
      }
      function createFormApp(rule, option) {
        const Type = $form();
        return vue.createApp({
          data() {
            return vue.reactive({
              rule,
              option
            });
          },
          render() {
            return vue.h(Type, {
              ref: 'fc',
              ...this.$data
            });
          }
        });
      }
      function $vnode() {
        return fragment;
      }

      //todo 检查回调函数作用域
      function use(fn, opt) {
        if (is.Function(fn.install)) fn.install(create, opt);else if (is.Function(fn)) fn(create, opt);
        return this;
      }
      function create(rules, option) {
        let app = createFormApp(rules, option || {});
        useApps.forEach(v => {
          invoke(() => v(create, app));
        });
        const div = document.createElement('div');
        ((option === null || option === void 0 ? void 0 : option.el) || document.body).appendChild(div);
        const vm = app.mount(div);
        return vm.$refs.fc.fapi;
      }
      function factory(inherit) {
        let _config = {
          ...config
        };
        if (inherit) {
          _config.inherit = {
            components,
            parsers,
            directives,
            modelFields,
            providers,
            useApps,
            maker,
            formulas,
            loadData
          };
        } else {
          delete _config.inherit;
        }
        return FormCreateFactory(_config);
      }
      function setModelField(name, field) {
        modelFields[name] = field;
      }
      function setFormula(name, fn) {
        formulas[name] = fn;
      }
      function _emitData(id) {
        Object.keys(instance).forEach(v => {
          const apis = Array.isArray(instance[v]) ? instance[v] : [instance[v]];
          apis.forEach(that => {
            that.bus.$emit('p.loadData.' + id);
          });
        });
      }
      function setData(id, data) {
        loadData[id] = data;
        _emitData(id);
      }
      function removeData(id) {
        delete loadData[id];
        _emitData(id);
      }
      function FormCreate(vm) {
        extend(this, {
          id: id++,
          create,
          vm,
          manager: createManager(config.manager),
          parsers,
          providers,
          modelFields,
          formulas,
          rules: vm.props.rule,
          name: vm.props.name || uniqueId(),
          inFor: vm.props.inFor,
          prop: {
            components,
            directives
          },
          loadData,
          CreateNode,
          bus: new Mitt(),
          unwatch: null,
          options: vue.ref({}),
          extendApi: config.extendApi || (api => api)
        });
        vue.nextTick(() => {
          vue.watch(this.options, () => {
            this.$handle.$manager.updateOptions(this.options.value);
            this.api().refresh();
          }, {
            deep: true
          });
        });
        extend(vm.appContext.components, components);
        extend(vm.appContext.directives, directives);
        this.$handle = new Handler(this);
        if (this.name) {
          if (this.inFor) {
            if (!instance[this.name]) instance[this.name] = [];
            instance[this.name].push(this);
          } else {
            instance[this.name] = this;
          }
        }
      }
      extend(FormCreate.prototype, {
        init() {
          if (this.isSub()) {
            this.unwatch = vue.watch(() => this.vm.setupState.parent.setupState.fc.options.value, () => {
              this.initOptions();
              this.$handle.api.refresh();
            }, {
              deep: true
            });
          }
          this.initOptions();
          this.$handle.init();
        },
        isSub() {
          return this.vm.setupState.parent && this.vm.props.extendOption;
        },
        initOptions() {
          this.options.value = {};
          let options = {
            formData: {},
            submitBtn: {},
            resetBtn: {},
            globalEvent: {},
            globalData: {},
            ...deepCopy(globalConfig)
          };
          if (this.isSub()) {
            options = this.mergeOptions(options, this.vm.setupState.parent.setupState.fc.options.value || {}, true);
          }
          options = this.mergeOptions(options, this.vm.props.option);
          this.updateOptions(options);
        },
        mergeOptions(target, opt, parent) {
          opt = deepCopy(opt);
          parent && ['page', 'onSubmit', 'mounted', 'reload', 'formData', 'el', 'globalClass', 'style'].forEach(n => {
            delete opt[n];
          });
          if (opt.global) {
            target.global = mergeGlobal(target.global, opt.global);
            delete opt.global;
          }
          this.$handle.$manager.mergeOptions([opt], target);
          return target;
        },
        updateOptions(options) {
          this.options.value = this.mergeOptions(this.options.value, options);
          this.$handle.$manager.updateOptions(this.options.value);
        },
        api() {
          return this.$handle.api;
        },
        render() {
          return this.$handle.render();
        },
        mounted() {
          this.$handle.mounted();
        },
        unmount() {
          if (this.name) {
            if (this.inFor) {
              const idx = instance[this.name].indexOf(this);
              instance[this.name].splice(idx, 1);
            } else {
              delete instance[this.name];
            }
          }
          this.unwatch && this.unwatch();
          this.$handle.reloadRule([]);
        },
        updated() {
          this.$handle.bindNextTick(() => this.bus.$emit('next-tick', this.$handle.api));
        }
      });
      function useAttr(formCreate) {
        extend(formCreate, {
          version: config.version,
          ui: config.ui,
          setData,
          removeData,
          maker,
          component,
          directive,
          setModelField,
          setFormula,
          register,
          $vnode,
          parser,
          use,
          factory,
          componentAlias,
          copyRule,
          copyRules,
          fetch: fetch$1,
          $form,
          parseFn,
          parseJson,
          toJson,
          useApp,
          getApi
        });
      }
      function useStatic(formCreate) {
        extend(formCreate, {
          create,
          install(app, options) {
            globalConfig = {
              ...globalConfig,
              ...(options || {})
            };
            if (app._installedFormCreate === true) return;
            app._installedFormCreate = true;
            const $formCreate = function (rules, opt = {}) {
              return create(rules, opt);
            };
            useAttr($formCreate);
            app.config.globalProperties.$formCreate = $formCreate;
            app.component('FormCreate', $form());
            useApps.forEach(v => {
              invoke(() => v(formCreate, app));
            });
          }
        });
      }
      useAttr(create);
      useStatic(create);
      CreateNode.use({
        fragment: 'fcFragment'
      });
      config.install && create.use(config);
      useApp((_, app) => {
        app.mixin({
          props: ['formCreateInject']
        });
      });
      parser(html);
      if (config.inherit) {
        const inherit = config.inherit;
        inherit.components && extend(components, inherit.components);
        inherit.parsers && extend(parsers, inherit.parsers);
        inherit.directives && extend(directives, inherit.directives);
        inherit.modelFields && extend(modelFields, inherit.modelFields);
        inherit.providers && extend(providers, inherit.providers);
        inherit.useApps && extend(useApps, inherit.useApps);
        inherit.maker && extend(maker, inherit.maker);
        inherit.loadData && extend(loadData, inherit.loadData);
        inherit.formulas && extend(formulas, inherit.formulas);
      }
      return create;
    }

    const DEFAULT_FORMATS = {
      date: 'YYYY-MM-DD',
      month: 'YYYY-MM',
      datetime: 'YYYY-MM-DD HH:mm:ss',
      timerange: 'HH:mm:ss',
      daterange: 'YYYY-MM-DD',
      monthrange: 'YYYY-MM',
      datetimerange: 'YYYY-MM-DD HH:mm:ss',
      year: 'YYYY'
    };
    const name$5 = 'datePicker';
    var datePicker = {
      name: name$5,
      maker: function () {
        return ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimeRange', 'dateRange', 'monthRange'].reduce((initial, type) => {
          initial[type] = creatorFactory(name$5, {
            type: type.toLowerCase()
          });
          return initial;
        }, {});
      }(),
      mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!props.valueFormat) {
          props.valueFormat = DEFAULT_FORMATS[props.type] || DEFAULT_FORMATS['date'];
        }
      }
    };

    const name$4 = 'hidden';
    var hidden = {
      name: name$4,
      maker: {
        [name$4]: (field, value) => creatorFactory(name$4)('', field, value)
      },
      render() {
        return [];
      }
    };

    const name$3 = 'input';
    var input = {
      name: name$3,
      maker: function () {
        const maker = ['password', 'url', 'email', 'text', 'textarea'].reduce((maker, type) => {
          maker[type] = creatorFactory(name$3, {
            type
          });
          return maker;
        }, {});
        maker.idate = creatorFactory(name$3, {
          type: 'date'
        });
        return maker;
      }(),
      mergeProp(ctx) {
        let {
          props
        } = ctx.prop;
        if (props && props.autosize && props.autosize.minRows) {
          props.rows = props.autosize.minRows || 2;
        }
      }
    };

    const name$2 = 'slider';
    var slider = {
      name: name$2,
      maker: {
        sliderRange: creatorFactory(name$2, {
          range: true
        })
      },
      toFormValue(value, ctx) {
        let isArr = Array.isArray(value),
          props = ctx.prop.props,
          min = props.min || 0,
          parseValue;
        if (props.range === true) {
          parseValue = isArr ? value : [min, parseFloat(value) || min];
        } else {
          parseValue = isArr ? parseFloat(value[0]) || min : parseFloat(value);
        }
        return parseValue;
      }
    };

    const name$1 = 'timePicker';
    var timePicker = {
      name: name$1,
      maker: {
        time: creatorFactory(name$1, m => m.props.isRange = false),
        timeRange: creatorFactory(name$1, m => m.props.isRange = true)
      },
      mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!props.valueFormat) {
          props.valueFormat = 'HH:mm:ss';
        }
      }
    };

    var row = {
      name: 'FcRow',
      render(_, ctx) {
        return ctx.vNode.col({
          props: {
            span: 24
          }
        }, {
          default: () => [ctx.vNode.row(ctx.prop, _)]
        });
      }
    };

    const name = 'select';
    var select = {
      name,
      toFormValue(value, ctx) {
        if (ctx.prop.props.multiple && !Array.isArray(value)) {
          return toArray(value);
        } else {
          return value;
        }
      }
    };

    var parsers = [datePicker, hidden, input, slider, timePicker, row, select];

    const PRE = 'el';
    var alias = {
      button: PRE + '-button',
      icon: PRE + '-icon',
      slider: PRE + '-slider',
      rate: PRE + '-rate',
      upload: 'fc-upload',
      cascader: PRE + '-cascader',
      popover: PRE + '-popover',
      tooltip: PRE + '-tooltip',
      colorPicker: PRE + '-colorPicker',
      timePicker: PRE + '-time-picker',
      timeSelect: PRE + '-time-select',
      datePicker: PRE + '-date-picker',
      'switch': PRE + '-switch',
      select: 'fc-select',
      checkbox: 'fc-checkbox',
      radio: 'fc-radio',
      inputNumber: PRE + '-input-number',
      number: PRE + '-input-number',
      input: PRE + '-input',
      formItem: PRE + '-form-item',
      form: PRE + '-form',
      frame: 'fc-frame',
      col: PRE + '-col',
      row: PRE + '-row',
      tree: 'fc-tree',
      autoComplete: PRE + '-autocomplete',
      auto: PRE + '-autocomplete',
      group: 'fc-group',
      object: 'fc-sub-form',
      subForm: 'fc-sub-form'
    };

    function getConfig() {
      return {
        form: {
          inline: false,
          labelPosition: 'right',
          labelWidth: '125px',
          disabled: false,
          size: undefined
        },
        row: {
          show: true,
          gutter: 0
        },
        submitBtn: {
          type: 'primary',
          loading: false,
          disabled: false,
          innerText: '提交',
          show: true,
          col: undefined,
          click: undefined
        },
        resetBtn: {
          type: 'default',
          loading: false,
          disabled: false,
          innerText: '重置',
          show: false,
          col: undefined,
          click: undefined
        }
      };
    }

    function isTooltip(info) {
      return info.type === 'tooltip';
    }
    function tidy(props, name) {
      if (!hasProperty(props, name)) return;
      if (is.String(props[name])) {
        props[name] = {
          [name]: props[name],
          show: true
        };
      }
    }
    function isFalse(val) {
      return val === false;
    }
    function tidyBool(opt, name) {
      if (hasProperty(opt, name) && !is.Object(opt[name])) {
        opt[name] = {
          show: !!opt[name]
        };
      }
    }
    function tidyRule(rule) {
      const _rule = {
        ...rule
      };
      delete _rule.children;
      return _rule;
    }
    var manager = {
      validate() {
        const form = this.form();
        if (form) {
          return form.validate();
        } else {
          return new Promise(v => v());
        }
      },
      validateField(field) {
        return new Promise((resolve, reject) => {
          const form = this.form();
          if (form) {
            form.validateField(field, (res, err) => {
              err ? reject(err) : resolve(res);
            });
          } else {
            resolve();
          }
        });
      },
      clearValidateState(ctx) {
        const fItem = this.vm.refs[ctx.wrapRef];
        if (fItem) {
          fItem.clearValidate();
        }
      },
      tidyOptions(options) {
        ['submitBtn', 'resetBtn', 'row', 'info', 'wrap', 'col', 'title'].forEach(name => {
          tidyBool(options, name);
        });
        return options;
      },
      tidyRule({
        prop
      }) {
        tidy(prop, 'title');
        tidy(prop, 'info');
        return prop;
      },
      mergeProp(ctx) {
        ctx.prop = mergeProps([{
          info: this.options.info || {},
          wrap: this.options.wrap || {},
          col: this.options.col || {},
          title: this.options.title || {}
        }, ctx.prop], {
          info: {
            trigger: 'hover',
            placement: 'top-start',
            icon: true
          },
          title: {},
          col: {
            span: 24
          },
          wrap: {}
        }, {
          normal: ['title', 'info', 'col', 'wrap']
        });
      },
      getDefaultOptions() {
        return getConfig();
      },
      update() {
        const form = this.options.form;
        this.rule = {
          props: {
            ...form
          },
          on: {
            submit: e => {
              e.preventDefault();
            }
          },
          class: [form.className, form.class, 'form-create', this.options.preview ? 'is-preview' : ''],
          style: form.style,
          type: 'form'
        };
      },
      beforeRender() {
        const {
          key,
          ref,
          $handle
        } = this;
        extend(this.rule, {
          key,
          ref
        });
        extend(this.rule.props, {
          model: $handle.formData
        });
      },
      render(children) {
        if (children.slotLen() && !this.options.preview) {
          children.setSlot(undefined, () => this.makeFormBtn());
        }
        return this.$r(this.rule, isFalse(this.options.row.show) ? children.getSlots() : [this.makeRow(children)]);
      },
      makeWrap(ctx, children) {
        const rule = ctx.prop;
        const uni = `${this.key}${ctx.key}`;
        const col = rule.col;
        const isTitle = this.isTitle(rule);
        const labelWidth = !col.labelWidth && !isTitle ? 0 : col.labelWidth;
        const {
          inline,
          col: _col
        } = this.rule.props;
        const item = isFalse(rule.wrap.show) ? children : this.$r(mergeProps([rule.wrap, {
          props: {
            labelWidth: labelWidth === void 0 ? labelWidth : toString(labelWidth),
            label: isTitle ? rule.title.title : undefined,
            ...tidyRule(rule.wrap || {}),
            prop: ctx.id,
            rules: ctx.injectValidate()
          },
          class: rule.className,
          key: `${uni}fi`,
          ref: ctx.wrapRef,
          type: 'formItem'
        }]), {
          default: () => children,
          ...(isTitle ? {
            label: () => this.makeInfo(rule, uni, ctx)
          } : {})
        });
        return inline === true || isFalse(_col) || isFalse(col.show) ? item : this.makeCol(rule, uni, [item]);
      },
      isTitle(rule) {
        if (this.options.form.title === false) return false;
        const title = rule.title;
        return !(!title.title && !title.native || isFalse(title.show));
      },
      makeInfo(rule, uni, ctx) {
        const titleProp = {
          ...rule.title
        };
        const infoProp = {
          ...rule.info
        };
        const isTip = isTooltip(infoProp);
        const form = this.options.form;
        const titleSlot = this.getSlot('title');
        const children = [titleSlot ? titleSlot({
          title: titleProp.title || '',
          rule: ctx.rule,
          options: this.options
        }) : (titleProp.title || '') + (form.labelSuffix || form['label-suffix'] || '')];
        if (!isFalse(infoProp.show) && (infoProp.info || infoProp.native) && !isFalse(infoProp.icon)) {
          const prop = {
            type: infoProp.type || 'popover',
            props: tidyRule(infoProp),
            key: `${uni}pop`
          };
          delete prop.props.icon;
          delete prop.props.show;
          delete prop.props.info;
          delete prop.props.align;
          delete prop.props.native;
          const field = 'content';
          if (infoProp.info && !hasProperty(prop.props, field)) {
            prop.props[field] = infoProp.info;
          }
          children[infoProp.align !== 'left' ? 'unshift' : 'push'](this.$r(mergeProps([infoProp, prop]), {
            [titleProp.slot || (isTip ? 'default' : 'reference')]: () => this.$r({
              type: 'ElIcon',
              style: 'top:2px',
              key: `${uni}i`
            }, {
              default: () => this.$r({
                type: infoProp.icon === true ? 'icon-warning' : infoProp.icon
              })
            }, true)
          }));
        }
        const _prop = mergeProps([titleProp, {
          props: tidyRule(titleProp),
          key: `${uni}tit`,
          type: titleProp.type || 'span'
        }]);
        delete _prop.props.show;
        delete _prop.props.title;
        delete _prop.props.native;
        return this.$r(_prop, children);
      },
      makeCol(rule, uni, children) {
        const col = rule.col;
        return this.$r({
          class: col.class,
          type: 'col',
          props: col || {
            span: 24
          },
          key: `${uni}col`
        }, children);
      },
      makeRow(children) {
        const row = this.options.row || {};
        return this.$r({
          type: 'row',
          props: row,
          class: row.class,
          key: `${this.key}row`
        }, children);
      },
      makeFormBtn() {
        let vn = [];
        if (!isFalse(this.options.submitBtn.show)) {
          vn.push(this.makeSubmitBtn());
        }
        if (!isFalse(this.options.resetBtn.show)) {
          vn.push(this.makeResetBtn());
        }
        if (!vn.length) {
          return;
        }
        const item = this.$r({
          type: 'formItem',
          key: `${this.key}fb`
        }, vn);
        return this.rule.props.inline === true ? item : this.$r({
          type: 'col',
          props: {
            span: 24
          },
          key: `${this.key}fc`
        }, [item]);
      },
      makeResetBtn() {
        const resetBtn = {
          ...this.options.resetBtn
        };
        const innerText = resetBtn.innerText;
        delete resetBtn.innerText;
        delete resetBtn.click;
        delete resetBtn.col;
        delete resetBtn.show;
        return this.$r({
          type: 'button',
          props: resetBtn,
          style: {
            width: resetBtn.width
          },
          on: {
            click: () => {
              const fApi = this.$handle.api;
              this.options.resetBtn.click ? this.options.resetBtn.click(fApi) : fApi.resetFields();
            }
          },
          key: `${this.key}b2`
        }, [innerText]);
      },
      makeSubmitBtn() {
        const submitBtn = {
          ...this.options.submitBtn
        };
        const innerText = submitBtn.innerText;
        delete submitBtn.innerText;
        delete submitBtn.click;
        delete submitBtn.col;
        delete submitBtn.show;
        return this.$r({
          type: 'button',
          props: submitBtn,
          style: {
            width: submitBtn.width
          },
          on: {
            click: () => {
              const fApi = this.$handle.api;
              this.options.submitBtn.click ? this.options.submitBtn.click(fApi) : fApi.submit().catch(() => {});
            }
          },
          key: `${this.key}b1`
        }, [innerText]);
      }
    };

    const maker$1 = {};
    useAlias(maker$1);
    useSelect(maker$1);
    useTree(maker$1);
    useUpload(maker$1);
    useFrame(maker$1);
    function useAlias(maker) {
      ['group', 'tree', 'switch', 'upload', 'autoComplete', 'checkbox', 'cascader', 'colorPicker', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate'].forEach(name => {
        maker[name] = creatorFactory(name);
      });
      maker.auto = maker.autoComplete;
      maker.number = maker.inputNumber;
      maker.color = maker.colorPicker;
    }
    function useSelect(maker) {
      const select = 'select';
      const multiple = 'multiple';
      maker['selectMultiple'] = creatorFactory(select, {
        [multiple]: true
      });
      maker['selectOne'] = creatorFactory(select, {
        [multiple]: false
      });
    }
    function useTree(maker) {
      const name = 'tree';
      const types = {
        'treeSelected': 'selected',
        'treeChecked': 'checked'
      };
      Object.keys(types).reduce((m, key) => {
        m[key] = creatorFactory(name, {
          type: types[key]
        });
        return m;
      }, maker);
    }
    function useUpload(maker) {
      const name = 'upload';
      const types = {
        image: ['image', 0],
        file: ['file', 0],
        uploadFileOne: ['file', 1],
        uploadImageOne: ['image', 1]
      };
      Object.keys(types).reduce((m, key) => {
        m[key] = creatorFactory(name, m => m.props({
          uploadType: types[key][0],
          maxLength: types[key][1]
        }));
        return m;
      }, maker);
      maker.uploadImage = maker.image;
      maker.uploadFile = maker.file;
    }
    function useFrame(maker) {
      const types = {
        frameInputs: ['input', 0],
        frameFiles: ['file', 0],
        frameImages: ['image', 0],
        frameInputOne: ['input', 1],
        frameFileOne: ['file', 1],
        frameImageOne: ['image', 1]
      };
      Object.keys(types).reduce((maker, key) => {
        maker[key] = creatorFactory('frame', m => m.props({
          type: types[key][0],
          maxLength: types[key][1]
        }));
        return maker;
      }, maker);
      maker.frameInput = maker.frameInputs;
      maker.frameFile = maker.frameFiles;
      maker.frameImage = maker.frameImages;
      return maker;
    }

    var css_248z = ".form-create .form-create .el-form-item{margin-bottom:22px}.form-create{width:100%}.form-create .fc-none,.form-create.is-preview .fc-clock{display:none!important}.form-create.is-preview .el-form-item.is-required>.el-form-item__label-wrap>.el-form-item__label:before,.form-create.is-preview .el-form-item.is-required>.el-form-item__label:before{content:\"\"!important}";
    styleInject(css_248z);

    function tidyBtnProp(btn, def) {
      if (is.Boolean(btn)) btn = {
        show: btn
      };else if (!is.Undef(btn) && !is.Object(btn)) btn = {
        show: def
      };
      return btn;
    }
    function extendApi(api, h) {
      extend(api, {
        formEl() {
          return h.$manager.form();
        },
        wrapEl(id) {
          const ctx = h.getFieldCtx(id);
          if (!ctx) return;
          return h.vm.refs[ctx.wrapRef];
        },
        validate(callback) {
          return new Promise((resolve, reject) => {
            const forms = api.children;
            const all = [h.$manager.validate()];
            forms.forEach(v => {
              all.push(v.validate());
            });
            Promise.all(all).then(() => {
              resolve(true);
              callback && callback(true);
            }).catch(e => {
              reject(e);
              callback && callback(e);
              h.vm.emit('validate-fail', e, {
                api
              });
            });
          });
        },
        validateField(field, callback) {
          return new Promise((resolve, reject) => {
            const ctx = h.getFieldCtx(field);
            if (!ctx) return;
            const sub = h.subForm[ctx.id];
            const all = [h.$manager.validateField(ctx.id)];
            toArray(sub).forEach(v => {
              all.push(v.validate());
            });
            Promise.all(all).then(() => {
              resolve(null);
              callback && callback(null);
            }).catch(e => {
              reject(e);
              callback && callback(e);
              h.vm.emit('validate-field-fail', e, {
                field,
                api
              });
            });
          });
        },
        clearValidateState(fields, clearSub = true) {
          api.helper.tidyFields(fields).forEach(field => {
            if (clearSub) this.clearSubValidateState(field);
            h.getCtxs(field).forEach(ctx => {
              h.$manager.clearValidateState(ctx);
            });
          });
        },
        clearSubValidateState(fields) {
          api.helper.tidyFields(fields).forEach(field => {
            h.getCtxs(field).forEach(ctx => {
              const subForm = h.subForm[ctx.id];
              if (!subForm) return;
              if (Array.isArray(subForm)) {
                subForm.forEach(form => {
                  form.clearValidateState();
                });
              } else if (subForm) {
                subForm.clearValidateState();
              }
            });
          });
        },
        btn: {
          loading: (loading = true) => {
            api.submitBtnProps({
              loading: !!loading
            });
          },
          disabled: (disabled = true) => {
            api.submitBtnProps({
              disabled: !!disabled
            });
          },
          show: (isShow = true) => {
            api.submitBtnProps({
              show: !!isShow
            });
          }
        },
        resetBtn: {
          loading: (loading = true) => {
            api.resetBtnProps({
              loading: !!loading
            });
          },
          disabled: (disabled = true) => {
            api.resetBtnProps({
              disabled: !!disabled
            });
          },
          show: (isShow = true) => {
            api.resetBtnProps({
              show: !!isShow
            });
          }
        },
        submitBtnProps: (props = {}) => {
          let btn = tidyBtnProp(h.options.submitBtn, true);
          extend(btn, props);
          h.options.submitBtn = btn;
          api.refreshOptions();
        },
        resetBtnProps: (props = {}) => {
          let btn = tidyBtnProp(h.options.resetBtn, false);
          extend(btn, props);
          h.options.resetBtn = btn;
          api.refreshOptions();
        },
        submit(successFn, failFn) {
          return new Promise((resolve, reject) => {
            api.validate().then(() => {
              let formData = api.formData();
              is.Function(successFn) && invoke(() => successFn(formData, api));
              is.Function(h.options.onSubmit) && invoke(() => h.options.onSubmit(formData, api));
              h.vm.emit('submit', formData, api);
              resolve(formData);
            }).catch((...args) => {
              is.Function(failFn) && invoke(() => failFn(api, ...args));
              reject(...args);
            });
          });
        }
      });
      return api;
    }

    const required = {
      name: 'required',
      load(inject, rule, api) {
        const val = parseVal(inject.getValue());
        if (val.required === false) {
          inject.clearProp();
          api.clearValidateState([rule.field]);
        } else {
          const validate = {
            required: true,
            validator(_, v, call) {
              is.empty(v) ? call(validate.message) : call();
            },
            ...val
          };
          if (!validate.message) {
            let title = rule.title || '';
            validate.message = ((typeof title === 'object' ? title.title : title) || '') + '不能为空';
          }
          inject.getProp().validate = [validate];
        }
        api.sync(rule);
      },
      watch(...args) {
        required.load(...args);
      }
    };
    function parseVal(val) {
      if (is.Boolean(val)) {
        return {
          required: val
        };
      } else if (is.String(val)) {
        return {
          message: val
        };
      } else if (is.Undef(val)) {
        return {
          required: false
        };
      } else if (is.Function(val)) {
        return {
          validator: val
        };
      } else if (!is.Object(val)) {
        return {};
      } else {
        return val;
      }
    }

    function install(FormCreate) {
      FormCreate.componentAlias(alias);
      components.forEach(component => {
        FormCreate.component(component.name, component);
      });
      FormCreate.register(required);
      parsers.forEach(parser => {
        FormCreate.parser(parser);
      });
      Object.keys(maker$1).forEach(name => {
        FormCreate.maker[name] = maker$1[name];
      });
      if (typeof window !== 'undefined' && window.ElementPlus) {
        FormCreate.useApp((_, app) => {
          app.use(window.ElementPlus);
        });
      }
    }
    function elmFormCreate() {
      return FormCreateFactory({
        ui: 'element-ui',
        version: '3.1.32',
        manager,
        extendApi,
        install,
        attrs: {
          normal: ['col', 'wrap'],
          array: ['className'],
          key: ['title', 'info']
        }
      });
    }

    const FormCreate = elmFormCreate();
    if (typeof window !== 'undefined') {
      window.formCreate = FormCreate;
    }
    const maker = FormCreate.maker;

    exports["default"] = FormCreate;
    exports.maker = maker;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
