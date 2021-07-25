/// <reference types="node" />
import { Readable } from 'stream';
export declare class PdfService {
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
