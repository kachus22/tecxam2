// The default response that all API calls will receive
export interface ServerResponse {
    data: any;
    success: boolean;
    error: string[];
    message: string;
}

export interface CoursesResponse {
  acronym?: string;
  name?: string;
  description?: string,
  created_at?: any;
  [key: string]: any; // optional
}
