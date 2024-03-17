import domtoimage from "dom-to-image";
import axios from "axios";

const captureScreenshots = async (
  imageIds: string[],
  postUrl: string
): Promise<ImageTypeData[]> => {
  const elementsToHide = document.querySelectorAll(".share, .download, .chart");

  const imageData: (ImageTypeData | null)[] = await Promise.all(
    imageIds.map(async (id): Promise<ImageTypeData | null> => {
      const element = document.getElementById(id);
      if (element) {
        try {
          const dataUrl = await domtoimage.toJpeg(element, {
            height: element.offsetHeight,
            width: element.offsetWidth,
          });
          return {
            image: dataUrl,
            fileName: `${id}`,
          };
        } catch (error) {
          console.error(`Could not generate image for ${id}:`, error);
          return null;
        }
      } else {
        return null;
      }
    })
  );

  elementsToHide.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.classList.add("active-after-screenshot");
    }
  });

  const validImageData = imageData.filter(
    (data): data is ImageTypeData => data !== null
  );

  if (validImageData.length > 0) {
    try {
      await axios.post(postUrl, {
        images: validImageData,
      });

      console.log("Images captured and saved successfully");
    } catch (error) {
      console.error("Error capturing and saving images:", error);
    }
  }

  return validImageData ?? [];
};

export default captureScreenshots;
