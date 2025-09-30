interface TextHeaderProps {
  text: string;
  withLine?: boolean;
}

const TextHeader = ({ text, withLine = false }: TextHeaderProps) => {
  return (
    <div className="inline-block w-fit my-2">
      <h1 className="text-2xl font-heading tracking-wider">{text}</h1>
      {withLine && <hr className=" border" />}
    </div>
  );
};

export default TextHeader;
