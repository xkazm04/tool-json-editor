interface CodeSnippetProps {
  text: string;
}

export const CodeSnippet = ({ text }: CodeSnippetProps): JSX.Element => {
  return (
    <pre className='bg-stone-700 p-3 text-green-600  rounded-xl overflow-x-auto'>
      {text}
    </pre>
  );
};
