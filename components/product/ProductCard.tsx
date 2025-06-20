import Image from "next/image";
import Link from "next/link";

// Product Card Component
interface ProductCardProps {
  href: string;
  imageSrc: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  colorOptions: Array<{ color: string; label: string }>;
}

const ProductCard = ({
  href,
  imageSrc,
  title,
  price,
  originalPrice,
  reviewCount,
  colorOptions,
}: ProductCardProps) => {
  return (
    <Link
      href={href}
      className="group block rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <Image
          src={imageSrc}
          alt={title}
          width={1000}
          height={1000}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="px-4 pt-3 pb-1">
        <h4 className="font-semibold text-gray-900 text-lg mb-1 leading-tight">
          {title}
        </h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">
              {originalPrice && (
                <span className="line-through text-gray-400 mr-2">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              <span className={originalPrice ? "text-red-600 font-medium" : ""}>
                ${price.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex items-center text-sm">
            <span className="ml-1 text-gray-500">({reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
