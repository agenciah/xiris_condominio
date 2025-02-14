import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Slider, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { mantto_getCroppedImg } from './mantto_GetCroppedImg';

function Mantto_ImageCropDialog({ imageSrc, onCropComplete, onClose, cropContainerStyle }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    const croppedImage = await mantto_getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent>
        <div style={{ 
          position: 'relative', 
          width: cropContainerStyle?.width || '100%', 
          height: cropContainerStyle?.height || 400 
        }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9} // Puedes cambiar a 1 para cuadrado
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteCallback}
          />
        </div>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, zoom) => onZoomChange(zoom)}
          aria-labelledby="Zoom"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleCrop} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Agregar validación de props
Mantto_ImageCropDialog.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  cropContainerStyle: PropTypes.object, // Hacer que esta prop sea opcional
};

export default Mantto_ImageCropDialog;

