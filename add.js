/**
 * 슬랙 <-> 핑퐁 빌더 연결 예제
 * 
 * 2019.09.02 sistinafibel
 * sistinafibel@naver.com
 * 
 */

let express = require('express');
let request = require('request');
let bodyParser = require('body-parser'); //POST 방식 받을때 사용함
let md5 = require('md5');

require('dotenv').config();


console.log("URL_ID::" + process.env.URL_ID);
console.log("CLIENT_AUTHORIZATION::" + process.env.CLIENT_AUTHORIZATION);

if (!process.env.URL_ID || 
    !process.env.CLIENT_AUTHORIZATION){
    throw new Error('evn 설정을 확인해주세요.');
}


/*** 환경 설정 ***/
const url_id = process.env.URL_ID;
const client_authorization = process.env.CLIENT_AUTHORIZATION;

let app = express();

//POST 셋팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//핑퐁봇 시작
app.post('/pingPongApi', function (req, res) {
	console.log(req.body.text);
	console.log(req.body);

	let post_text = req.body.text;
	writerName = req.body.user_name;

	//슬랙봇으로 인식하는 즉시 return 합니다.
	if(writerName == "slackbot"){
		return;
	}

	//이용자의 이름명 기준으로 해시를 만들어서 똑같은 대화가 나오지 않도록 합니다.
	let api_url = `https://builder.pingpong.us/api/builder/${url_id}/integration/v0.2/custom/${md5(writerName)}`;  


	let options = {
		url: api_url,
		method : 'POST',
		body: {"request": {"query": post_text}},
		headers: {'Content-Type': 'application/json' , 'Authorization': client_authorization},
		json : true
	};

	request.post(options, function (error, response, body) {

		if (!error && response.statusCode == 200) {
			let jsonObject = {
				"text" : decodeURI(body.response.replies[0].text)
			};
			res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
			res.end(JSON.stringify(jsonObject));
		}
		else{
			let jsonObject = {
				"text" : "호엥.. 서비스에 문제가 발생한것 같아요. 관리자님 확인해주세요!"
			};
			console.log(error);
			res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
			res.end(JSON.stringify(jsonObject));
		}
	});

});
app.listen(8086, function () {
    console.log("슬랙 <-> 핑퐁 빌더 연결 예제 ");
});
