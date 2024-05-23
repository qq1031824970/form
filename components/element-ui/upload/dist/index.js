/*!
 * @form-create/component-elm-upload v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with upload
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FcUpload = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    function toArray(value) {
      return Array.isArray(value) ? value : [null, undefined, ''].indexOf(value) > -1 ? [] : [value];
    }

    function getSlot(slots, exclude) {
      return Object.keys(slots).reduce((lst, name) => {
        if (!exclude || exclude.indexOf(name) === -1) {
          lst.push(slots[name]);
        }
        return lst;
      }, []);
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

    var css_248z = "._fc-exceed .el-upload{display:none}.el-upload-list.is-disabled .el-upload{cursor:not-allowed!important}";
    styleInject(css_248z);

    var script = {
      name: 'IconUpload'
    };

    const _hoisted_1 = {
      class: "icon",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    const _hoisted_2 = /*#__PURE__*/vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M160 832h704a32 32 0 110 64H160a32 32 0 110-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
    }, null, -1);
    const _hoisted_3 = [_hoisted_2];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1, _hoisted_3);
    }

    script.render = render;

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
    const NAME = 'fcUpload';
    var Upload = vue.defineComponent({
      name: NAME,
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
            default: () => [vue.createVNode(script, null, null)]
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

    exports["default"] = Upload;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
