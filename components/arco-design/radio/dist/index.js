/*!
 * @form-create/component-arco-radio v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with radio
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FcRadio = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    function getSlot(slots, exclude) {
      return Object.keys(slots).reduce((lst, name) => {
        if (!exclude || exclude.indexOf(name) === -1) {
          lst.push(slots[name]);
        }
        return lst;
      }, []);
    }

    const NAME = 'fcRadio';
    var Radio = vue.defineComponent({
      name: NAME,
      inheritAttrs: false,
      props: {
        formCreateInject: Object,
        modelValue: {
          type: [String, Number, Boolean],
          default: ''
        }
      },
      emits: ['update:modelValue', 'fc.el'],
      setup(props, _) {
        const options = vue.toRef(props.formCreateInject, 'options', []);
        const value = vue.toRef(props, 'modelValue');
        const _options = () => {
          return Array.isArray(options.value) ? options.value : [];
        };
        return {
          options: _options,
          value,
          onInput(n) {
            _.emit('update:modelValue', n);
          }
        };
      },
      render() {
        var _this$$slots$default, _this$$slots;
        return vue.createVNode(vue.resolveComponent("ARadioGroup"), vue.mergeProps(this.$attrs, {
          "modelValue": this.value,
          "onUpdate:modelValue": this.onInput,
          "ref": "el"
        }), {
          default: () => [this.options().map((opt, index) => {
            return vue.createVNode(vue.resolveComponent("ARadio"), vue.mergeProps(opt, {
              "key": '' + index + '-' + opt.value
            }), {
              default: () => [opt.label || opt.value || '']
            });
          }), (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)],
          ...getSlot(this.$slots, ['default'])
        });
      },
      mounted() {
        this.$emit('fc.el', this.$refs.el);
      }
    });

    exports["default"] = Radio;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
