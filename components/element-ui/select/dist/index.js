/*!
 * @form-create/component-elm-select v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with select
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FcSelect = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    function getSlot(slots, exclude) {
      return Object.keys(slots).reduce((lst, name) => {
        if (!exclude || exclude.indexOf(name) === -1) {
          lst.push(slots[name]);
        }
        return lst;
      }, []);
    }

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

    const NAME = 'fcSelect';
    var Select = vue.defineComponent({
      name: NAME,
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

    exports["default"] = Select;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
