import {useEffect, useState} from 'react';
import {isEqual} from 'lodash-es';
import {MouseEvent} from 'react';
import {toast} from 'sonner';
import Header from '../../components/ui/header';
import {useMultiplyOptionStore} from './store';
import {initialOptions} from './type';

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

  return (
    <Header
      onCreateAndSave={async (_e: MouseEvent<HTMLButtonElement>) => {
        throw new Error('Function not implemented.');
      }}
      isEqualToInitial={isEqualToInitial}
      onReset={handleReset}
    />
  );
};

export default MultiplyHeader;
