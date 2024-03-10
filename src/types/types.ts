export type OptionsType = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Object;
  headers?: Object;
};

export type ErrorType = {
  status?: number;
  message: string;
};

export type AxiosApiResponse = {};
