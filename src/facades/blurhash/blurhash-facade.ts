interface BlurhashFacade {
  encode(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
    componentX: number,
    componentY: number,
  ): Promise<string>;
}

export { BlurhashFacade };
