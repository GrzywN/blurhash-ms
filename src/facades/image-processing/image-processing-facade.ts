interface ImageData {
  width: number;
  height: number;
  pixels: Uint8ClampedArray;
}

interface ImageProcessingFacade {
  extractDataFromImageBuffer(buffer: Buffer): Promise<ImageData>;
}

export { ImageData, ImageProcessingFacade };
