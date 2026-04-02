export const API_URL = 'https://lssuzerowunqkvlbmquo.supabase.co/functions/v1/api';

export interface Profile {
  id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at?: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  profiles: Profile;
}

export interface Story {
  id: string;
  user_id: string;
  image_url?: string;
  content?: string;
  created_at: string;
  profiles: Profile;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
}

export interface Message {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: Profile;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  created_by: string;
}

async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    // Determine the base path based on endpoint
    // The Deno function logic usually handles paths like /posts, /profiles, etc.
    const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      return { data: null, error: errorData.message || `Error ${response.status}: ${response.statusText}` };
    }

    const result = await response.json();
    return { data: result.data || result, error: null };
  } catch (err: any) {
    console.error('API Client Error:', err);
    return { data: null, error: err.message || 'An unexpected error occurred' };
  }
}

// Posts API
export const api = {
  posts: {
    getAll: () => apiClient<Post[]>('/posts'),
    getById: (id: string) => apiClient<Post>(`/posts?id=${id}`),
    create: (data: Partial<Post>) => apiClient<Post>('/posts', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Post>) => apiClient<Post>(`/posts?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiClient<void>(`/posts?id=${id}`, { method: 'DELETE' }),
  },
  profiles: {
    getAll: () => apiClient<Profile[]>('/profiles'),
    getById: (id: string) => apiClient<Profile>(`/profiles?id=${id}`),
    update: (id: string, data: Partial<Profile>) => apiClient<Profile>(`/profiles?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  stories: {
    getAll: () => apiClient<Story[]>('/stories'),
    create: (data: Partial<Story>) => apiClient<Story>('/stories', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => apiClient<void>(`/stories?id=${id}`, { method: 'DELETE' }),
  },
  rooms: {
    getAll: () => apiClient<Room[]>('/rooms'),
    getById: (id: string) => apiClient<Room>(`/rooms?id=${id}`),
    create: (data: Partial<Room>) => apiClient<Room>('/rooms', { method: 'POST', body: JSON.stringify(data) }),
  },
  messages: {
    getByRoom: (roomId: string) => apiClient<Message[]>(`/messages?room_id=${roomId}`),
    send: (data: Partial<Message>) => apiClient<Message>('/messages', { method: 'POST', body: JSON.stringify(data) }),
  },
  events: {
    getAll: () => apiClient<Event[]>('/events'),
    create: (data: Partial<Event>) => apiClient<Event>('/events', { method: 'POST', body: JSON.stringify(data) }),
  }
};