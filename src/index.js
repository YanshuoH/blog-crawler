const path = require('path');
const commandLineArgs = require('command-line-args');
const loader = require('./loader');
const crawler = require('./crawler');
const save = require('./save');

const SupportedTypes = ['sohu', 'renren', 'sina'];
const OptionDefinitions = [
  { name: 'sites', alias: 's', type: String, multiple: true },
  { name: 'number', alias: 'n', type: Number },
];
const options = commandLineArgs(OptionDefinitions);
if (!options.sites || options.sites.length === 0) {
  throw new Error('sites argument mandatory');
}
for (let s of options.sites) {
  if (SupportedTypes.indexOf(s) === -1) {
    throw new Error(`Unsupported site type ${s}`, s);
  }
}
const SampleCount = options.number ? options.number : -1;

if (options.sites.indexOf('sohu') > -1) {
  pipeline('sohu');
}
if (options.sites.indexOf('renren') > -1) {
  pipeline('renren');
}
if (options.sites.indexOf('sina') > -1) {
  pipeline('sina');
}

function pipeline(type) {
  const filepathMap = {
    sohu: 'sohu.csv',
    renren: 'renren.csv',
    sina: 'sina.csv',
  };
  loader(path.join(__dirname, `../data/${filepathMap[type]}`), (err, dataset) => {
    if (err) {
      throw err;
    }
    if (SampleCount > -1) {
      dataset = dataset.slice(0, SampleCount);
    }

    for (let i = 0; i < dataset.length; i++) {
      let row = dataset[i];
      crawler[type](row)
        .then(result => {
          save[type](result, err => {
            if (err) {
              console.error('Error occurred while saving title = ${result.title}, url = ${result.url}');
              throw err;
            }
            console.log(`Successfully saved title = ${result.title}, url = ${result.url}`);
          });
        })
        .catch(err => {
          console.error(row, err);
        });
    }
  });
}
