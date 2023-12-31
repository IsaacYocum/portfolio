import './Resume.css'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

let Resume = () => {
  return (
    <div id="resume">
      <Document
        className='pdf'
        file={'./resume.pdf'}
      >
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
