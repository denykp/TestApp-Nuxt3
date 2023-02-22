import { Props } from "nuxt/dist/head/runtime/types";

export function useModelWrapper(props: Props, emit: any, name: string) {
  return computed({
    get: () => props.modelValue,
    set: (value) => emit(`update:${name}`, value),
  });
}
