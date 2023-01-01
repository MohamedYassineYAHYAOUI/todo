import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Grid } from '@mui/material';
import { findAll, APIError } from '@/api';
import { TodoWithId } from '@/types';
import TodoForm from '@/components/todos/TodoForm';
import { Link } from 'react-router-dom';
import TodoItem from '@/components/todos/TodoItem';

function Home() {
  const { data, isLoading, isFetching, isError, error } = useQuery<
    TodoWithId[],
    APIError
  >({
    queryKey: ['findAll'],
    queryFn: findAll,
    select: (todos) => todos?.slice().reverse(),
  });

  return (
    <Grid
      sx={{ marginTop: '2rem' }}
      container
      flexDirection="column"
      justifyContent="center"
    >
      {isError && (
        <Alert severity="error">
          {error.response?.data.message || error.message}
        </Alert>
      )}

      <TodoForm />

      {(isLoading || isFetching) && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      {!(isLoading || isFetching) &&
        data?.map((todo) => (
          // eslint-disable-next-line no-underscore-dangle
          <TodoItem key={todo._id.toString()} todo={todo}>
            <Grid container justifyContent="flex-end">
              <Button
                component={Link}
                // eslint-disable-next-line no-underscore-dangle
                to={`todo/${todo._id.toString()}`}
                size="medium"
              >
                Edit
              </Button>
            </Grid>
          </TodoItem>
        ))}
    </Grid>
  );
}

export default Home;
