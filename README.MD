# PDF SERVICE

Note:- This is Package is written on top of ADOBE's PDF Service SDK

- Generate private Key and credentials json from the [Here](https://www.adobe.io/apis/documentcloud/dcsdk/gettingstarted.html?ref=getStartedWithServicesSDK).
- paste both the file in root dir of your project.

## Convert to pdf

Create PDFs from a variety of formats, including static and dynamic HTML; Microsoft Word, PowerPoint, and Excel; as well as text, image, and, Zip
Supported file types are HTML, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, RTF, BMP, JPEG, GIF, TIFF, PNG

```javascript
convertToPdf();
```

The file is created in the ./output/ folder as createPDF.pdf file

Hint: a string can be passed as an argument to generate the file in user preferred file name.
