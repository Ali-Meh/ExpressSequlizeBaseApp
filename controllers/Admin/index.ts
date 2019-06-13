import fs from 'fs';
import path from 'path';
const basename = path.basename(__filename);
let controllers:any={};
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach(file => {
      controllers[file]=require(path.join(__dirname, file));
  });

export default (controllers);