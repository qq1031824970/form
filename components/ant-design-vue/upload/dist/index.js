/*!
 * @form-create/component-antdv-upload v3.1.30
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

    var script = {
      name: 'PlusOutlined'
    };

    const _hoisted_1 = {
      class: "anticon"
    };
    const _hoisted_2 = /*#__PURE__*/vue.createElementVNode("svg", {
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [/*#__PURE__*/vue.createElementVNode("defs"), /*#__PURE__*/vue.createElementVNode("path", {
      d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z",
      fill: "currentColor"
    }), /*#__PURE__*/vue.createElementVNode("path", {
      d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z",
      fill: "currentColor"
    })], -1);
    const _hoisted_3 = [_hoisted_2];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("span", _hoisted_1, _hoisted_3);
    }

    script.render = render;

    const parseFile = function (file, uid) {
        return {
          url: file,
          name: getFileName(file),
          status: 'done',
          uid: -1 * (uid + 1)
        };
      },
      getFileName = function (file) {
        return ('' + file).split('/').pop();
      },
      parseUpload = function (file) {
        return {
          url: file.url,
          file,
          uid: file.uid
        };
      };
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
        limit: {
          type: Number,
          default: 0
        },
        modelValue: {
          type: Array,
          default: () => []
        },
        onSuccess: {
          type: Function,
          required: true
        },
        onPreview: Function,
        modalTitle: String,
        previewMask: undefined
      },
      emits: ['update:modelValue', 'change', 'fc.el'],
      data() {
        return {
          previewImage: '',
          previewVisible: false,
          uploadList: this.modelValue.map(parseFile).map(parseUpload)
        };
      },
      watch: {
        modelValue(n) {
          this.uploadList = n.map(parseFile).map(parseUpload);
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
        handleChange({
          file,
          fileList
        }) {
          this.$emit('change', ...arguments);
          this.uploadList = fileList;
          if (file.status === 'done') {
            this.onSuccess(file, fileList);
            this.input();
          } else if (file.status === 'removed') {
            fileList.forEach((v, i) => {
              if (v.file === file) {
                fileList.splice(i, 1);
              }
            });
            this.input();
          }
        },
        input() {
          this.$emit('update:modelValue', this.uploadList.map(v => v.url));
        }
      },
      render() {
        var _this$$slots$default, _this$$slots;
        const isShow = !this.limit || this.limit > this.uploadList.length;
        const aModal = vue.resolveComponent('AModal');
        const props = {
          [aModal.props.open ? 'open' : 'visible']: this.previewVisible
        };
        return vue.createVNode(vue.Fragment, null, [vue.createVNode(vue.resolveComponent("AUpload"), vue.mergeProps({
          "maxCount": this.limit,
          "list-type": 'picture-card'
        }, this.$attrs, {
          "onPreview": this.handlePreview,
          "onChange": this.handleChange,
          "fileList": this.uploadList,
          "ref": "upload"
        }), {
          default: () => [isShow ? ((_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)) || vue.createVNode(script, {
            "style": "font-size: 16px; width: 16px;"
          }, null) : null],
          ...getSlot(this.$slots, ['default'])
        }), vue.createVNode(aModal, vue.mergeProps({
          "mask": this.previewMask,
          "title": this.modalTitle
        }, props, {
          "onCancel": () => this.previewVisible = false,
          "footer": null
        }), {
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
