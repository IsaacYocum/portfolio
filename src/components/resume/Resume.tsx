import { IconButton, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Download } from '@mui/icons-material';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RESUME_PATH = "./resume.pdf";

const styles = {
  resume: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    gap: '10px'
  },
  pdf: {
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
  }
}

const Resume = () => {
  const downloadResume = () => {
    const pdfUrl = RESUME_PATH;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Isaac Yocum Resume.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div style={styles.resume}>
      <Typography variant='h4'>My Resume: Please take a copy&nbsp;&nbsp;
        <IconButton
          size="large"
          edge="start"
          aria-label="Download Resume"
          onClick={() => { }}
        >
          <Download onClick={downloadResume} sx={{ ...styles.pdf, fontSize: 35 }} />
      </IconButton>
      </Typography>
      <Document className='pdf' file={RESUME_PATH}>
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={800}
        />
      </Document>
    </div>
  )
}

export default Resume;
