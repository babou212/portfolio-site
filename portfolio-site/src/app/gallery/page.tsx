/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Photo from '../../components/photo'
import { getAllImage } from '~/server/repo';

const imageCall = await getAllImage();

export default function GalleryPage() {
    return (
        <div className="flex flex-wrap gap-4">
        {imageCall.map((image: { image: any }) => (
            <div key={Math.random()} className="w-48">
              <Photo url={image.image} alt={image.image}/>
            </div>
          ))}
        </div>
    );
}
