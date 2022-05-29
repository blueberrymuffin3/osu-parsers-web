import { IBeatmap } from 'osu-classes';

import {
  GeneralEncoder,
  EditorEncoder,
  MetadataEncoder,
  DifficultyEncoder,
  EventsEncoder,
  TimingPointEncoder,
  ColourEncoder,
  HitObjectEncoder,
} from './Handlers';

/**
 * Beatmap encoder.
 */
export class BeatmapEncoder {
  /**
   * First playable lazer version.
   */
  static readonly FIRST_LAZER_VERSION = 128;

  /**
   * Performs beatmap encoding to a string.
   * @param beatmap Beatmap for encoding.
   * @returns A string with encoded beatmap data.
   */
  encodeToString(beatmap?: IBeatmap): string {
    if (!beatmap?.fileFormat) return '';

    const encoded: string[] = [];
    const fileFormat = beatmap.fileFormat ?? BeatmapEncoder.FIRST_LAZER_VERSION;

    encoded.push(`osu file format v${fileFormat}`);

    encoded.push(GeneralEncoder.encodeGeneralSection(beatmap));
    encoded.push(EditorEncoder.encodeEditorSection(beatmap));
    encoded.push(MetadataEncoder.encodeMetadataSection(beatmap));
    encoded.push(DifficultyEncoder.encodeDifficultySection(beatmap));
    encoded.push(EventsEncoder.encodeEventsSection(beatmap));
    encoded.push(TimingPointEncoder.encodeControlPoints(beatmap));
    encoded.push(ColourEncoder.encodeColours(beatmap));
    encoded.push(HitObjectEncoder.encodeHitObjects(beatmap));

    return encoded.filter((x) => x).join('\n\n');
  }
}
