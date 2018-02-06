const fs = require('fs');
const path = require('path');
const async = require('async');
const parse = require('csv-parse');

function sohuDataLoader(cb) {
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

  const SohuInputFile = path.join(__dirname, '../data/sohu.csv');
  fs.createReadStream(SohuInputFile).pipe(parser);
}

module.exports = cb => {
  async.parallel([sohuDataLoader], cb);
};
