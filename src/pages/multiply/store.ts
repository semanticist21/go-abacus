import {createJSONStorage, persist} from 'zustand/middleware';
import {create as createMutative} from 'mutative';
import {create} from 'zustand';
import {multiplyOptionsSchema, MultiplyOptions, initialOptions} from './type';

interface StoreOptions {
  setOptions: (options: Partial<MultiplyOptions>) => void;
  options: MultiplyOptions;
  reset: () => void;
}

export const useMultiplyOptionStore = create(
  persist<StoreOptions>(
    (set) => ({
      setOptions: (options) =>
        set((state) =>
          createMutative(state, (draft) => {
            Object.assign(draft.options, options);
          })
        ),
      reset: () => set({options: initialOptions}),
      options: initialOptions,
    }),
    {
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        useMultiplyOptionStore.setState((prev) =>
          createMutative(prev, (draft) => {
            draft.options = multiplyOptionsSchema.parse(state);
          })
        );
      },
      storage: createJSONStorage(() => localStorage),
      name: 'multiply-options-storage',
    }
  )
);
