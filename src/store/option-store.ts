import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {Options, initialOptions, optionsSchema} from './type';

type StoreOptions = {
  options: Options;
  setOptions: (options: Partial<Options>) => void;
  reset: () => void;
};

export const useOptionStore = create(
  persist<StoreOptions>(
    (set, get) => ({
      options: initialOptions,
      setOptions: (options) => set({options: {...get().options, ...options}}),
      reset: () => set({options: initialOptions}),
    }),
    {
      name: 'options-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        useOptionStore.setState((prev) => ({
          ...prev,
          options: optionsSchema.parse(state),
        }));
      },
    }
  )
);
