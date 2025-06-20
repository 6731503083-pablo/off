import { ReactNode } from "react";

// Search Sheet Content Component
interface SheetContentProps {
  title: string;
  children: ReactNode;
}

const SheetContent = ({ title, children }: SheetContentProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      {children}
    </div>
  );
};

export default SheetContent;