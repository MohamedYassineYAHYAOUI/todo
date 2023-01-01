import { APIError, createNewTodo } from '@/api';
import LoadingButton from '@mui/lab/LoadingButton';
import { Todo, TodoWithId } from '@/types';
import { Alert, Button, Grid, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

function TodoForm() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState('');
  const { isLoading, mutateAsync, isError, error } = useMutation<
    TodoWithId,
    APIError,
    Todo
  >((todoToCreate) => createNewTodo(todoToCreate), {
    onSuccess() {
      queryClient.invalidateQueries(['findAll']);
    },
  });

  const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    await mutateAsync({
      content: newTodo,
      done: false,
    });
    setNewTodo('');
  };

  return (
    <Grid sx={{ margin: '1rem' }}>
      {isError && (
        <Alert severity="error">
          {error.response?.data.message || error.message}
        </Alert>
      )}
      <form onSubmit={formSubmitted}>
        <TextField
          fullWidth
          id="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.currentTarget.value)}
          label="New Todo"
          variant="outlined"
          disabled={isLoading}
        />
        <Grid container marginTop="1rem" justifyContent="flex-end">
          <LoadingButton type="submit" loading={isLoading} variant="contained">
            ADD TODO
          </LoadingButton>
        </Grid>
      </form>
    </Grid>
  );
}

export default TodoForm;
