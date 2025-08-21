import {createJSONStorage, persist} from 'zustand/middleware';
import {create as createMutative} from 'mutative';
import {create} from 'zustand';
import {initialOptions, optionsSchema, Options} from './type';

interface StoreOptions {
  setOptions: (options: Partial<Options>) => void;
  reset: () => void;
  options: Options;
}

export const useOptionStore = create(
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

        useOptionStore.setState((prev) =>
          createMutative(prev, (draft) => {
            draft.options = optionsSchema.parse(state);
          })
        );
      },
      storage: createJSONStorage(() => localStorage),
      name: 'options-storage',
    }
  )
);
