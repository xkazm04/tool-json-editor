interface CodeSnippetProps {
  text: string;
}

export const CodeSnippet = ({ text }: CodeSnippetProps): JSX.Element => {
  return (
    <pre className="bg-input_bg p-3 text-gold  overflow-x-auto">{text}</pre>
  );
};
