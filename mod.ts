import { Buffer } from "./deps.ts";
import { decode as JPEGDecode } from "./src/Decoder.ts";
import { encode as JPEGEncode } from "./src/Encoder.ts";

export interface RawImageData<T> {
    width: number;
    height: number;
    data: T;
}

export type BufferRet = RawImageData<Buffer>;
export type UintArrRet = RawImageData<Uint8Array>;

export type ImageData = BufferRet | UintArrRet;
export type BufferLike = Buffer | Uint8Array | ArrayLike<number> | Iterable<number> | ArrayBuffer;

class JPEG {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Encodes to JPEG data
     * @param imgData Image data to encode
     * @param quality Image quality
     */
    static encode(imgData: RawImageData<BufferLike>, quality?: number): BufferRet {
        return JPEGEncode(imgData, quality);
    }

    /**
     * Decodes JPEG data
     * @param jpegData JPEG data to decode
     * @param opts Options
     */
    static decode(jpegData: BufferLike, opts?: {
        useTArray: true;
        colorTransform?: boolean;
        formatAsRGBA?: boolean;
        tolerantDecoding?: boolean;
        maxResolutionInMP?: number;
        maxMemoryUsageInMB?: number;
    }): UintArrRet & { comments?: string[] };
    static decode(jpegData: BufferLike, opts?: {
        useTArray: false;
        colorTransform?: boolean;
        formatAsRGBA?: boolean;
        tolerantDecoding?: boolean;
        maxResolutionInMP?: number;
        maxMemoryUsageInMB?: number;
    }): BufferRet & { comments?: string[] };
    static decode(jpegData: BufferLike, opts?: {
        useTArray: boolean;
        colorTransform?: boolean;
        formatAsRGBA?: boolean;
        tolerantDecoding?: boolean;
        maxResolutionInMP?: number;
        maxMemoryUsageInMB?: number;
    }): UintArrRet & { comments?: string[] } | BufferRet & { comments?: string[] } {
        return JPEGDecode(jpegData, opts);
    }

}

export default JPEG;
export { JPEG };