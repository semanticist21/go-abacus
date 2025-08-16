import {isEqual} from 'lodash-es';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';

import {MouseEvent} from 'react';

import Header from '../../components/ui/header';
import {useMultiplyOptionStore} from './store';
import {initialOptions} from './type';

const MultiplyHeader = () => {
  // store
  const {reset, options} = useMultiplyOptionStore();

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

  return (
    <Header
      isEqualToInitial={isEqualToInitial}
      onCreateAndSave={async (_e: MouseEvent<HTMLButtonElement>) => {
        throw new Error('Function not implemented.');
      }}
      onReset={handleReset}
    />
  );
};

export default MultiplyHeader;
