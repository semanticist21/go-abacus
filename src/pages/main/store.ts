import {create as createMutative} from 'mutative';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {initialOptions, Options, optionsSchema} from './type';

type StoreOptions = {
  options: Options;
  setOptions: (options: Partial<Options>) => void;
  reset: () => void;
};

export const useOptionStore = create(
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
      name: 'options-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        useOptionStore.setState((prev) =>
          createMutative(prev, (draft) => {
            draft.options = optionsSchema.parse(state);
          })
        );
      },
    }
  )
);
