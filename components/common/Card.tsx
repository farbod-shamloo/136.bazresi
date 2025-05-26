// components/Card.tsx

import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  image: string;
  link?: string;
};

const Card = ({ title, image, link = "#" }: CardProps) => {
  return (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition duration-300 flex flex-col items-center text-center">
        <Image src={image} alt={title} width={80} height={80} className="mb-3" />
        <p className="text-sm font-semibold">{title}</p>
      </div>
    </Link>
  );
};

export default Card;
