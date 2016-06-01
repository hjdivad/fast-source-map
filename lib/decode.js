import IntBufferReader from './int-buffer-reader';
import Decoder from './decoder';
import MappingsDecoder from './mappings-decoder';
import toBuffer from './utils/to-buffer';

const fs = require('fs');

export function decode(map) {
  var buffer = toBuffer(map.mappings);
  var reader = new IntBufferReader(buffer, 0, buffer.length);
  var decoder = new Decoder();
  var mappingsDecoder = new MappingsDecoder(decoder);

  mappingsDecoder.decode(reader);

  map.mappings = decoder.mappings;

  return map;
}

export function decodeFile(path) {
  return decode(JSON.parse(fs.readFileSync(path)));
}
