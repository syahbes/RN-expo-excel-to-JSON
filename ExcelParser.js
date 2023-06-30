import * as xlsx from 'xlsx';

export default async function parseExcelToJson(fileUrl) {
    const res = await fetch(fileUrl);
    const ab = await res.arrayBuffer(); // recover data as ArrayBuffer
    const wb = xlsx.read(ab);
    const firstSheet = wb.SheetNames[0];
    const worksheet = wb.Sheets[firstSheet];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: false });
    const headerRow = jsonData.shift(); // Remove the header row from the data

    const cleanedData = jsonData.map(row => {
      const cleanedRow = {};
      row.forEach((value, index) => {
        const header = headerRow[index]?.trim(); // Remove leading and trailing spaces
        const cleanedValue = value?.trim(); // Remove leading and trailing spaces from value
        cleanedRow[header] = cleanedValue;
      });
      return cleanedRow;
    });

    return cleanedData;
}
