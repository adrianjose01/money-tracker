import IDataToExport from "../types/IDataToExport";

export const convertToCSV = (data: IDataToExport[]) => {
  if (data.length === 0) return "";

  // 1. Get headers (keys of the first object)
  const headers = Object.keys(data[0]);

  // 2. Map headers to a CSV row
  const headerRow = headers.join(",");

  // 3. Map data rows
  const rows = data.map((row) => {
    return headers
      .map((fieldName) => {
        // Handle commas inside data or null values
        const val = (row as any)[fieldName] ?? "";
        return `"${val}"`; // Wrap values in quotes to handle commas safely
      })
      .join(",");
  });

  // 4. Join everything with newlines
  return [headerRow, ...rows].join("\n");
};
