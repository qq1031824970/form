/*!
 * @form-create/component-subform v3.1.5
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with subform
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FcSubForm = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    const NAME = 'fcSubForm';
    var Sub = vue.defineComponent({
      name: NAME,
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

    exports["default"] = Sub;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
