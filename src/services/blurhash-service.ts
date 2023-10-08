import axios from 'axios';
import { BlurhashFacade } from '../facades/blurhash/blurhash-facade';
import { ImageProcessingFacade } from '../facades/image-processing/image-processing-facade';

class BlurhashService {
  constructor(
    private blurhashFacade: BlurhashFacade,
    private imageProcessingFacade: ImageProcessingFacade,
  ) {}

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
    const { width, height, pixels } =
      await this.imageProcessingFacade.extractDataFromImageBuffer(imageBuffer);

    const blurhash = await this.blurhashFacade.encode(
      pixels,
      width,
      height,
      BlurhashService.BLUR_FACTOR,
      BlurhashService.BLUR_FACTOR,
    );

    return blurhash;
  }
}

export { BlurhashService };
