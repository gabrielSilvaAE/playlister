import type { SearchResponse } from './types';

const API_URL = 'https://api.harmix.ai/';

export const promptTrack = async function(prompt: string, limit: number = 20, offset: number = 0): Promise<SearchResponse> {
  const urlParams = new URLSearchParams();
  urlParams.set('limit', limit.toString());
  urlParams.set('offset', offset.toString());

  const payload = {
    "prompt": prompt,
    "catalogs": ["DIGITAL_STREAMING"]
  }
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
