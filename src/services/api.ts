import axios, { AxiosError } from 'axios';
import { UsersResponse, ApiError } from '../types/api';

const API_BASE_URL = 'https://reqres.in/api';

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    throw new ApiError(
      axiosError.response?.data?.message || 'An error occurred',
      axiosError.response?.status,
      axiosError.code,
    );
  }
  throw new ApiError('An unexpected error occurred');
};

export const fetchUsers = async (page: number): Promise<UsersResponse> => {
  try {
    const response = await axios.get<UsersResponse>(`${API_BASE_URL}/users`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
