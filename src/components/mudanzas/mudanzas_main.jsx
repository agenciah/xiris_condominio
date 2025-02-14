import Mudanzas_form from './mudanzas_form';
import { Container, Typography } from '@mui/material';

function Mudanzas_main() {
  return (
    <Container className="App">
      <header className="App-header">
        <Typography variant="h3" component="h1" style={{ color: '#262161' }}>
          Formulario de Mudanza
        </Typography>
      </header>
      <Mudanzas_form />
    </Container>
  );
}

export default Mudanzas_main;