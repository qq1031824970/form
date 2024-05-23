/*!
 * @form-create/component-elm-checkbox v3.1.32
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with checkbox
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FcCheckbox = {}, global.Vue));
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

    const NAME = 'fcCheckbox';
    var Checkbox = vue.defineComponent({
      name: NAME,
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

    exports["default"] = Checkbox;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
