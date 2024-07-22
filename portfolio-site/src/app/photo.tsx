type Photo = {
    url: string,
}
 
export default function Photo({ url }: Photo) {
    return (
      <main className="">
        <img src={url} />
      </main>
    );
}
