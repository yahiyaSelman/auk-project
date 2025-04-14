import fs from 'fs';
import path from 'path';

export const searchDocuments = (query) => {
  const dataPath = path.join(process.cwd(), './lib/resources.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  return data.filter(doc => doc.content.toLowerCase().includes(query.toLowerCase()));
};
