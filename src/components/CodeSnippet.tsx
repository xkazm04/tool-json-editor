interface OwnProps {
  text: string;
}

export const CodeSnippet = ({ text }: OwnProps): JSX.Element => {
  return (
    <pre className='bg-stone-700 p-3 my-8 text-green-600 text-sm rounded-xl'>
      {text}
    </pre>
  );
};
