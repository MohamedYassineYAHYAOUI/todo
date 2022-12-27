import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>page not found</h1>
      <Link to="/">Home page</Link>
    </>
  );
}

export default NotFound;
