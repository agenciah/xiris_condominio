import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select, Grid, Box } from '@mui/material';

function ChecklistSection({ title, fields, area, checklistData, handleInputChange }) {
  const labelMap = {
    porton: 'Portón',
    caseta: 'Caseta',
    cctv: 'CCTV',
    baño: 'Baño',
    puertaPeatonal: 'Puerta Peatonal',
    terraza: 'Terraza',
    mobiliario: 'Mobiliario',
    tarja: 'Tarja',
    cuartoDeMaquinas: 'Cuarto de Máquinas',
    bicicletas: 'Bicicletas',
    caminadoras: 'Trotadoras', // Cambiado a algo más corto
    estadoGeneral: 'Edo. General', // Cambiado a algo más corto
    areasComunes: 'Áreas Comunes',
    exteriores: 'Exteriores',
    areaPrincipal: 'Área Principal'
  };

  return (
    <Box sx={{ marginBottom: 3, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <h3>{title}</h3>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} md={4} key={field}>
            <FormControl fullWidth variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{labelMap[field]}</InputLabel>
              <Select
                value={checklistData[area]?.[field] || ""}
                onChange={(e) => handleInputChange(e, area, field)}
                label={labelMap[field]}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Bueno">Bueno</MenuItem>
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Malo">Malo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Validación de PropTypes
ChecklistSection.propTypes = {
  title: PropTypes.string.isRequired, // Título del checklist
  fields: PropTypes.arrayOf(PropTypes.string).isRequired, // Lista de campos (debe ser un array de strings)
  area: PropTypes.string.isRequired, // El área debe ser un string obligatorio
  checklistData: PropTypes.object.isRequired, // checklistData debe ser un objeto
  handleInputChange: PropTypes.func.isRequired, // Función obligatoria
};

export default ChecklistSection;
