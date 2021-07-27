/// <reference types="node" />
import { Readable } from 'stream';
export default class PdfService {
    credentials(): any;
    /**
     * Create PDFs from a variety of formats, including static and dynamic HTML; Microsoft Word, PowerPoint, and Excel; as well as text, image, and, Zip
     *
     * Supported file types are HTML, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, RTF, BMP, JPEG, GIF, TIFF, PNG
     *
     * @param  {string} fileName
     */
    convertToPdf(fileName?: string): void;
    /**
     * This method merge JSON data with Microsoft Office DOCX template file (buffer)
     * to output a PDF file
     *
     * @param  {Buffer} buffer
     * @param  {JSON} data
     * @param  {string} fileName
     */
    mergeJsonToDocStream(buffer: Buffer, data: JSON, fileName: string): void;
    /**
     * This method converts the incoming file buffer to stream
     *
     * @param  {Buffer} binary
     */
    bufferToStream(binary: Buffer): Readable;
}
