const fs = require('fs');
const path = require('path');
const SohuSaveDir = path.join(__dirname, '../save/sohu');

function saveSohuBlog({ url, title, text }, cb) {
  if (fs.existsSync(path.join(SohuSaveDir, title))) {
    console.log(`Save sohu blog with duplication. url: ${url}, title: ${title}`);
  }
  fs.writeFile(path.join(SohuSaveDir, title + '.txt'), text, cb);
}

module.exports = {
  sohu: saveSohuBlog,
};
