import { Todo, TodoWithId } from '@/types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface TodoItemProps {
  todo: TodoWithId;
  children: React.ReactNode;
}

function TodoItem({ todo, children }: TodoItemProps) {
  return (
    <Card
      // eslint-disable-next-line no-underscore-dangle
      key={todo._id.toString()}
      sx={{ minWidth: 275, margin: '0.5rem' }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {todo.done && 'DONE:'} {todo.content}
        </Typography>
      </CardContent>
      <CardActions>{children}</CardActions>
    </Card>
  );
}

export default TodoItem;
