import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { APIError, deleteOne, findOne, updateOne } from '@/api';
import { TodoWithId, Todo } from '@/types';
import Link from '@mui/material/Link';
import {
  Alert,
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';
import TodoItem from '@/components/todos/TodoItem';

interface TodoPageProps extends Record<string, string | undefined> {
  id: string;
}

function TodoPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams<TodoPageProps>();
  const { isLoading, isFetching, isError, data, error } = useQuery<
    TodoWithId,
    APIError
  >({
    queryKey: ['findOne', params.id],
    queryFn: () => findOne(params.id || 'not-found'),
  });
  const mutation = useMutation<Todo, APIError, TodoWithId>(
    (todoWithId: TodoWithId) => {
      // eslint-disable-next-line no-underscore-dangle
      return updateOne(todoWithId._id.toString(), {
        content: data?.content || 'not-defined',
        done: !data?.done,
      });
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['findOne', params.id]);
        queryClient.invalidateQueries(['findAll']);
      },
    }
  );

  const deleteMutation = useMutation<Todo, APIError, TodoWithId>(
    (todoWithId: TodoWithId) => {
      // eslint-disable-next-line no-underscore-dangle
      return deleteOne(todoWithId._id.toString());
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['findAll']);
        navigate('/');
      },
    }
  );

  return (
    <Grid
      sx={{ marginTop: '2rem' }}
      container
      flexDirection="column"
      justifyContent="center"
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href={`/todo/${params.id}`}
          aria-current="page"
        >
          todo
        </Link>
      </Breadcrumbs>
      {isError && (
        <Alert severity="error">
          {error.response?.data.message || error.message}
        </Alert>
      )}

      {(isLoading || isFetching || mutation.isLoading) && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      {!(isLoading || isFetching) && data && (
        <TodoItem todo={data}>
          <Grid container justifyContent="space-between">
            <Button onClick={() => mutation.mutate(data)} size="medium">
              Toggle done
            </Button>
            <Button onClick={() => deleteMutation.mutate(data)} size="medium">
              Remove todo
            </Button>
          </Grid>
        </TodoItem>
      )}
    </Grid>
  );
}

export default TodoPage;
