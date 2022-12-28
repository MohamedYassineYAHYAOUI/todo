import { createTheme } from '@mui/material/styles';
import axios from 'axios';

// eslint-disable-next-line import/no-relative-packages
import type { TodoWithId } from '../../express-api/src/api/todos/todos.model';

const client = axios.create({
  baseURL: 'http://localhost:5000/api/v1/todos',
});

interface Todo {
  _id?: string;
  content: string;
  done: boolean;
}

export async function findAll() {
  const { data } = await client.get<TodoWithId[]>('/');
  return data;
}

export async function createOne() {
  return '';
}
