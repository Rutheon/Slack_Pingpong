# Slack_PingPong
> 삭막한 메신저에 추가하면 인기만점  서비스<br>
~~내 친구는 가상에 있어요~~

슬랙메신저와 PingPong빌더를 연동한 간단한 예제입니다.<br>
서비스는 https://pingpong.us/ 에서 가입 할 수 있어요.

## 설치 방법
핑퐁 빌더(https://pingpong.us/) 에 회원가입 한 후 -> 플랫폼 연동에서 CustomAPI 신청을 해줍니다.<br>
이후 발급받은 URL / Authorization를 env에 넣어주세요.<br>![그림1](https://user-images.githubusercontent.com/36251104/64138253-34733780-ce37-11e9-8a26-cab4ad72363f.png)

URL 속에 있는 ~/builder/여기키를 URL_ID에 <br>
Authorization를 CLIENT_AUTHORIZATION에 맞춰서 넣어주세요.<br>
(빨간색 박스에 있는 내용만 가져와서 env에 넣어주시면 됩니다.)<br>

env 예시<br>

```
URL_ID =5d661f4e~~~~~~~~~~
CLIENT_AUTHORIZATION =Basic a2V5OjYwOGV~~~~~~~~~~~~
```

이후<br>

```shell
> npm install
> node add
```

로 실행하면 8086포트로 서비스가 열립니다.<br>

## 사용 예제

```json
POST /pingPongApi HTTP/1.1
Content-Type: application/json
{
	"text" : "안녕~",
	"user_name" : "테스트이름"	
}
```

서비스 그대로 URL 적용하면 실행됩니다 .

## 업데이트 내역

* 0.1.0
    * 수정 : 문서 업데이트
    * 최초 슬랙봇 연동 버전

## 정보

이 예제는 핑퐁관계자가 아닌 개인 사용자가 제작한 예제입니다. <br>궁금한 사항이나 문의는 sistinafibel@naver.com로 메일 보내주세요.