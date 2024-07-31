import Image from "next/image";
import { getPostsThatShouldBeDisplayed } from '~/server/repo';

const imageCall = await getPostsThatShouldBeDisplayed();

console.log(imageCall);

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
        {imageCall.map((image) => (
            <div key={Math.random()} className="relative h-96 w-96">
                <Image src={image.image} alt={image.title}
                  fill
                  quality={80}
                  style={{objectFit: "contain"}}
                  placeholder="empty" />
              </div>
          ))}
    </div>
  );
}
