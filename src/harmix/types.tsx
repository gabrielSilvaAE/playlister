export interface SearchResponse {
  search_id: string;
  tracks_number: number;
  tracks: Track[];
}

export interface Track {
  system_id: string;
  score: number;
  metadata: TrackMetadata;
  highlights: any;
}

export interface TrackMetadata {
  source_id: string;
  isrc: string;
  track_title: string;
  version_tag: string;
  album_name: string;
  release_year: number;
  release_date: string;
  duration: number;
  bpm: number;
  key: string | null;
  is_instrumental: boolean;
  is_vocal: boolean | null;
  lyrics: string | null;
  explicit_lyrics: boolean | null;
  artists: string[];
  available_countries: string[] | null;
  track_number: string;
  track_code: string | null;
  track_description: string | null;
  version: string | null;
  version_name: string | null;
  versions_number: number | null;
  master_id: string | null;
  label_name: string | null;
  label_code: string | null;
  album_number: string | null;
  album_code: string | null;
  album_description: string | null;
  album_keywords: string | null;
  album_id: string | null;
  album_cover_url: string | null;
  tempo: number | null;
  time_signature: number | null;
  lyrics_language: string | null;
  composers: string[] | null;
  genres: string[];
  moods: string[];
  instruments: string[];
  music_keywords: string | null;
  decades: string[] | null;
  vocals: string[] | null;
  active: boolean | null;
  licensable: boolean | null;
  restricted: boolean | null;
  commercial: boolean | null;
  recognisable: boolean | null;
  sync_history: string[] | null;
  jam_sync: string | null;
  hit: boolean | null;
  top: boolean | null;
  publishers: string[] | null;
  owner: string | null;
  share: string | null;
  external_id: string | null;
  platforms: string[] | null;
  popularity: number | null;
  external_streams: number | null;
  rights_controller_name: string | null;
  audio_url: string | null;
  waveform_url: string | null;
  extra_parameters: any;
  harmix_story: string | null;
  harmix_processing_status: number;
  harmix_audio_url: string | null;
  harmix_audio_duration: number;
  harmix_external_urls: string[] | null;
  harmix_available_on: string[];
  harmix_available_markets: string[];
  harmix_vocal_detection_status: string | null;
  harmix_s3_peaks_location: string | null;
  harmix_attribution: string | null;
  harmix_source: string | null;
}
