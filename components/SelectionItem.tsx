type Props = {
  name: string;
  label: string;
  value: string;
  icon: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const SelectionItem: React.FC<Props> = ({
  name,
  label,
  value,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className="p-3 bg-gray-800 rounded-xl flex items-center"
      onClick={onClick}
    >
      <img className="w-10 h-10 mr-3" src={icon} />
      <label className="font-medium font-sans text-white mr-auto select-none">
        {label}
      </label>
      <input
        name={name}
        type="checkbox"
        value={value}
        className="w-5 h-5 text-green-500 border-2 bg-gray-900 rounded-full border-gray-600 focus:ring-blue-500"
        checked={isSelected}
      />
    </div>
  );
};

export default SelectionItem;
