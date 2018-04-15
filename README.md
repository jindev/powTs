# Proof of Word - typescript

## 필수 설치
- nodejs

## 서버 실행 방법

```bash 
> git clone git@github.com:jindev/powTs.git
> npm i 
> npm run build
```

### 테스트 넷 실행
```bash
> npm run server:testNet
```

브라우져의 `http://localhost:3000` 에서 확인

### 노드 서버 실행
채굴을 할 노드서버를 실행
```bash
> npm run server:client <포트번호>
```

## 페이지 설명

### Main
- 미리 실행한 노드 서버의 포트번호와 비밀번호를 입력해서 테스트 넷에 노드를 등록한다.

### Nodes 
- Main 페이지에서 등록한 노드들의 목록
- 채굴중: 각 노드들의 채굴진행 여부설정 버튼제공 
- set nonce: 채굴자의 시작 nonce 를 설정 
- 송금 기능 제공

### Transactions
- 완료 트랜젝션 목록
- 미완료 트랜젝션 목록
