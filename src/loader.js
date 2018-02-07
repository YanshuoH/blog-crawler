const fs = require('fs');
const parse = require('csv-parse');

function csvDataLoader(filepath, cb) {
  const parser = parse({});
  var output = [];
  parser.on('readable', () => {
    while ((record = parser.read())) {
      output.push(record[0]);
    }
  });
  parser.on('error', err => {
    cb(err);
  });
  parser.on('finish', () => {
    console.log('read done');
    // remove the first line
    output.shift();
    cb(null, output);
  });

  fs.createReadStream(filepath).pipe(parser);
}

module.exports = csvDataLoader;
