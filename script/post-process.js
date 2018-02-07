const fs = require('fs');
const path = require('path');

const SaveDir = path.join(__dirname, '../save');
const Types = ['renren', 'sina', 'sohu'];

function dirWalker() {
  for (let t of Types) {
    fs.readdir(path.join(SaveDir, t), (err, files) => {
      for (let file of files) {
        const filepath = path.join(SaveDir, t, file);
        postProcess(path.join(SaveDir, t, file), (err, data) => {
          if (err) {
            throw err;
          }

          save(filepath, data, err => {
            if (err) {
              throw err;
            }
          });
        });
      }
    });
  }
}

function postProcess(filepath, cb) {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      cb(err);
      return;
    }

    // eliminates line breaks in front and end of the file
    data = data.replace(/^\s+|\s+$/g, '');

    // trim for each line, whitespaces in front and end
    const tmp = data
      .split('\n')
      .map(function(line) {
        return line.replace(/^\s+|\s+$/g, '');
      })
      .filter(Boolean);
    cb(null, tmp.join('\n'));
  });
}

const ConvertedDir = path.join(__dirname, '../save', 'converted');

function save(filepath, data, cb) {
  if (!fs.existsSync(ConvertedDir)) {
    fs.mkdirSync(ConvertedDir);
  }
  const targetpath = path.join(ConvertedDir, path.basename(filepath));
  if (fs.existsSync(targetpath)) {
    console.log(`Target path ${targetpath} already exists. Abort`);
    cb(null);
    return;
  }
  fs.writeFile(targetpath, data, cb);
}

dirWalker();
