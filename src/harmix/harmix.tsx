import type { SearchResponse } from './types';

const API_URL = 'https://api.harmix.ai/';

export const promptTrack = async function(prompt: string, genres: string[] = [], moods: string[] = [], instruments: string[] = [], limit: number = 20, offset: number = 0): Promise<SearchResponse> {
  const urlParams = new URLSearchParams();
  urlParams.set('limit', limit.toString());
  urlParams.set('offset', offset.toString());
  console.log(genres, moods, instruments);
  // const filters = {}

  const payload = {
    "prompt": prompt,
    "catalogs": ["DIGITAL_STREAMING", "JAMENDO"],
    "filters": {
      "logic": "and", 
      "conditions": [
        // {
        //   "field": "duration",
        //   "operator": "gte",
        //   "value": 60
        // },
        // {
        //   "field": "bpm",
        //   "operator": "gte", 
        //   "value": 119
        // },
        // {
        //   "field": "bpm",
        //   "operator": "lte",
        //   "value": 147
        // },
        // {
        //   "field": "release_year",
        //   "operator": "gte",
        //   "value": 2000
        // },
        // {
        //   "field": "release_year", 
        //   "operator": "lte",
        //   "value": 2025
        // },
        ...(genres.length > 0 ? [{
          "logic": "or",
          "field": "genres",
          "operator": "in",
          "value": genres
        }] : []),
        ...(moods.length > 0 ? [{
          "logic": "or",
          "field": "moods",
          "operator": "in", 
          "value": moods
        }] : []),
        ...(instruments.length > 0 ? [{
          "logic": "or",
          "field": "instruments",
          "operator": "in",
          "value": instruments
        }] : []),
      ]
    }
  };
  try {
    const response = await fetch(`${API_URL}/search?${urlParams.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': import.meta.env.VITE_HARMIX_API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
}

export const uploadReferenceTrack = async (file: File, sessionId: string): Promise<{
  upload_id: string;
  uploaded_at: string;
  status: string;
  waveform_url: string | null;
}> => {
  const formData = new FormData();
  formData.append('source', file);

  try {
    const response = await fetch(`${API_URL}/upload?session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        'api_key': import.meta.env.VITE_HARMIX_API_KEY,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading reference track:', error);
    throw error;
  }
}
