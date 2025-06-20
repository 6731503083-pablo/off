import Link from "next/link";

interface CategoryListProps {
  title: string;
  items: Array<{ label: string; href: string }>;
}

const CategoryList = ({ title, items }: CategoryListProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="text-gray-600 hover:text-gray-900"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
