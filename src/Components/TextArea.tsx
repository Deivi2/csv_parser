import { ChangeEvent, FC } from "react";

interface IProps {
  handleTextInput: (input: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const TextArea: FC<IProps> = (props) => {
  return (
    <textarea
      rows={10}
      cols={100}
      value={props.value}
      onChange={props.handleTextInput}
    />
  );
};

export default TextArea;
