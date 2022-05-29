# osu-parsers-web
[![CodeFactor](https://img.shields.io/codefactor/grade/github/blueberrymuffin3/osu-parsers)](https://www.codefactor.io/repository/github/blueberrymuffin3/osu-parsers)
[![License](https://img.shields.io/github/license/blueberrymuffin3/osu-parsers)](https://github.com/blueberrymuffin3/osu-parsers/blob/master/LICENSE)
[![Package](https://img.shields.io/npm/v/osu-parsers-web)](https://www.npmjs.com/package/osu-parsers-web)


A bundle of parsers for osu! file formats based on the osu!lazer source code.

- Written in TypeScript.
- Based on the osu!lazer source code.
- Can be used for parsing beatmaps from any osu! game modes.
- Supports beatmap conversion between different game modes.

## Installation

Add a new dependency to your project via npm:

```bash
npm install osu-parsers-web
```

## Beatmap decoding

Beatmap decoder is used to read .osu files and convert them to the plain Beatmap objects.
This decoder is fully synchronous and there is no support for async version right now.
Note that beatmap decoder will return only parsed beatmap without max combo or mods!

There are 3 ways to read data using this decoders:
- via file path
- via string
- via array of split lines

By default, beatmap decoder will decode both beatmap and storyboard. If you want to decode beatmap without storyboard, you can pass false as the second parameter to any of the methods.

### Example of beatmap decoding

```js
import { BeatmapDecoder } from 'osu-parsers'

const path = 'path/to/your/file.osu';

// This is optional and true by default.
const shouldParseSb = true;

const decoder = new BeatmapDecoder();
const beatmap = decoder.decodeFromPath(path, shouldParseSb);

console.log(beatmap) // Beatmap object.
```

## Storyboard decoding

Storyboard decoder is used to read .osb files and convert them to the Storyboard objects.
This decoder is also fully synchronous with no async support at all.

As in beatmap decoder, there are 3 ways to decode your .osb files:
- via file path
- via string
- via array of split lines

### Example of storyboard decoding

```js
import { StoryboardDecoder } from 'osu-parsers'

const path = 'path/to/your/file.osb';

const decoder = new StoryboardDecoder();
const storyboard = decoder.decodeFromPath(path);

console.log(storyboard); // Storyboard object.
```

## Score & replay decoding

Score decoder is used to decode .osr files and convert them to the Score objects.
Score object contains score information and replay data.
This decoder is based on external lzma library and works asynchronously.

There are 2 ways to read data through this decoder:
- via string
- via buffer

By default, score decoder will decode both score information and replay. If you want to decode score information without replay, you can pass false as the second parameter to any of the methods.

### Example of score & replay decoding

```js
import { ScoreDecoder } from 'osu-parsers'

const path = 'path/to/your/file.osr';

// This is optional and true by default.
const parseReplay = true;

const decoder = new ScoreDecoder();

decoder.decodeFromPath(path, parseReplay)
  .then((score) => {
    console.log(score.info); // ScoreInfo object.
    console.log(score.replay); // Replay object or null.
  });
```

## Encoding

All objects parsed by these decoders can easily be stringified and written to the files.
Note that encoders will write object data without any changes. For example, if you try to encode beatmap with applied mods, it will write modded values!

When encoding is complete you can import resulting files to the game.

### Example of beatmap encoding

```js
import { BeatmapDecoder, BeatmapEncoder } from 'osu-parsers'

const decodePath = 'path/to/your/decoding/file.osu';
const shouldParseSb = true;

const decoder = new BeatmapDecoder();
const encoder = new BeatmapEncoder();

const beatmap = decoder.decodeFromPath(decodePath, shouldParseSb);

// Do your stuff with beatmap...

const encodePath = 'path/to/your/encoding/file.osu';

// Write IBeatmap object to an .osu file.
encoder.encodeToPath(encodePath, beatmap);

// Also you can encode IBeatmap object to a string.
const stringified = encoder.encodeToString(storyboard);
```

### Example of storyboard encoding

```js
import { StoryboardDecoder, StoryboardEncoder } from 'osu-parsers'

const decodePath = 'path/to/your/decoding/file.osb';

const decoder = new StoryboardDecoder();
const encoder = new StoryboardEncoder();

const storyboard = decoder.decodeFromPath(decodePath);

// Do your stuff with storyboard...

const encodePath = 'path/to/your/encoding/file.osb';

// Write Storyboard object to an .osb file.
encoder.encodeToPath(encodePath, storyboard);

// Also you can encode Storyboard object to a string.
const stringified = encoder.encodeToString(storyboard);
```

### Example of score & replay encoding

```js
import { ScoreDecoder, ScoreEncoder } from 'osu-parsers'

const decodePath = 'path/to/your/decoding/file.osr';

const decoder = new StoryboardDecoder();
const encoder = new StoryboardEncoder();

const score = decoder.decodeFromPath(decodePath);

// Do your stuff with score info and replay...

const encodePath = 'path/to/your/encoding/file.osr';

// Write IScore object to an .osr file.
encoder.encodeToPath(encodePath, score)
  .then(() => {
    // Do something after .osr encoding...
  }); 

// Also you can encode IScore object to a buffer.
encoder.encodeToBuffer(score)
  .then((buffer) => {
    // Do something with .osr file buffer...
  });
```

## Rulesets

This library by itself doesn't provide any tools for difficulty and performance calculation!!!!
If you are looking for something related to this, then rulesets may come in handy for you.
Rulesets are separate libraries based on the classes from the [osu-classes](https://github.com/kionell/osu-classes.git) project. They allow you to work with gamemode specific stuff as difficulty, performance, mods and max combo calculation. Because of the shared logic between all of the rulesets they are compatible between each other. If you want, you can even write your own custom ruleset!
The great thing about all this stuff is a beatmap conversion. Any beatmap can be used with any ruleset library as long as they implement the same interfaces.

There are 4 basic rulesets that support parsed beatmaps from this decoder:

- [osu-standard-stable](https://github.com/kionell/osu-standard-stable.git) - The osu!std ruleset based on the osu!lazer source code.
- [osu-taiko-stable](https://github.com/kionell/osu-taiko-stable.git) - The osu!taiko ruleset based on the osu!lazer source code.
- [osu-catch-stable](https://github.com/kionell/osu-catch-stable.git) - The osu!catch ruleset based on the osu!lazer source code.
- [osu-mania-stable](https://github.com/kionell/osu-mania-stable.git) - The osu!mania ruleset based on the osu!lazer source code.

## Documentation

Auto-generated documentation is available [here](https://kionell.github.io/osu-parsers/).

## Contributing

This project is being developed personally by me on pure enthusiasm. If you want to help with development or fix a problem, then feel free to create a new pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) for details.
