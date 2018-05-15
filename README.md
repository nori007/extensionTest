<기능>

js ↔ contentScrtip 간 통신 기능
contentScript에서 chrome.storage를 활용한 데이터 저장 및 불러오기 기능
jscrambler 적용


<결과>

js ↔ contentScript 간 통신 테스트 완료 (customEvent를 활용해서)
contentScript에서 데이터 저장 및 불러오기 기능 완료(브라우저를 닫고 다시 실행해도 정상 동작 / A 도메인에서 저장 후, B 도메인에서 불러오기 성공)
jscrambler 적용 후, 정상 동작




<문제점>

파폭&엣지/크롬 저장소에 관련 함수가 다름
파폭&엣지: browser.storage.local.~~()
크롬          : chrome.storage.local.~~()
manifest.json에서 content_script의 도메인 필터 부분이 다름
파폭: 
"matches": [
"https://172.16.10.114/*",
"https://172.16.10.205/*",
"https://127.0.0.1/*"
],
크롬: 
"matches": [
"https://172.16.10.114:6800/*",
"https://172.16.10.205:6800/*",
"https://127.0.0.1/*"
],
파폭&엣지 에서는 sync 함수가 동작안함
chrome.storage.sync.~~()   // chrome.storage.local.~~()
두개가 무슨 차이 인지도 아직 모름 (로그인 유저로 동기화 하는거라는데... 테스트해보니 안됨)
