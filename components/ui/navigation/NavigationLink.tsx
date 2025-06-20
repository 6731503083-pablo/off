import Link from "next/link";

// NavigationLink Component
interface NavigationLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: (e: React.MouseEvent) => void;
  linkRef: React.RefObject<HTMLAnchorElement | null>;
}

const NavigationLink = ({
  href,
  label,
  isActive,
  onMouseEnter,
  onClick,
  linkRef,
}: NavigationLinkProps) => {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center relative ${
        isActive ? "text-gray-900" : "text-white"
      }`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      ref={linkRef as React.RefObject<HTMLAnchorElement>}
    >
      <span className="relative font-bold text-lg">
        {label}
        <span
          className={`absolute left-0 bottom-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
            isActive ? "bg-gray-900" : "bg-white"
          }`}
        ></span>
      </span>
    </Link>
  );
};

export default NavigationLink;