import PropTypes from 'prop-types';
import { TextField, Box, Typography } from '@mui/material';

function ManttoCommentsSection({ comments, handleComentariosChange }) {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6">Cuerpo del Mensaje</Typography>
      <TextField
        label="Comentarios"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={comments}
        onChange={handleComentariosChange}
        sx={{ mt: 1 }}
      />
    </Box>
  );
}

// Definir los tipos de props esperadas
ManttoCommentsSection.propTypes = {
  comments: PropTypes.string.isRequired, // comments debe ser un string obligatorio
  handleComentariosChange: PropTypes.func.isRequired, // Debe ser una función obligatoria
};

export default ManttoCommentsSection;
