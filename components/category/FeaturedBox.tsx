import Link from "next/link";

// Featured Box Component
interface FeaturedBoxProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const FeaturedBox = ({
  title,
  description,
  linkText,
  linkHref,
}: FeaturedBoxProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href={linkHref}
        className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default FeaturedBox;
