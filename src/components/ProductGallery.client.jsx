function ProductGallery({ media }) {
    if (!media.length) {
      return null;
    }
  
    return (
      <div
        className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-screen md:w-full lg:col-span-2`}
      >
        {media.map((med, i) => {
  
          const data = {
            ...med,
            image: {
              ...med.image,
              altText: med.alt || "Product image",
            },
          };
  
          return (
            <div
            className={`snap-center card-image aspect-square md:h-[80vh] w-[60vw] shadow-sm rounded`}
            key={med.id || med.image.id}
          >
            <MediaFile
              tabIndex="0"
              className={`w-full h-full object-contain`}
              data={data}
              options={{
                crop: "center",
              }}
            />
          </div>
          );
        })}
      </div>
    );
  }