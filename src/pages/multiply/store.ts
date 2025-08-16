import {create as createMutative} from 'mutative';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {initialOptions, MultiplyOptions, multiplyOptionsSchema} from './type';

interface StoreOptions {
  options: MultiplyOptions;
  setOptions: (options: Partial<MultiplyOptions>) => void;
  reset: () => void;
}

export const useMultiplyOptionStore = create(
  persist<StoreOptions>(
    (set) => ({
      options: initialOptions,
      setOptions: (options) =>
        set((state) =>
          createMutative(state, (draft) => {
            Object.assign(draft.options, options);
          })
        ),
      reset: () => set({options: initialOptions}),
    }),
    {
      name: 'multiply-options-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        useMultiplyOptionStore.setState((prev) =>
          createMutative(prev, (draft) => {
            draft.options = multiplyOptionsSchema.parse(state);
          })
        );
      },
    }
  )
);
