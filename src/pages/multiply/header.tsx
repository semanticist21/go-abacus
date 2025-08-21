import {invoke} from '@tauri-apps/api/core';
import {useEffect, useState} from 'react';
import {isEqual} from 'lodash-es';
import {MouseEvent} from 'react';
import {toast} from 'sonner';
import {createPagesThenSave} from '../../components/docx-multiplier/create-pages';
import {multiplyOptionsSchema, IMultiplySolutions, initialOptions} from './type';
import Header from '../../components/ui/header';
import {useMultiplyOptionStore} from './store';

const MultiplyHeader = () => {
  // store
  const {options, reset} = useMultiplyOptionStore();

  // state props
  const [isEqualToInitial, setIsEqualToInitial] = useState(true);

  useEffect(() => {
    setIsEqualToInitial(!isEqual(initialOptions, options));
  }, [options]);

  // 초기화 event handler
  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    toast.success('성공', {
      description: '초기화되었습니다.',
    });
  };

  // 생성 및 저장 event handler
  const handleCreateAndSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const {success, error} = await multiplyOptionsSchema.safeParseAsync(options);

      if (!success) {
        toast.error('에러', {
          description: error.issues[0]?.message ?? '옵션 검증에 실패했습니다.',
        });
        return;
      }

      const result: IMultiplySolutions = await invoke('generate_multiply', {options});
      await createPagesThenSave(options, result.solutions);
    } catch (e) {
      console.error(e);
      toast.error('에러', {
        description: '생성 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <Header
      onCreateAndSave={handleCreateAndSave}
      isEqualToInitial={isEqualToInitial}
      onReset={handleReset}
    />
  );
};

export default MultiplyHeader;
