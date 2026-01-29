import api from '../lib/axios';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types/auth';

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.data.data?.token) {
      this.setAuth(response.data.data.token, response.data.data.user);
    }
    return response.data;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.data.data?.token) {
      this.setAuth(response.data.data.token, response.data.data.user);
    }
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<{ success: boolean; data: User }>('/auth/profile');
    return response.data.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  setAuth(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
