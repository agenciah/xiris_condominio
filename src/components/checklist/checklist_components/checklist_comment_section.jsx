import PropTypes from 'prop-types';
import { TextField, Box, Typography } from '@mui/material';

function ChecklistCommentsSection({ comments, handleComentariosChange }) {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6">Comentarios</Typography>
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

// Validación de props
ChecklistCommentsSection.propTypes = {
  comments: PropTypes.string.isRequired, // Asegura que sea un string obligatorio
  handleComentariosChange: PropTypes.func.isRequired, // Debe ser una función obligatoria
};

export default ChecklistCommentsSection;
