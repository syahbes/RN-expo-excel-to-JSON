import * as xlsx from 'xlsx';
import base64js from 'base64-js';

export default async function parseExcelToJson(fileUrl) {
  const res = await fetch(fileUrl);
  const blob = await res.blob(); // recover data as Blob
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve, reject) => {
    reader.onloadend = function () {
      const binaryString = base64js.toByteArray(reader.result.split(',')[1]);
      const workbook = xlsx.read(binaryString, { type: 'array' });
      const sheetNameList = workbook.SheetNames;
      const sheetData = sheetNameList.map((sheetName) => {
        return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      });
      resolve(sheetData);
    };
    reader.onerror = function () {
      reject(new Error('Failed to read file'));
    };
  });
}