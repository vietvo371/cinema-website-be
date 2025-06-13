
export class Movie {
  id: bigint;
  title: string;
  director?: string;
  duration?: number;
  releaseDate?: Date;
  posterUrl?: string;
  createdAt: Date;
  updatedAt: Date;
} 