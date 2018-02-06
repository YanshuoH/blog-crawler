const loader = require('./loader');
const crawler = require('./crawler');
const save = require('./save');

loader((err, dataset) => {
  if (err) {
    throw err;
  }

  for (let i = 0; i < dataset[0].length; i++) {
    let row = dataset[0][i];
    crawler
      .sohu(row)
      .then(result => {
        save.sohu(result, err => {
          if (err) {
            console.error('Error occurred while saving title = ${result.title}, url = ${result.url}');
            throw err;
          }
          console.log(`Successfully saved title = ${result.title}, url = ${result.url}`);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
});
