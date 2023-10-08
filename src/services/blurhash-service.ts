import axios from 'axios';
import { encode as encodeBlurhash } from 'blurhash';
import sharp from 'sharp';

class BlurhashService {
  private static readonly BLUR_FACTOR = 5;

  public get blurFactor() {
    return BlurhashService.BLUR_FACTOR;
  }

  public async generateBlurhashFromImageUrl(
    imageUrl: string,
  ): OrThrows<Promise<string>> {
    const buffer = await this.fetchImageBuffer(imageUrl);

    return await this.generateBlurhashFromBuffer(buffer);
  }

  private async fetchImageBuffer(imageUrl: string): Promise<Buffer> {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'utf-8');

    return buffer;
  }

  private async generateBlurhashFromBuffer(
    imageBuffer: Buffer,
  ): OrThrows<Promise<string>> {
    const { data: pixels, info: metadata } = await sharp(imageBuffer)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    const clamped = new Uint8ClampedArray(pixels);
    const blurhash = encodeBlurhash(
      clamped,
      metadata.width,
      metadata.height,
      BlurhashService.BLUR_FACTOR,
      BlurhashService.BLUR_FACTOR,
    );

    return blurhash;
  }
}

export { BlurhashService };
