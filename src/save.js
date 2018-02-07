const fs = require('fs');
const path = require('path');

const saveDirMap = {
  sohu: path.join(__dirname, '../save/sohu'),
  renren: path.join(__dirname, '../save/renren'),
  sina: path.join(__dirname, '../save/sina'),
};

function saveSohuBlog(result, cb) {
  saver('sohu', result, cb);
}

function saveRenrenBlog(result, cb) {
  saver('renren', result, cb);
}

function saveSinaBlog(result, cb) {
  saver('sina', result, cb);
}

function saver(type, { url, title, text }, cb) {
  if (fs.existsSync(path.join(saveDirMap[type], title + '.txt'))) {
    console.log(`Save ${type} blog with duplication. url: ${url}, title: ${title}`);
  }
  fs.writeFile(path.join(saveDirMap[type], title + '.txt'), text, cb);
}

module.exports = {
  sohu: saveSohuBlog,
  renren: saveRenrenBlog,
  sina: saveSinaBlog,
};
