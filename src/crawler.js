const fetch = require('node-fetch');
const fetchRetry = require('fetch-retry');
const cheerio = require('cheerio');
const striptags = require('striptags');
const he = require('he');

const ChromeUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';

function processLineBreaks(result) {
  // trim sequential \n with only one left
  result.text = result.text.replace(/\n+/g, '\n');
  return result;
}

function sohuCrawler(url) {
  console.log(`Crawling ${url}`);
  return fetch(url, {
    method: 'GET',
    headers: {
      Cookie: `vjuids=9964173a3.154b3425d11.0.af1e939f539f1; vjlast=1463296352.1482481047.23; ppnewsinfo=1019|aHlzMjM1NjA2NzUxQHNvaHUuY29t|nightfall|http://img94.pp.sohu.com/images/blog/2006/10/2/21/4/10e9cc56893.jpg; sucaccount=aHlzMjM1NjA2NzUxQHNvaHUuY29t|hasayakeHYS|http://img94.pp.sohu.com/images/blog/2006/10/2/21/4/10e9cc56893.jpg|u64457501|=v2=aNAxUjQ2zjl1HNMzMHNvaHUuY29t|nightfall|http://img94.pp.sohu.com/images/blog/2006/10/2/21/4/10e9cc5689b.jpg; SUV=1605031716278616; debug_test=sohu_third_cookie; IPLOC=CN; ppsmu=1|1517805786|1519015386|dXNlcmlkOjIxOmh5czIzNTYwNjc1MUBzb2h1LmNvbXx1aWQ6MDp8dXVpZDowOg|LM_BWCUBif7f95gtMxx8CEXDTqJWo4p7NB8ts6tl5qjOn8rynMGP2U9Lp4NLsLgxkFyox8rE1znExUJqbL0amQ; ppinf=2|1517805786|1519015386|bG9naW5pZDowOnx1c2VyaWQ6MjE6aHlzMjM1NjA2NzUxQHNvaHUuY29tfHNlcnZpY2V1c2U6MzA6MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwfGNydDowOnxlbXQ6MTowfGFwcGlkOjQ6MTAxOXx0cnVzdDoxOjF8cGFydG5lcmlkOjE6MHxyZWxhdGlvbjowOnx1dWlkOjE2OjBkY2MxMGRlM2FlODQ0MXN8dWlkOjk6dTY0NDU3NTAxfHVuaXFuYW1lOjA6fA; pprdig=4gLMp_T_jGZrHr2o34fwsTImCdqaNqXwGnaptUCeYM9lAYNirXioHIMKBc9WuAE58YntfP8Ys-c7QZzR6VqKOLXu1MC43_137HisGKj-vrJPid9LU7W3_1kgPzhfNqk_XiCuce7okbpdw0jMfWr1rCKNmDaWifa91iXp4x7Jv8w; spinfo="c29odXxoeXMyMzU2MDY3NTFAc29odS5jb218MTAwNzk0OTI3Mg=="; spsession=MTAwNzk0OTI3MnwxNTE5MDE1Mzg2fDE1MTkwMTUzODZ8bmlnaHRmYWxs-FCtIX4AUsc48hxjIMPew7TEhrHQ=; lastdomain=1519015386|aHlzMjM1NjA2NzUxQHNvaHUuY29tfA|sohu.com|1; pp_login_time=https||1019|7|2|1100; bloginfo=aHlzMjM1NjA2NzUxQHNvaHUuY29t|8e97394792|nightfall|1|NightFall-%u4E00%u82B1%u4E00%u4E16%u754C%26%238230%3B%u4E00%u9E1F%u4E00%u5929%u5802|http://img94.pp.sohu.com/images/blog/2006/10/2/21/4/10e9cc56893.jpg; reqtype=pc; gidinf=x099980107ee0d53ee55e5c3c00086ac49a1e633832e; isTemplatesLoaded=1; JSESSIONID=aaauW9vR15Lop6Z0fKqfw; t=1517805997295; ppmdig=15178972940000001c77f53e9a5799e70ed9b1a9d28cf2bb; pvc=%2FPI9VYtcI1%2FSlmKGCZLFn24nMmzoQ2EV`,
      'User-Agent': ChromeUserAgent,
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
    .then(processLineBreaks);
}

function renrenCrawler(url) {
  console.log(`Crawling ${url}`);
  return fetchRetry(url, {
    method: 'GET',
    headers: {
      Cookie: `anonymid=jdcjog4oelt9gh; depovince=GW; jebecookies=a87f5b03-71f9-4f66-bc78-738c204d03d6|||||; _r01_=1; ick_login=92389c01-2b85-4b47-bff7-3faaa708cf57; _de=105C397F5655533D2BCE63FA4AC5828C757173A867DCB561696BF75400CE19CC; p=7885be83cdb46c52c0437788022f71aa1; ap=306621801; first_login_flag=1; ln_uact=hys235606751@hotmail.com; ln_hurl=http://hdn.xnimg.cn/photos/hdn221/20131220/2335/main_yfke_474500038d82111a.jpg; t=532d6280d208835b8031f7976194423b1; societyguester=532d6280d208835b8031f7976194423b1; id=306621801; xnsid=91954948; loginfrom=syshome; ch_id=10016; jebe_key=3d59c4e8-1025-42a9-8f69-ee3ab188507c%7C2b8763619703f02c4097d6376dcdce47%7C1517975945108%7C1%7C1517975947816; JSESSIONID=abc8O2JgjCoUQedoVAUfw; FTAPI_BLOCK_SLOT=FUCKIE; FTAPI_ST=FUCKIE; FTAPI_ASD=1; FTAPI_Source=www.renren.com/306621801; wp=0; FTAPI_PVC=1025935-5-jdd4pmg4; wp_fold=0`,
      'User-Agent': ChromeUserAgent,
    },
    retries: 10,
    retryDelay: Math.random() * 4000 + 500,
  })
    .then(resp => {
      if (resp.ok) {
        return resp.text();
      }
      throw resp.statusText;
    })
    .then(data => {
      const $ = cheerio.load(data);
      return {
        url: url,
        title: $('.blogDetail-title')
          .first()
          .text(),
        text: he.decode(striptags($('#blogContent').html(), 'p', '\n')),
      };
    })
    .then(processLineBreaks);
}

function sinaCrawler(url) {
  console.log(`Crawling ${url}`);
  return fetch(url, {
    method: 'GET',
    headers: {
      Cookie: `blogAppAd_blog7articlelistM=1; SINAGLOBAL=106.39.58.178_1462266981.127189; Apache=106.39.58.178_1462266981.818619; U_TRS1=000000b2.ec7d503d.57286c66.a268067c; U_TRS2=000000b2.ec88503d.57286c66.e039f808; vjuids=-c17cf09.15475e77619.0.3e4363275b74c; SessionID=karbt985gg3ih2cvd2ftk0vht4; SGUID=1464960332068_94656865; SUS=SID-2525059432-1466565172-JA-qynmz-897b9dd016a6a238d85119c2d9d639d5; SCF=AvlevhJA0SpEvGRXoWUsQwN31RN5q1-AT1iwcI3Uh2wUKnp5PPz0xj9ZLq7P9kBwHE0-GkTxtJRMOo-Ar6VtATU.; bdshare_firstime=1490190573586; IDC_LOGIN=BJ%3A1490190527; UOR=,blog.sina.com.cn,; ULV=1494037555412:1:1:1:106.39.58.178_1462266981.818619:; _s_upa=2; ULOGIN_IMG=gz-1850fa564b5968a300178d47b73dedbd3f12; vjlast=1504232421; BLOGUSERNNNNAME=undefined; sso_info=v02m6alo5qztKWRk5ClkKOkpY6UkKWRk5iljpSMpY6DoKWRk5SlkKSQpZCUkKWRk6ClkKSQpZCjiKadlqWkj5OItYyjlLCNk6S0jLOIwA==; _s_loginStatus=2525059432; SUB=_2A253ftHcDeRhGeRL6VcR9SfIyD6IHXVUCkQUrDV_PUNbm9ANLVjWkW9NU1BsDDpDjdhTmRPZRqh47sMkLubXlfh4; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWZ1VgkAyNyaSETJU9C6BZe5NHD95QESKzfeh-4SheEWs4Dqcj.i--Xi-z4iKL2i--ciKLhiKnRi--fi-i2i-82i--Ri-i2i-zE; ALF=1549522188; lxlrttp=1517816335; rotatecount=3; SINABLOGNUINFO=2525059432.96815968.0; BLOG_TITLE=%E4%B9%9D%E6%9C%88%E5%BD%AD%E8%BD%B2%E7%9A%84%E5%8D%9A%E5%AE%A2; mblog_userinfo=uid%3D2525059432%26nick%3D%E4%B9%9D%E6%9C%88%E5%BD%AD%E8%BD%B2; _s_loginuid=2525059432`,
      'User-Agent': ChromeUserAgent,
    },
    retries: 10,
    retryDelay: Math.random() * 4000 + 500,
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
        title: $('.articalTitle > h2.titName')
          .first()
          .text(),
        text: he.decode(striptags($('.articalContent').text(), 'p', '\n')),
      };
    })
    .then(processLineBreaks);
}

module.exports = {
  sohu: sohuCrawler,
  renren: renrenCrawler,
  sina: sinaCrawler,
};
