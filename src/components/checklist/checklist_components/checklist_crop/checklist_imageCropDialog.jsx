import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Slider, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { checklistGetCroppedImg } from './checklist_getCroppedimg';

function ChecklistImageCropDialog({ imageSrc, onCropComplete, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onZoomChange = (event, newZoom) => {
    setZoom(newZoom);
  };

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedImage = await checklistGetCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <Dialog open={Boolean(imageSrc)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <div style={{ position: 'relative', width: '100%', height: 400 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1} // Relación de aspecto cuadrada (4:4 -> 1:1)
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
          onChange={onZoomChange}
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

// Validación de PropTypes
ChecklistImageCropDialog.propTypes = {
  imageSrc: PropTypes.string, // La imagen debe ser una URL o base64
  onCropComplete: PropTypes.func.isRequired, // Debe ser una función obligatoria
  onClose: PropTypes.func.isRequired, // Debe ser una función obligatoria
};

export default ChecklistImageCropDialog;
