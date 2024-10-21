import {z} from 'zod';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export const optionsSchema = z.object({
  title: z.string().default('LEVEL 0'),
  subtitle: z.string().default('주산 암산'),
  pageCount: z.number().min(1).max(20).default(10),
  digitCount: z.number().min(1).max(8).default(4),
  includeMinus: z.boolean().default(false),
  randomDigit: z.boolean().default(false),
});

type Options = z.infer<typeof optionsSchema>;

type StoreOptions = {
  options: Options;
  setOptions: (options: Partial<Options>) => void;
  reset: () => void;
};

export const useOptionStore = create(
  persist<StoreOptions>(
    (set, get) => ({
      options: optionsSchema.parse({}),
      setOptions: (options) => set({options: {...get().options, ...options}}),
      reset: () => set({options: optionsSchema.parse({})}),
    }),
    {
      name: 'options-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
