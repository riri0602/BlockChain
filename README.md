# BlockChain Project - DApp

* 이더리움 플랫폼 기반 온라인 투표 웹 구현
* 중복 투표 방지 및 투표 조작 방지 목적으로 제작되었으며, 여러 명의 후보 중 한 명의 후보자를 투표하는 방식으로 구현되었음.
* 후보가 여럿일 경우, 코드 수정으로 추가 가능
* 테스트 영상 :

## Team Newtro
* Leader : 한규리(18681032)
> 1. 아이디어 구상
> 2. 프로젝트 계획
> 3. 프로젝트 진행
> 4. 프로젝트 테스트 및 에러 해결
> 5. PPT

* Member : 최여은(18681030)
> 아이디어 구상

## 실행 방법
### -1. 필수 프로그램
* Ganache
* Truffle v5.1.61
* Nodejs v16.15.0
* Web3.js v1.2.9
* Metamask
* (Solidity v0.5.16)

### -2. 실행
* Ganache 실행
<br>
<p align="center">
<img src="/images/metamask_0.jpg" align="center" width="35%"></img>
</p>
<br>

* truffle migrate 초기화
<pre><code>election> truffle migrate --reset</code></pre>

<pre><code>election> truffle migrate</code></pre>

* 웹 서버 구동
<pre><code>election> npm run dev</code></pre>

* Metamask 로그인
<br>
<p align="center">
<img src="/images/metamask_1.jpg" align="center" width="35%"></img>
</p>
<br>

* Ganache Private Key를 이용해 계정 가져오기
<br>
<p align="center">
  <img src="/images/ganache_1.jpg" align="center" width="60%">
  <img src="/images/metamask_2.jpg" align="center" width="35%">
</p>
<br>

* 사이트 연결하기(수동)
<br>
<p align="center">
  <img src="/images/metamask_3.jpg" align="center" width="35%">
  <img src="/images/metamask_4.jpg" align="center" width="35%">
</p>
<br>

### -3. 실행
* 웹 서버 링크 : http://localhost:3000/
