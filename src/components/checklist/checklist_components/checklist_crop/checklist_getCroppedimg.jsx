// Función para crear una imagen desde una URL
function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous'; // Evita problemas de CORS
      image.onload = () => resolve(image);
      image.onerror = (error) => {
        console.error("Error al cargar la imagen:", error);
        reject(new Error("No se pudo cargar la imagen."));
      };
      image.src = url;
    });
  }
  
  // Función para obtener la imagen recortada
  export const checklistGetCroppedImg = async (imageSrc, pixelCrop) => {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      if (!ctx) {
        throw new Error("No se pudo obtener el contexto del canvas.");
      }
  
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
            console.error("Error al convertir canvas a Blob.");
            reject(new Error("No se pudo generar la imagen recortada."));
            return;
          }
          resolve(URL.createObjectURL(file));
        }, 'image/jpeg');
      });
    } catch (error) {
      console.error("Error en getCroppedImg:", error);
      throw error;
    }
  };
  