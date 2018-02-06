const fetch = require('node-fetch');
const cheerio = require('cheerio');
const striptags = require('striptags');
const he = require('he');

function sohuCrawler(url) {
  console.log(`Crawling ${url}`);
  return fetch(url, {
    method: 'GET',
    headers: {
      Cookie: `vjuids=9964173a3.154b3425d11.0.af1e939f539f1; vjlast=1463296352.1482481047.23; ppnewsinfo=1019|aHlzMjM1NjA2NzUxQHNvaHUuY29t|nightfall|http://img94.pp.sohu.com/images/blog/2006/10/2/21/4/10e9cc56893.jpg; sucaccount=aHlzMjM1NjA2NzUxQHNvaHUuY29t|hasayakeHYS|http://img94.pp.sohu.com/images/blog/2006/10/2/21/4/10e9cc56893.jpg|u64457501|=v2=aNAxUjQ2zjl1HNMzMHNvaHUuY29t|nightfall|http://img94.pp.sohu.com/images/blog/2006/10/2/21/4/10e9cc5689b.jpg; SUV=1605031716278616; debug_test=sohu_third_cookie; IPLOC=CN; ppsmu=1|1517805786|1519015386|dXNlcmlkOjIxOmh5czIzNTYwNjc1MUBzb2h1LmNvbXx1aWQ6MDp8dXVpZDowOg|LM_BWCUBif7f95gtMxx8CEXDTqJWo4p7NB8ts6tl5qjOn8rynMGP2U9Lp4NLsLgxkFyox8rE1znExUJqbL0amQ; ppinf=2|1517805786|1519015386|bG9naW5pZDowOnx1c2VyaWQ6MjE6aHlzMjM1NjA2NzUxQHNvaHUuY29tfHNlcnZpY2V1c2U6MzA6MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwfGNydDowOnxlbXQ6MTowfGFwcGlkOjQ6MTAxOXx0cnVzdDoxOjF8cGFydG5lcmlkOjE6MHxyZWxhdGlvbjowOnx1dWlkOjE2OjBkY2MxMGRlM2FlODQ0MXN8dWlkOjk6dTY0NDU3NTAxfHVuaXFuYW1lOjA6fA; pprdig=4gLMp_T_jGZrHr2o34fwsTImCdqaNqXwGnaptUCeYM9lAYNirXioHIMKBc9WuAE58YntfP8Ys-c7QZzR6VqKOLXu1MC43_137HisGKj-vrJPid9LU7W3_1kgPzhfNqk_XiCuce7okbpdw0jMfWr1rCKNmDaWifa91iXp4x7Jv8w; spinfo="c29odXxoeXMyMzU2MDY3NTFAc29odS5jb218MTAwNzk0OTI3Mg=="; spsession=MTAwNzk0OTI3MnwxNTE5MDE1Mzg2fDE1MTkwMTUzODZ8bmlnaHRmYWxs-FCtIX4AUsc48hxjIMPew7TEhrHQ=; lastdomain=1519015386|aHlzMjM1NjA2NzUxQHNvaHUuY29tfA|sohu.com|1; pp_login_time=https||1019|7|2|1100; bloginfo=aHlzMjM1NjA2NzUxQHNvaHUuY29t|8e97394792|nightfall|1|NightFall-%u4E00%u82B1%u4E00%u4E16%u754C%26%238230%3B%u4E00%u9E1F%u4E00%u5929%u5802|http://img94.pp.sohu.com/images/blog/2006/10/2/21/4/10e9cc56893.jpg; reqtype=pc; gidinf=x099980107ee0d53ee55e5c3c00086ac49a1e633832e; isTemplatesLoaded=1; JSESSIONID=aaauW9vR15Lop6Z0fKqfw; t=1517805997295; ppmdig=15178972940000001c77f53e9a5799e70ed9b1a9d28cf2bb; pvc=%2FPI9VYtcI1%2FSlmKGCZLFn24nMmzoQ2EV`,
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.textConverted();
      }
      throw resp.statusText;
    })
    .then(data => {
      const $ = cheerio.load(data);
      return {
        url: url,
        title: $('input#entrytitle')
          .first()
          .attr('value'),
        text: he.decode(striptags($('textarea#entryDraft').text(), 'p', '\n')),
      };
    })
    .then(result => {
      // trim sequential \n with only one left
      result.text = result.text.replace(/\n+/g, '\n');
      return result;
    });
}

module.exports = {
  sohu: sohuCrawler,
};
