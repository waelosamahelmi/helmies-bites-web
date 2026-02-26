const API_BASE = '/api';

export const api = {
  async post<T = any>(url: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  },

  async get<T = any>(url: string): Promise<T> {
    const response = await fetch(`${API_BASE}${url}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  },
};
