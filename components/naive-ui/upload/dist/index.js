/*!
 * @form-create/component-naive-upload v3.1.30
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

    const parseFile = function (file, uid) {
        return {
          url: file,
          name: getFileName(file),
          status: 'finished',
          id: uid + 1
        };
      },
      getFileName = function (file) {
        return ('' + file).split('/').pop();
      },
      parseUpload = function (file) {
        return {
          ...file,
          file
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
      emits: ['update:modelValue', 'finish', 'fc.el'],
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
        handleChange({
          event,
          file
        }) {
          this.$emit('finish', ...arguments);
          const list = this.uploadList;
          this.onSuccess(JSON.parse(event.target.response), file);
          if (file.url) list.push({
            url: file.url,
            file
          });
          this.input(list);
        },
        input(n) {
          this.$emit('update:modelValue', n.map(v => v.url));
        },
        inputRemove(n) {
          if (n.length < this.uploadList.length) {
            this.input(n);
          }
        },
        handlePreview(file) {
          if (this.onPreview) {
            this.onPreview(...arguments);
          } else {
            this.previewImage = file.url;
            this.previewVisible = true;
          }
        }
      },
      render() {
        return vue.createVNode(vue.Fragment, null, [vue.createVNode(vue.resolveComponent("n-upload"), vue.mergeProps({
          "max": this.limit,
          "listType": 'image-card'
        }, this.$attrs, {
          "onPreview": this.handlePreview,
          "onFinish": this.handleChange,
          "key": this.uploadList.length,
          "default-file-list": this.uploadList,
          "onUpdate:fileList": this.inputRemove,
          "ref": "el"
        }), this.$slots), vue.createVNode(vue.resolveComponent("NModal"), {
          "preset": 'card',
          "mask": this.previewMask,
          "title": this.modalTitle,
          "show": this.previewVisible,
          "style": "width: 600px;",
          "onUpdate:show": n => this.previewVisible = n
        }, {
          default: () => [vue.createVNode("img", {
            "style": "width: 100%",
            "src": this.previewImage
          }, null)]
        })]);
      },
      mounted() {
        this.$emit('fc.el', this.$refs.el);
      }
    });

    exports["default"] = Upload;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
