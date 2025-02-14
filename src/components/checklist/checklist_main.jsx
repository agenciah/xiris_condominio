import ChecklistForm from './checklist_components/checklist_form';
import { Container, AppBar, CssBaseline } from '@mui/material';

function Checklist_Main() {
  return (
    <div style={{ backgroundColor: 'rgb(38, 169, 225)', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'rgb(1, 98, 153)' }}>
      </AppBar>
      <Container>
        <Container maxWidth="md">
          <CssBaseline />
          <ChecklistForm />
        </Container>
      </Container>
    </div>
  );
}

export default Checklist_Main;
