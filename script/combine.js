const fs = require('fs');
const path = require('path');
const async = require('async');

/**
 * Combine all texts in converted dir into one single file
 */
const ConvertedDir = path.join(__dirname, '../save', 'converted');
const CombineDir = path.join(__dirname, '../save', 'combine');
function combine() {
  if (!fs.existsSync(CombineDir)) {
    fs.mkdirSync(CombineDir);
  }
  const wstream = fs.createWriteStream(path.join(CombineDir, 'data.txt'));

  fs.readdir(ConvertedDir, (err, files) => {
    if (err) {
      throw err;
    }
    async.forEachOf(
      files,
      (file, k, cb) => {
        fs.readFile(path.join(ConvertedDir, file), 'utf-8', (err, data) => {
          if (err) {
            cb(err);
            return;
          }

          wstream.write(data);
          wstream.write('\n');
          cb(null);
        });
      },
      err => {
        if (err) {
          console.error(err);
          return;
        }
        wstream.end();
      }
    );
  });

  wstream.on('finish', () => {
    console.log('Write ends.');
  });
}

combine();
