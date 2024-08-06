import Image from "next/image";
import { getPostsThatShouldBeDisplayed } from '~/server/repo';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const imageCall = await getPostsThatShouldBeDisplayed();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
        {imageCall.map((image) => (
            <div key={Math.random()} className="relative h-96 w-96">
                <Image 
                  src={image.image} 
                  alt={image.title}
                  fill
                  quality={70}
                  style={{objectFit: "contain"}}
                  placeholder="empty" />
              </div>
          ))}
    </div>
  );
}
