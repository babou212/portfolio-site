const mocks = [
  "/20240615-20240615-DSCF5843-Enhanced-NR.jpg",
  "/20240507-DSCF5302.jpg",
  "/20240507-DSCF5293.jpg",
  "/20240506-DSCF5161-Enhanced-NR.jpg",
  "/20230910-DSCF3236-Enhanced-NR-Edit.jpg",
  "/20230910-DSCF3233-Enhanced-NR.jpg",
  "/20230909-DSCF3137-Enhanced-NR.jpg",
];

const mockImages = mocks.map((url, index) => ({
  id: index +1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
      {[...mockImages, ...mockImages].map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} />
        </div>
      ))}
      </div>
    </main>
  );
}