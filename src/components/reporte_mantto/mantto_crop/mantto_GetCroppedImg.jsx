// Función para crear una imagen desde una URL
function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
  
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`No se pudo cargar la imagen desde la URL: ${url}`));
  
      image.setAttribute('crossOrigin', 'anonymous'); // Evita problemas de cross-origin
      image.src = url;
    });
  }
  
  // Función para obtener la imagen recortada
  export const mantto_getCroppedImg = async (imageSrc, pixelCrop) => {
    try {
      const image = await createImage(imageSrc); // Carga la imagen
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
  
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
  
      // Retorna la imagen recortada como un Blob
      return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
          if (!file) {
            reject(new Error('Error al generar el Blob de la imagen recortada.'));
            return;
          }
          resolve(URL.createObjectURL(file));
        }, 'image/jpeg');
      });
    } catch (error) {
      console.error('Error en getCroppedImg:', error);
      throw error; // Re-lanza el error para que pueda ser manejado donde se llame la función
    }
  };
  