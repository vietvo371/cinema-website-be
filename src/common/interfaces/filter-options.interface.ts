export interface FilterOptions {
  search?: string;
  genre?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  theaterId?: number;
  roomId?: number;
  movieId?: number;
  userId?: number;
} 