interface ToolbarButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const ToolbarButton = ({ active, onClick, children }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-8 w-8 items-center justify-center rounded border text-sm cursor-pointer
      ${
        active
          ? 'bg-blue-50 border-blue-400 text-blue-600'
          : 'border-gray-300 text-gray-600 hover:bg-gray-100'
      }`}
  >
    {children}
  </button>
);
