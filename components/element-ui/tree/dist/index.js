/*!
 * @form-create/component-elm-tree v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with tree
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FcTree = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    function toArray(value) {
      return Array.isArray(value) ? value : [null, undefined, ''].indexOf(value) > -1 ? [] : [value];
    }

    const NAME = 'fcTree';
    var Tree = vue.defineComponent({
      name: NAME,
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

    exports["default"] = Tree;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
