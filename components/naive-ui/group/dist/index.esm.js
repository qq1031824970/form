/*!
 * @form-create/component-naive-group v3.1.30
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create with group
 * Released under the MIT License.
 */
import { defineComponent, markRaw, nextTick, createVNode, watch, mergeProps } from 'vue';

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

function $set(target, field, value) {
  target[field] = value;
}

function deepExtend(origin, target = {}, mode) {
  let isArr = false;
  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      let clone = target[key];
      if ((isArr = Array.isArray(clone)) || is.Object(clone)) {
        let nst = origin[key] === undefined;
        if (isArr) {
          isArr = false;
          nst && $set(origin, key, []);
        } else if (clone._clone && mode !== undefined) {
          if (mode) {
            clone = clone.getRule();
            nst && $set(origin, key, {});
          } else {
            $set(origin, key, clone._clone());
            continue;
          }
        } else {
          nst && $set(origin, key, {});
        }
        origin[key] = deepExtend(origin[key], clone, mode);
      } else {
        $set(origin, key, clone);
        if (!is.Undef(clone)) {
          if (!is.Undef(clone.__json)) {
            origin[key].__json = clone.__json;
          }
          if (!is.Undef(clone.__origin)) {
            origin[key].__origin = clone.__origin;
          }
        }
      }
    }
  }
  return mode !== undefined && Array.isArray(origin) ? origin.filter(v => !v || !v.__ctrl) : origin;
}
function deepCopy(value) {
  return deepExtend({}, {
    value
  }).value;
}

const _extends = Object.assign || function (a) {
  for (let b, c = 1; c < arguments.length; c++) {
    for (let d in b = arguments[c], b) {
      Object.prototype.hasOwnProperty.call(b, d) && $set(a, d, b[d]);
    }
  }
  return a;
};
function extend() {
  return _extends.apply(this, arguments);
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

var css_248z = "._fc-group{display:flex;flex-direction:column;justify-content:center;min-height:38px;width:100%}._fc-group-disabled ._fc-group-add,._fc-group-disabled ._fc-group-btn{cursor:not-allowed}._fc-group-handle{background-color:#fff;border:1px dashed #d9d9d9;border-radius:15px;bottom:-15px;display:flex;flex-direction:row;padding:3px 8px;position:absolute;right:30px}._fc-group-btn{cursor:pointer}._fc-group-idx{align-items:center;background:#eee;border-radius:15px;bottom:-15px;display:flex;font-weight:700;height:30px;justify-content:center;left:10px;position:absolute;width:30px}._fc-group-handle ._fc-group-btn+._fc-group-btn{margin-left:7px}._fc-group-container{border:1px dashed #d9d9d9;border-radius:5px;display:flex;flex-direction:column;margin:5px 5px 25px;padding:20px 20px 25px;position:relative}._fc-group-arrow{height:20px;position:relative;width:20px}._fc-group-arrow:before{border-left:2px solid #999;border-top:2px solid #999;content:\"\";height:9px;left:5px;position:absolute;top:8px;transform:rotate(45deg);width:9px}._fc-group-arrow._fc-group-down{transform:rotate(180deg)}._fc-group-plus-minus{cursor:pointer;height:20px;position:relative;width:20px}._fc-group-plus-minus:after,._fc-group-plus-minus:before{background-color:#409eff;content:\"\";height:2px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:60%}._fc-group-plus-minus:before{transform:translate(-50%,-50%) rotate(90deg)}._fc-group-plus-minus._fc-group-minus:before{display:none}._fc-group-plus-minus._fc-group-minus:after{background-color:#f56c6c}._fc-group-add{border:1px solid rgba(64,158,255,.5);border-radius:15px;cursor:pointer;height:25px;width:25px}._fc-group-add._fc-group-plus-minus:after,._fc-group-add._fc-group-plus-minus:before{width:50%}";
styleInject(css_248z);

const NAME = 'fcGroup';
var Group = defineComponent({
  name: NAME,
  props: {
    field: String,
    rule: Array,
    expand: Number,
    options: Object,
    button: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    defaultValue: Object,
    sortBtn: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    syncDisabled: {
      type: Boolean,
      default: true
    },
    onBeforeRemove: {
      type: Function,
      default: () => {}
    },
    onBeforeAdd: {
      type: Function,
      default: () => {}
    },
    formCreateInject: Object,
    parse: Function
  },
  data() {
    return {
      len: 0,
      cacheRule: {},
      cacheValue: {},
      sort: [],
      form: markRaw(this.formCreateInject.form.$form())
    };
  },
  emits: ['update:modelValue', 'change', 'itemMounted', 'remove', 'add'],
  watch: {
    rule: {
      handler(n, o) {
        Object.keys(this.cacheRule).forEach(v => {
          const item = this.cacheRule[v];
          if (item.$f) {
            const val = item.$f.formData();
            if (n === o) {
              item.$f.deferSyncValue(() => {
                deepExtend(item.rule, n);
                item.$f.setValue(val);
              }, true);
            } else {
              const val = item.$f.formData();
              item.$f.once('reloading', () => {
                item.$f.setValue(val);
              });
              item.rule = deepCopy(n);
            }
          }
        });
      },
      deep: true
    },
    disabled(n) {
      if (this.syncDisabled) {
        const lst = this.cacheRule;
        Object.keys(lst).forEach(k => {
          lst[k].$f.disabled(n);
        });
      }
    },
    expand(n) {
      let d = n - this.modelValue.length;
      if (d > 0) {
        this.expandRule(d);
      }
    },
    modelValue: {
      handler(n) {
        n = n || [];
        let keys = Object.keys(this.sort),
          total = keys.length,
          len = total - n.length;
        if (len < 0) {
          for (let i = len; i < 0; i++) {
            this.addRule(n.length + i, true);
          }
          for (let i = 0; i < total; i++) {
            this.setValue(keys[i], n[i]);
          }
        } else {
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              this.removeRule(keys[total - i - 1]);
            }
          }
          n.forEach((val, i) => {
            this.setValue(keys[i], n[i]);
          });
        }
      },
      deep: true
    }
  },
  methods: {
    _value(v) {
      return v && hasProperty(v, this.field) ? v[this.field] : v;
    },
    cache(k, val) {
      this.cacheValue[k] = JSON.stringify(val);
    },
    input(value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
    formData(key, formData) {
      const cacheRule = this.cacheRule;
      const keys = this.sort;
      if (keys.filter(k => cacheRule[k].$f).length !== keys.length) {
        return;
      }
      const value = keys.map(k => {
        const data = key === k ? formData : {
          ...this.cacheRule[k].$f.form
        };
        const value = this.field ? data[this.field] || null : data;
        this.cache(k, value);
        return value;
      });
      this.input(value);
    },
    setValue(key, value) {
      const field = this.field;
      if (field) {
        value = {
          [field]: this._value(value)
        };
      }
      if (this.cacheValue[key] === JSON.stringify(field ? value[field] : value)) {
        return;
      }
      this.cache(key, value);
    },
    addRule(i, emit) {
      const rule = this.formCreateInject.form.copyRules(this.rule || []);
      const options = this.options ? {
        ...this.options
      } : {
        submitBtn: false,
        resetBtn: false
      };
      if (this.defaultValue) {
        if (!options.formData) options.formData = {};
        const defVal = deepCopy(this.defaultValue);
        extend(options.formData, this.field ? {
          [this.field]: defVal
        } : defVal);
      }
      this.parse && this.parse({
        rule,
        options,
        index: this.sort.length
      });
      this.cacheRule[++this.len] = {
        rule,
        options
      };
      if (emit) {
        nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
      }
    },
    add$f(i, key, $f) {
      this.cacheRule[key].$f = $f;
      nextTick(() => {
        if (this.syncDisabled) {
          $f.disabled(this.disabled);
        }
        this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
      });
    },
    removeRule(key, emit) {
      const index = Object.keys(this.cacheRule).indexOf(key);
      delete this.cacheRule[key];
      delete this.cacheValue[key];
      if (emit) {
        nextTick(() => this.$emit('remove', index));
      }
    },
    add(i) {
      if (this.disabled || false === this.onBeforeAdd(this.modelValue)) {
        return;
      }
      const value = [...this.modelValue];
      value.push(this.defaultValue ? deepCopy(this.defaultValue) : this.field ? null : {});
      this.input(value);
    },
    del(index, key) {
      if (this.disabled || false === this.onBeforeRemove(this.modelValue, index)) {
        return;
      }
      this.removeRule(key, true);
      const value = [...this.modelValue];
      value.splice(index, 1);
      this.input(value);
    },
    addIcon(key) {
      return createVNode("div", {
        "class": "_fc-group-btn _fc-group-plus-minus",
        "onClick": this.add
      }, null);
    },
    delIcon(index, key) {
      return createVNode("div", {
        "class": "_fc-group-btn _fc-group-plus-minus _fc-group-minus",
        "onClick": () => this.del(index, key)
      }, null);
    },
    sortUpIcon(index) {
      return createVNode("div", {
        "class": "_fc-group-btn _fc-group-arrow _fc-group-up",
        "onClick": () => this.changeSort(index, -1)
      }, null);
    },
    sortDownIcon(index) {
      return createVNode("div", {
        "class": "_fc-group-btn _fc-group-arrow _fc-group-down",
        "onClick": () => this.changeSort(index, 1)
      }, null);
    },
    changeSort(index, sort) {
      const a = this.sort[index];
      this.sort[index] = this.sort[index + sort];
      this.sort[index + sort] = a;
      this.formData(0);
    },
    makeIcon(total, index, key) {
      if (this.$slots.button) {
        return this.$slots.button({
          total,
          index,
          vm: this,
          key,
          del: () => this.del(index, key),
          add: this.add
        });
      }
      const btn = [];
      if ((!this.max || total < this.max) && total === index + 1) {
        btn.push(this.addIcon(key));
      }
      if (total > this.min) {
        btn.push(this.delIcon(index, key));
      }
      if (this.sortBtn && index) {
        btn.push(this.sortUpIcon(index));
      }
      if (this.sortBtn && index !== total - 1) {
        btn.push(this.sortDownIcon(index));
      }
      return btn;
    },
    emitEvent(name, args, index, key) {
      this.$emit(name, ...args, this.cacheRule[key].$f, index);
    },
    expandRule(n) {
      for (let i = 0; i < n; i++) {
        this.addRule(i);
      }
    }
  },
  created() {
    watch(() => ({
      ...this.cacheRule
    }), n => {
      this.sort = Object.keys(n);
    }, {
      immediate: true
    });
    const d = (this.expand || 0) - this.modelValue.length;
    for (let i = 0; i < this.modelValue.length; i++) {
      this.addRule(i);
    }
    if (d > 0) {
      this.expandRule(d);
    }
  },
  render() {
    const keys = this.sort;
    const button = this.button;
    const Type = this.form;
    const disabled = this.disabled;
    const children = keys.length === 0 ? this.$slots.default ? this.$slots.default({
      vm: this,
      add: this.add
    }) : createVNode("div", {
      "key": 'a_def',
      "class": "_fc-group-plus-minus _fc-group-add fc-clock",
      "onClick": this.add
    }, null) : keys.map((key, index) => {
      const {
        rule,
        options
      } = this.cacheRule[key];
      const btn = button && !disabled ? this.makeIcon(keys.length, index, key) : [];
      return createVNode("div", {
        "class": "_fc-group-container",
        "key": key
      }, [createVNode(Type, mergeProps({
        "key": key
      }, {
        'onUpdate:modelValue': formData => this.formData(key, formData),
        'onEmit-event': (name, ...args) => this.emitEvent(name, args, index, key),
        'onUpdate:api': $f => this.add$f(index, key, $f),
        inFor: true,
        modelValue: this.field ? {
          [this.field]: this._value(this.modelValue[index])
        } : this.modelValue[index],
        rule,
        option: options,
        extendOption: true
      }), null), createVNode("div", {
        "class": "_fc-group-idx"
      }, [index + 1]), btn.length ? createVNode("div", {
        "class": "_fc-group-handle fc-clock"
      }, [btn]) : null]);
    });
    return createVNode("div", {
      "key": 'con',
      "class": '_fc-group ' + (disabled ? '_fc-group-disabled' : '')
    }, [children]);
  }
});

export { Group as default };
