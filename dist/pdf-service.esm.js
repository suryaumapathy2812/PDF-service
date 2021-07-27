import fs from 'fs';
import { Readable } from 'stream';

var PDFServicesSdk = /*#__PURE__*/require("@adobe/pdfservices-node-sdk");

var PdfService = /*#__PURE__*/function () {
  function PdfService() {}

  var _proto = PdfService.prototype;

  _proto.credentials = function credentials() {
    return PDFServicesSdk.Credentials.serviceAccountCredentialsBuilder().fromFile('pdfservices-api-credentials.json').build();
  }
  /**
   * Create PDFs from a variety of formats, including static and dynamic HTML; Microsoft Word, PowerPoint, and Excel; as well as text, image, and, Zip
   *
   * Supported file types are HTML, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, RTF, BMP, JPEG, GIF, TIFF, PNG
   *
   * @param  {string} fileName
   */
  ;

  _proto.convertToPdf = function convertToPdf(fileName) {
    if (fileName === void 0) {
      fileName = "createPDF";
    }

    try {
      // Initial setup, create credentials instance.
      var credentials = this.credentials(); // Create an ExecutionContext using credentials

      var executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
      var createPdfOperation = PDFServicesSdk.CreatePDF.Operation.createNew(); // Set operation input from a source file.

      var input = PDFServicesSdk.FileRef.createFromLocalFile('resources/createPDFInput.docx');
      createPdfOperation.setInput(input); // Execute the operation and Save the result to the specified location.

      createPdfOperation.execute(executionContext).then(function (result) {
        return result.saveAsFile("output/" + fileName + ".pdf");
      });
    } catch (err) {
      console.log(err);
      throw new Error("Failed to Convert into PDF");
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
  ;

  _proto.mergeJsonToDocStream = function mergeJsonToDocStream(buffer, data, fileName) {
    try {
      // Initial setup, create credentials instance.
      var credentials = this.credentials(); // Setup input data for the document merge process

      var jsonDataForMerge = data; // Create an ExecutionContext using credentials

      var executionContext = PDFServicesSdk.ExecutionContext.create(credentials); // Create a new DocumentMerge options instance

      var documentMerge = PDFServicesSdk.DocumentMerge;
      var documentMergeOptions = documentMerge.options;
      var options = new documentMergeOptions.DocumentMergeOptions(jsonDataForMerge, documentMergeOptions.OutputFormat.PDF); // Create a new operation instance using the options instance

      var documentMergeOperation = documentMerge.Operation.createNew(options); // Set operation input document template from a source file.

      var filePath = process.cwd() + "/output/" + fileName;

      if (fs.existsSync(filePath)) {
        console.log("File exists.");
        fs.unlinkSync(filePath);
      } else {
        console.log("File does not exist.");
      } // const input = PDFServicesSdk.FileRef
      //   .createFromLocalFile('src/templates/templates/ASSAY_Software Services Agreement_SMO.docx');


      var stream = this.bufferToStream(buffer);
      console.log("Buffer to Stream");
      console.log(stream);
      var docxReadableStream = stream;
      var input = PDFServicesSdk.FileRef.createFromStream(docxReadableStream, PDFServicesSdk.CreatePDF.SupportedSourceFormat.docx);
      documentMergeOperation.setInput(input); // Execute the operation and Save the result to the specified location.

      documentMergeOperation.execute(executionContext).then(function (result) {
        result.saveAsFile("./output/" + fileName + ".pdf");
      })["catch"](function (err) {
        throw new Error(err.message);
      });
    } catch (err) {
      console.log('Exception encountered while executing operation', err);
      throw new Error("Failed to Merge JSON with Document");
    }
  }
  /**
   * This method converts the incoming file buffer to stream
   *
   * @param  {Buffer} binary
   */
  ;

  _proto.bufferToStream = function bufferToStream(binary) {
    return new Readable({
      read: function read() {
        this.push(binary);
        this.push(null);
      }
    });
  };

  return PdfService;
}();

export { PdfService };
//# sourceMappingURL=pdf-service.esm.js.map
