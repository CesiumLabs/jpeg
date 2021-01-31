# JPEG
JPEG Encoder/Decoder for Deno based on Node's **[jpeg-js](https://github.com/jpeg-js/jpeg-js)**.

# Example
## Decode JPEG
```js
import JPEG from "https://deno.land/x/jpeg/mod.ts";

const img = await Deno.readFile("./img.jpg");
const raw = JPEG.decode(img);

console.log(raw);

/*
{
  width: 850,
  height: 571,
  exifBuffer: undefined,
  data: Buffer(1941400) [
     78,  73,  83, 255,  86,  81,  91, 255,  82,  77,  85, 255,  68,  63,  71,
    255,  61,  56,  64, 255,  67,  62,  70, 255,  73,  68,  76, 255,  71,  66,
     74, 255,  65,  60,  66, 255,  75,  70,  76, 255,  83,  78,  84, 255,  81,
     76,  82, 255,  75,  71,  74, 255,  79,  75,  78, 255,  96,  92,  95, 255,
    113, 109, 112, 255,  95,  92,  99, 255,  86,  83,  90, 255,  89,  86,  93,
    255,  91,  88,  95, 255,  74,  71,  78, 255,  57,  54,  61, 255,  65,  62,
     69, 255,  83,  80,  87, 255,  83,  80,  87, 255,
    ... 1941300 more items
  ]
}
*/
```

## Encoding JPEG

```js
import JPEG from "https://deno.land/x/jpeg/mod.ts";

const width = 320, height = 180;
const frameData = new Uint8Array(width * height * 4);

let i = 0;
while(i < frameData.length) {
    frameData[i++] = 255; // red
    frameData[i++] = 66; // green
    frameData[i++] = 159; // blue
    frameData[i++] = 0; // alpha - ignored in JPEGs
}

const rawImageData = {
    data: frameData,
    width: width,
    height: height,
};
var jpegImageData = JPEG.encode(rawImageData, 50);
console.log(jpegImageData);

Deno.writeFileSync("./test/enc.jpg", jpegImageData.data);

/*
{
  data: Uint8Array(2222) [
    255, 216, 255, 224,  0,  16,  74,  70,  73,  70,   0,   1,   1,  0,  0,
      1,   0,   1,   0,  0, 255, 219,   0, 132,   0,  16,  11,  12, 14, 12,
     10,  16,  14,  13, 14,  18,  17,  16,  19,  24,  40,  26,  24, 22, 22,
     24,  49,  35,  37, 29,  40,  58,  51,  61,  60,  57,  51,  56, 55, 64,
     72,  92,  78,  64, 68,  87,  69,  55,  56,  80, 109,  81,  87, 95, 98,
    103, 104, 103,  62, 77, 113, 121, 112, 100, 120,  92, 101, 103, 99,  1,
     17,  18,  18,  24, 21,  24,  47,  26,  26,  47,
    ... 2122 more items
  ],
  width: 320,
  height: 180
}
*/
```

# Options
## Decode Options

| Option               | Description                                                                                                                                                                                       | Default     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `colorTransform`     | Transform alternate colorspaces like YCbCr. `undefined` means respect the default behavior encoded in metadata.                                                                                   | `undefined` |
| `useTArray`          | Decode pixels into a typed `Uint8Array` instead of a `Buffer`.                                                                                                                                    | `false`     |
| `formatAsRGBA`       | Decode pixels into RGBA vs. RGB.                                                                                                                                                                  | `true`      |
| `tolerantDecoding`   | Be more tolerant when encountering technically invalid JPEGs.                                                                                                                                     | `true`      |
| `maxResolutionInMP`  | The maximum resolution image that `jpeg` should attempt to decode in megapixels. Images larger than this resolution will throw an error instead of decoding.                                   | `100`       |
| `maxMemoryUsageInMB` | The (approximate) maximum memory that `jpeg` should allocate while attempting to decode the image in mebibyte. Images requiring more memory than this will throw an error instead of decoding. | `512`       |