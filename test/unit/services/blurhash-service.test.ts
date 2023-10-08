import { describe, it, expect, beforeEach, jest, afterEach } from 'bun:test';
import { BlurhashService } from '../../../src/services/blurhash-service';

const blurhashFacadeMock = {
  encode: jest.fn(),
};

const imageProcessingFacadeMock = {
  extractDataFromImageBuffer: jest.fn(),
};

describe('BlurhashService', () => {
  let blurhashService: BlurhashService;

  beforeEach(() => {
    blurhashService = new BlurhashService(
      blurhashFacadeMock,
      imageProcessingFacadeMock,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.todo('should fetch image buffer from URL');

  it.todo('should generate blurhash from image URL');

  it('should generate blurhash from image buffer', async () => {
    const mockBuffer = Buffer.from('Mock Image Buffer');
    const mockWidth = 100;
    const mockHeight = 50;
    const mockPixels = [0, 1, 2]; // Mocked pixel data
    const mockBlurhash = 'MockedBlurhash';

    imageProcessingFacadeMock.extractDataFromImageBuffer.mockResolvedValueOnce({
      width: mockWidth,
      height: mockHeight,
      pixels: mockPixels,
    });

    blurhashFacadeMock.encode.mockResolvedValueOnce(mockBlurhash);

    const generatedBlurhash =
      await blurhashService['generateBlurhashFromBuffer'](mockBuffer);

    expect(
      imageProcessingFacadeMock.extractDataFromImageBuffer,
    ).toHaveBeenCalled();
    expect(blurhashFacadeMock.encode).toHaveBeenCalled();
    expect(generatedBlurhash).toEqual(mockBlurhash);
  });

  it('should have default blur factor of 5', () => {
    expect(blurhashService.blurFactor).toEqual(5);
  });

  it('should have blur factor in a range between 1 and 9', () => {
    expect(blurhashService.blurFactor).toBeGreaterThan(1);
    expect(blurhashService.blurFactor).toBeLessThan(9);
  });
});
