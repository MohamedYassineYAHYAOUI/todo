import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { findAll } from '../api';

function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['findAll'],
    queryFn: findAll,
  });

  console.log(data);
  return <>test</>;
}

export default Home;
