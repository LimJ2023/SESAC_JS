const url = require("url");

const myUrl = new URL("https://nodejs.org/docs/latest/api/url.html?mode=true");

//1. 호스트명
const hostName = myUrl.hostname;
console.log(hostName);
//2. 경로 출력
const href = myUrl.pathname;
console.log(href);
//3. 쿼리 파라미터 출력
const params = myUrl.searchParams;
const search = myUrl.search;
console.log(params);
console.log(search);

//url파싱 한번에 하기
const parsedUrl = url.parse(myUrl.toString());
console.log(parsedUrl);
console.log(parsedUrl.host);
console.log(parsedUrl.search);

//경로 만들기
const myURL2 = {
  protocol: "https",
  hostname: "sesac.com",
  pathname: "service/path/dir1",
  query: {
    mode: "false",
    product: "hello",
  },
};

//포맷 함수로 합침
const assembledURL = url.format(myURL2);
console.log(assembledURL);
