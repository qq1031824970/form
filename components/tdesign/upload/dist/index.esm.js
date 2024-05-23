/*!
 * @form-create/component-tdesign-upload v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with upload
 * Released under the MIT License.
 */
import { defineComponent, createVNode, Fragment, resolveComponent, mergeProps } from 'vue';

function toArray(value) {
  return Array.isArray(value) ? value : [null, undefined, ''].indexOf(value) > -1 ? [] : [value];
}

const NAME = 'fcUpload';
function parseFile(file, i) {
  return {
    url: file,
    name: getFileName(file),
    status: 'success',
    uid: i
  };
}
function getFileName(file) {
  return ('' + file).split('/').pop();
}
var Upload = defineComponent({
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
    formCreateInject: Object,
    modelValue: {
      type: Array,
      default: []
    },
    onSuccess: {
      type: Function
    },
    onRemove: {
      type: Function
    }
  },
  emits: ['update:modelValue', 'fc.el'],
  data() {
    return {
      uploadList: toArray(this.modelValue).map(parseFile)
    };
  },
  watch: {
    modelValue(n) {
      this.uploadList = toArray(n).map(parseFile);
    }
  },
  methods: {
    handleRemove({
      index
    }) {
      this.uploadList.splice(index, 1);
      this.onRemove && this.onRemove(...arguments);
      this.input();
    },
    handleSuccess({
      file,
      fileList
    }) {
      this.uploadList = fileList;
      if (file.status === 'success') {
        this.onSuccess && this.onSuccess(...arguments);
      }
      this.input();
    },
    input() {
      this.$emit('update:modelValue', this.uploadList.map(v => v.url));
    }
  },
  render() {
    const {
      uploadList,
      handleSuccess,
      handleRemove,
      $slots
    } = this;
    return createVNode(Fragment, null, [createVNode(resolveComponent("t-upload"), mergeProps({
      "max": this.limit,
      "theme": "image",
      "accept": "image/*",
      "modelValue": uploadList
    }, this.$attrs, {
      "onSuccess": handleSuccess,
      "onRemove": handleRemove,
      "ref": "el"
    }), $slots)]);
  },
  mounted() {
    this.$emit('fc.el', this.$refs.el);
  }
});

export { Upload as default };
