import {
  defineComponent,
  cloneVNode,
  h,
  type PropType,
  type VNode,
} from "vue";

export const Primitive = defineComponent({
  name: "Primitive",
  props: {
    as: {
      type: [String, Object] as PropType<any>,
      default: "div",
    },
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const defaultSlot = slots.default?.();
      if (props.asChild && defaultSlot && defaultSlot.length > 0) {
        const first = defaultSlot[0];
        return cloneVNode(first as VNode, attrs, true);
      }
      return h(props.as, attrs, slots);
    };
  },
});
