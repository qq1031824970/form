/*!
 * @form-create/component-arco-radio v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with radio
 * Released under the MIT License.
 */
import { defineComponent, toRef, createVNode, resolveComponent, mergeProps } from 'vue';

function getSlot(slots, exclude) {
  return Object.keys(slots).reduce((lst, name) => {
    if (!exclude || exclude.indexOf(name) === -1) {
      lst.push(slots[name]);
    }
    return lst;
  }, []);
}

const NAME = 'fcRadio';
var Radio = defineComponent({
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
    const options = toRef(props.formCreateInject, 'options', []);
    const value = toRef(props, 'modelValue');
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
    return createVNode(resolveComponent("ARadioGroup"), mergeProps(this.$attrs, {
      "modelValue": this.value,
      "onUpdate:modelValue": this.onInput,
      "ref": "el"
    }), {
      default: () => [this.options().map((opt, index) => {
        return createVNode(resolveComponent("ARadio"), mergeProps(opt, {
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

export { Radio as default };
