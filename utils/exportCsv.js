import { Parser } from 'json2csv';
import fs from 'fs';

export const exportToCsv = (data, filename = 'exported_user.csv') => {
    const parser = new Parser();
    const csv = parser.parse(data);
    fs.writeFileSync(filename, csv);
    return filename;
};