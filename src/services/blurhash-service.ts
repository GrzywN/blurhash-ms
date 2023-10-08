import axios from "axios";
import { encode as encodeBlurhash } from "blurhash";
import sharp from "sharp";

class BlurhashService {
    constructor() { }

    private static readonly BLUR_FACTOR = 5;

    public get blurFactor() {
        return BlurhashService.BLUR_FACTOR;
    };

    public async generateBlurhashFromImageUrl(imageUrl: string): OrThrows<Promise<String>> {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, "utf-8");

        const { data: pixels, info: metadata } = await sharp(buffer).raw().ensureAlpha().toBuffer(
            { resolveWithObject: true }
        )

        const clamped = new Uint8ClampedArray(pixels)
        const encoded = encodeBlurhash(
            clamped,
            metadata.width,
            metadata.height,
            BlurhashService.BLUR_FACTOR,
            BlurhashService.BLUR_FACTOR,
        );

        return encoded;
    }

    // TODO: implement generateBlurhashFromBuffer(imageBuffer: Buffer)
}

export { BlurhashService };