# blog-crawler
Yet another crawler for my blogs. Saved for further analyze usage.

This is a home made script for personal usage with quite a few error handling.

## run
```
node src/index.js --sites sina --sites sohu --sites renren -n 500
```

* `-n` equals to `--number` which limites blog count. Often set to 1 for test purpose.

## Post processing
* Convertion: trim whitespaces and trailing line breaks

  `node script/post-process.js`

* Combine: all converted files will be combined into one single txt file

  `node script/combine.js`

## MIT license
