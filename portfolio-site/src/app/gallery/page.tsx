/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import { getAllImage } from '~/server/repo';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const imageCall = await getAllImage();
  
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center">
        {imageCall.map((image) => (
            <div key={Math.random()} className="relative h-64 w-64">
                <Image 
                  src={image.image} 
                  alt={image.title}
                  fill
                  quality={80}
                  style={{objectFit: "contain"}}
                  placeholder="empty" />
              </div>
          ))}
        </div>
    );
}
