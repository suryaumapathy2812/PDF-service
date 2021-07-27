const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
import fs from 'fs';
import { Readable } from 'stream';
// import { Readable } from 'node:stream';

export default class PdfService {

    credentials() {
        return PDFServicesSdk.Credentials
            .serviceAccountCredentialsBuilder()
            .fromFile('pdfservices-api-credentials.json')
            .build();
    }

    /**
     * Create PDFs from a variety of formats, including static and dynamic HTML; Microsoft Word, PowerPoint, and Excel; as well as text, image, and, Zip
     * 
     * Supported file types are HTML, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, RTF, BMP, JPEG, GIF, TIFF, PNG
     * 
     * @param  {string} fileName
     */
    convertToPdf(fileName: string = "createPDF") {
        try {
            // Initial setup, create credentials instance.
            const credentials = this.credentials();

            // Create an ExecutionContext using credentials
            const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
            const createPdfOperation = PDFServicesSdk.CreatePDF.Operation.createNew();

            // Set operation input from a source file.
            const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/createPDFInput.docx');
            createPdfOperation.setInput(input);

            // Execute the operation and Save the result to the specified location.
            createPdfOperation.execute(executionContext)
                .then((result: any) => result.saveAsFile(`output/${fileName}.pdf`))
        } catch (err) {
            console.log(err);
            throw new Error("Failed to Convert into PDF")
        }
    }


    /**
     * This method merge JSON data with Microsoft Office DOCX template file (buffer) 
     * to output a PDF file
     * 
     * @param  {Buffer} buffer
     * @param  {JSON} data
     * @param  {string} fileName
     */
    mergeJsonToDocStream(buffer: Buffer, data: JSON, fileName: string) {
        try {

            // Initial setup, create credentials instance.
            const credentials = this.credentials();

            // Setup input data for the document merge process
            const jsonDataForMerge = data;

            // Create an ExecutionContext using credentials
            const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

            // Create a new DocumentMerge options instance
            const documentMerge = PDFServicesSdk.DocumentMerge;
            const documentMergeOptions = documentMerge.options;
            const options = new documentMergeOptions
                .DocumentMergeOptions(jsonDataForMerge, documentMergeOptions.OutputFormat.PDF);

            // Create a new operation instance using the options instance
            const documentMergeOperation = documentMerge.Operation.createNew(options);

            // Set operation input document template from a source file.
            const filePath = process.cwd() + "/output/" + fileName;

            if (fs.existsSync(filePath)) {
                console.log("File exists.")
                fs.unlinkSync(filePath);
            } else {
                console.log("File does not exist.")
            }

            // const input = PDFServicesSdk.FileRef
            //   .createFromLocalFile('src/templates/templates/ASSAY_Software Services Agreement_SMO.docx');
            const stream = this.bufferToStream(buffer)

            console.log("Buffer to Stream");
            console.log(stream);

            const docxReadableStream = stream
            const input = PDFServicesSdk.FileRef
                .createFromStream(docxReadableStream, PDFServicesSdk.CreatePDF.SupportedSourceFormat.docx);

            documentMergeOperation.setInput(input);

            // Execute the operation and Save the result to the specified location.
            documentMergeOperation.execute(executionContext)
                .then((result: any) => {
                    result.saveAsFile(`./output/${fileName}.pdf`);
                })
                .catch((err: Error) => {
                    throw new Error(err.message);
                });
        } catch (err) {
            console.log('Exception encountered while executing operation', err);
            throw new Error("Failed to Merge JSON with Document")
        }
    }




    /**
     * This method converts the incoming file buffer to stream
     * 
     * @param  {Buffer} binary
     */
    public bufferToStream(binary: Buffer) {
        return new Readable({
            read() {
                this.push(binary);
                this.push(null);
            }
        });
    }
}