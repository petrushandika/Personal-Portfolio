const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    statusCode: number;
    message: string;
  };
}

export interface RequestOptions extends RequestInit {
  token?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    if (token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    });

    const result: ApiResponse<T> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error?.message || 'Request failed');
    }

    return result.data;
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const opts: RequestOptions = { method: 'GET' };
    if (token) opts.token = token;
    return this.request<T>(endpoint, opts);
  }

  async post<T>(endpoint: string, data?: unknown, token?: string): Promise<T> {
    const opts: RequestOptions = { method: 'POST', body: JSON.stringify(data) };
    if (token) opts.token = token;
    return this.request<T>(endpoint, opts);
  }

  async put<T>(endpoint: string, data?: unknown, token?: string): Promise<T> {
    const opts: RequestOptions = { method: 'PUT', body: JSON.stringify(data) };
    if (token) opts.token = token;
    return this.request<T>(endpoint, opts);
  }

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    const opts: RequestOptions = { method: 'DELETE' };
    if (token) opts.token = token;
    return this.request<T>(endpoint, opts);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
