// pages/api/capture-images.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface ImageData {
  image: string;
  fileName: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { images }: { images: ImageData[] } = req.body;
    const tempDir = path.join(process.cwd(), "public", "temp");
    fs.mkdirSync(tempDir, { recursive: true });

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Invalid images data" });
    }

    for (let i = 0; i < images.length; i++) {
      const tempImageFilePath = path.join(tempDir, `${images[i].fileName}.png`);
      const imageBuffer = Buffer.from(
        images[i].image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      fs.writeFileSync(tempImageFilePath, imageBuffer);
    }

    res
      .status(200)
      .json({ message: "Images captured and saved successfully", images });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
