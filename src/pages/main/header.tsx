import {invoke} from '@tauri-apps/api/core';
import {isEqual} from 'lodash-es';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

import {MouseEvent} from 'react';

import {createPagesThenSave} from '../../components/docx/create-pages';
import Header from '../../components/ui/header';
import {useOptionStore} from './store';
import {initialOptions, ISolutions, optionsSchema} from './type';

const MainHeader = () => {
  // store
  const {reset, options} = useOptionStore();

  // state props
  const [isEqualToInitial, setIsEqualToInitial] = useState(true);

  useEffect(() => {
    setIsEqualToInitial(!isEqual(initialOptions, options));
  }, [options]);

  // 초기화 event handler
  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    toast.success('초기화되었습니다.');
  };

  // 생성 및 저장 event handler
  const handleCreateAndSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const {success, error} = await optionsSchema.safeParseAsync(options);

      if (!success) {
        toast.error(error.issues[0]?.message ?? '옵션 검증에 실패했습니다.');
        return;
      }

      if (options.is_decimal && options.digit === 1) {
        toast.error('소수점은 1자리 수로 생성할 수 없습니다.');
        return;
      }

      const result: ISolutions = await invoke('generate', {options});
      await createPagesThenSave(options, result.solutions);
    } catch (e) {
      console.error(e);
      toast.error('생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <Header
      isEqualToInitial={isEqualToInitial}
      onCreateAndSave={handleCreateAndSave}
      onReset={handleReset}
    />
  );
};

export default MainHeader;
