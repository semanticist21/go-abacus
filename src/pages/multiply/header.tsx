import Header from '../../components/ui/header';

const MultiplyHeader = () => {
  return (
    <Header
      isEqualToInitial={false}
      onCreateAndSave={async (e: React.MouseEvent<HTMLButtonElement>) => {
        throw new Error('Function not implemented.');
      }}
      onReset={(e: React.MouseEvent<HTMLButtonElement>) => {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default MultiplyHeader;
