// Navigation Icon Button Component
interface NavIconButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  badge?: number;
}

const NavIconButton = ({
  icon,
  label,
  isActive,
  onMouseEnter,
  buttonRef,
  badge,
}: NavIconButtonProps) => {
  return (
    <button
      ref={buttonRef}
      aria-label={label}
      className={`rounded-full p-2 transition-colors duration-300 
        relative hover:bg-gray-200 focus:ring-2 focus:ring-gray-500
        ${isActive ? "text-gray-900" : "text-white"}`}
      onMouseEnter={onMouseEnter}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

export default NavIconButton;