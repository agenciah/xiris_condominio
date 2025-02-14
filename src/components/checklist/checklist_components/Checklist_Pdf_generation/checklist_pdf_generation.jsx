import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import { checklist_pdfStyles } from './checklist_pdf_styles';
// import background from "../images/Diapositiva2.JPG";
import { Button } from '@mui/material';

function Checklist_PDFGeneration({ checklistData, images }) {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // if (background) {
    //   doc.addImage(
    //     background,
    //     'JPEG',
    //     0,
    //     0,
    //     doc.internal.pageSize.getWidth(),
    //     doc.internal.pageSize.getHeight()
    //   );
    // } else {
    //   console.error("La imagen de fondo no se ha podido cargar.");
    // }

    doc.setFontSize(checklist_pdfStyles.title.fontSize || 16);
    doc.setFont(checklist_pdfStyles.title.fontStyle || 'normal');
    doc.setTextColor(checklist_pdfStyles.title.color || '#000000');
    doc.text(
        checklist_pdfStyles.title.text || 'Checklist de Supervisión',
        checklist_pdfStyles.title.x || 10,
        checklist_pdfStyles.title.y || 10
    );

    let currentY = (checklist_pdfStyles.title.y || 20) + 10;

    ['entrada', 'alberca', 'gimnasio', 'jardineria'].forEach((area) => {
      const areaData = checklistData?.[area] || {};
      const areaTitle = checklist_pdfStyles.sectionTitles[area]?.text || area.charAt(0).toUpperCase() + area.slice(1);

      doc.setFontSize(checklist_pdfStyles.sectionTitles[area]?.fontSize || 14);
      doc.setFont(checklist_pdfStyles.sectionTitles[area]?.fontStyle || 'bold');
      doc.setTextColor(checklist_pdfStyles.sectionTitles[area]?.color || '#000000');

      doc.text(
        areaTitle,
        checklist_pdfStyles.sectionTitles[area]?.x || 10,
        currentY
      );

      currentY += 8;

      doc.setFontSize(checklist_pdfStyles.content.fontSize || 12);
      doc.setFont(checklist_pdfStyles.content.fontStyle || 'normal');
      doc.setTextColor(checklist_pdfStyles.content.color || '#000000');

      Object.entries(areaData).forEach(([key, value]) => {
        const displayText = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value || 'No especificado'}`;
        doc.text(
          displayText,
          checklist_pdfStyles.content.x || 20,
          currentY
        );
        currentY += 6;
      });

      currentY += 10;
    });

    if (checklistData?.comentarios) {
      doc.setFontSize(checklist_pdfStyles.comments.fontSize || 12);
      doc.setFont(checklist_pdfStyles.comments.fontStyle || 'normal');
      doc.setTextColor(checklist_pdfStyles.comments.color || '#000000');

      doc.text(
        checklist_pdfStyles.comments.title || 'Comentarios:',
        checklist_pdfStyles.comments.x || 10,
        currentY
      );

      currentY += 6;

      doc.text(
        checklistData.comentarios,
        checklist_pdfStyles.comments.x || 20,
        currentY,
        {
          maxWidth: doc.internal.pageSize.getWidth() - (checklist_pdfStyles.comments.x || 20) * 2,
        }
      );
    }

    if (Array.isArray(images) && images.length > 0) {
      images.forEach((image, index) => {
        if (image && checklist_pdfStyles.images[index]) {
          const { x, y, width, height } = checklist_pdfStyles.images[index];
          doc.addImage(image, 'JPEG', x, y, width, height);
        }
      });
    }

    doc.save('Checklist.pdf');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#FF0000',
          '&:hover': {
            backgroundColor: '#D00000',
          },
        }}
        onClick={handleGeneratePDF}
      >
        Descargar PDF
      </Button>
    </div>
  );
}

// Validación de PropTypes
Checklist_PDFGeneration.propTypes = {
  checklistData: PropTypes.object.isRequired, // Debe ser un objeto y es obligatorio
  images: PropTypes.arrayOf(PropTypes.string), // Debe ser un array de strings (base64 o URLs)
};

export default Checklist_PDFGeneration;
