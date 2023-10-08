import sharp from 'sharp';
import { ImageData, ImageProcessingFacade } from './image-processing-facade';

class ImageProcessingFacadeImpl implements ImageProcessingFacade {
  public async extractDataFromImageBuffer(buffer: Buffer): Promise<ImageData> {
    const {
      data,
      info: { width, height },
    } = await sharp(buffer)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    return {
      width,
      height,
      pixels: new Uint8ClampedArray(data),
    };
  }
}

export { ImageProcessingFacadeImpl };
