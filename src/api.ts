import { createTheme } from '@mui/material/styles';
import axios, { Axios, AxiosError } from 'axios';
import { TodoWithId, ErrorResponse } from './types';

const client = axios.create({
  baseURL: 'http://localhost:5000/api/v1/todos',
});

// interface Todo {
//   _id?: string;
//   content: string;
//   done: boolean;
// }

export type APIError = AxiosError<ErrorResponse>;

export async function findAll() {
  const { data } = await client.get<TodoWithId[]>('/');
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return data;
}

export async function createOne() {
  return '';
}
