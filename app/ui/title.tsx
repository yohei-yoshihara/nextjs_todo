type Props = {
  label: string;
};

export default function Title(props: Props) {
  return (
    <h1 className="text-gray-600 font-bold text-2xl mb-3">{props.label}</h1>
  );
}
