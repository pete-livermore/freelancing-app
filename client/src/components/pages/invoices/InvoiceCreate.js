import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import PDF from './PDF'

export default function InvoiceGenerator() {

  const jobDetails = JSON.parse(localStorage.getItem('jobDetails'))

  return (
    <>
      {jobDetails &&
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
          <PDF jobDetails={jobDetails} />
        </PDFViewer>
      }
    </>
  )

}