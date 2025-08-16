import {MouseEvent} from 'react';
import Header from '../../components/ui/header';

const MultiplyHeader = () => {
  return (
    <Header
      isEqualToInitial={false}
      onCreateAndSave={async (_e: MouseEvent<HTMLButtonElement>) => {
        throw new Error('Function not implemented.');
      }}
      onReset={(_e: MouseEvent<HTMLButtonElement>) => {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default MultiplyHeader;
