import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { findAll, APIError } from '../api';
import { TodoWithId } from '../types';

function Home() {
  const { data, isLoading, isError, error } = useQuery<TodoWithId[], APIError>({
    queryKey: ['findAll'],
    queryFn: findAll,
  });

  return (
    <Grid sx={{ marginTop: '2rem' }} container justifyContent="center">
      {isLoading && <CircularProgress />}
      {isError && (
        <Alert severity="error">
          {error.response?.data.message || error.message}
        </Alert>
      )}
      {data?.map((todo) => (
        <Card
          // eslint-disable-next-line no-underscore-dangle
          key={todo._id.toString()}
          sx={{ minWidth: 275, flexGrow: 1 }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {todo.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium">Edit</Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}

export default Home;
