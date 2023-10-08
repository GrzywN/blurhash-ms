import { encode as encodeBlurhash } from 'blurhash';
import { BlurhashFacade } from './blurhash-facade';

class BlurhashFacadeImpl implements BlurhashFacade {
  public encode(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
    componentX: number,
    componentY: number,
  ): OrThrows<Promise<string>> {
    return new Promise((resolve, reject) => {
      try {
        const blurhash = encodeBlurhash(
          pixels,
          width,
          height,
          componentX,
          componentY,
        );
        resolve(blurhash);
      } catch (error: unknown) {
        reject(error);
      }
    });
  }
}

export { BlurhashFacadeImpl };
