import Image from 'next/image'

type Photo = {
    url: string,
    alt: string
}
 
export default function Photo({ url, alt }: Photo) {
    return (
      <main >
        <Image src={url} alt={alt} width={500} height={500}/>
      </main>
    );
}
