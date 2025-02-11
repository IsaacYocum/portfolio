import { Download } from '@mui/icons-material';
import { IconButton, styled, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RESUME_PATH = "./resume.pdf";

const ResumeParent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
})

const DownloadResume = styled(Download)({
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
  fontSize: 40
})

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
    <ResumeParent>
      <Typography variant='h2'>My Resume</Typography>
      <Typography variant='h4'>Please take a copy&nbsp;
        <IconButton
          size="large"
          edge="start"
          aria-label="Download Resume"
          onClick={downloadResume}
        >
          <DownloadResume />
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
    </ResumeParent>
  )
}

export default Resume;
