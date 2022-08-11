# Introduction Project
- 만든 사람들 : 김경문, 김수정, 김주형 | 항해99 8기 주특기 숙련주차 4조
- 주 사용 기술 : ReactJS, Json-Server, Json DB, Redux-Toolkit, Redux-Thunk, Axios, Styled-Components
- 구현 기능 : 게시글 CRUD, 댓글 CRUD, infinite scroll, pagination

## Guide Project
### Project start
  - 프로젝트 배포주소 : https://simple-board-seven.vercel.app/
  - json 서버 배포한 주소 : https://simple-board3.herokuapp.com/list

### Install packages
- json-server (서버) 설지 : `yarn add json-server`
- 리덕스 설치 : `yarn add react-redux`
- 툴킷 (리덕스) 설치 : `yarn add @reduxjs/toolkit`
- thunk (미들웨어) 설치 : `yarn add redux-thunk`
- axios(통신) 설치 : `yarn add axios` 
- 라우터 (페이지 이동) 설치 : `yarn add react-router-dom` 
- logger (개발 편하게 도와줌) 설치 : `yarn add redux-loger`
- styled-components (스타일 적용) 설치 : `yarn add styled-components`
- 유효성 검사(폼 사용자 입력 안내 적용) : `yarn add react-hook-form`
- observer (무한스크롤) 설치 : `yarn add react-intersection-observer`

### Trouble Shooting
- 메인페이지에서 게시글을 수정, 삭제했을 때 실시간으로 화면에 렌더링 되지 않는 문제 
  
  * 문제1 : 무한스크롤을 컴포넌트에서 구현하면서 리덕스 데이터에는 반영되지 않는 문제. 무한스크롤을 구현하기 위해서 redux 모듈이 아니라 컴포넌트에서 axios로 비동기 통신을 하면서 데이터를 메인 화면에 보이게 구현을 했습니다. 수정, 삭제해도 db내에서는 반영되지만, axios로 비동기 통신으로 직접 가져오기 때문에 리덕스 내의 데이터에서는 변화가 없으므로 수정, 삭제한 결과를 실시간으로 화면에 재렌더링하지 못하는 문제가 발생했습니다. 

  * 문제2 : useselector를 이용해서 리덕스 모듈에서 데이터를 가져오면 실시간으로 수정, 삭제한 결과가 화면에 렌더링 되지만, 모든 데이터를 다 가져오기 때문에 무한스크롤이 적용되지 않는 문제가 발생했습니다. 
 
  * 해결방법: postlist라는 변수에  useselector를 이용해 리덕스 내에서 저장된 모든 데이터를 가져와서 저장한 뒤, observer가 div를 관찰하는 데이터의 길이만큼 slice를 이용해서 잘라서 해결했습니다.
  
### 파일 구조  
```
C:.
|   App.css
|   App.js
|   App.test.js
|   index.css
|   index.js
|   logo.svg
|   reportWebVitals.js
|   setupTests.js
|   simple-board.txt
|   tailwind.config.js
|   
+---components
|   +---comments
|   |       AddComment.js
|   |       Comment.js
|   |       Pagination.js
|   |       
|   +---common
|   |       Button.jsx
|   |       Header.jsx
|   |       Layout.jsx
|   |       Loading.jsx
|   |       Wrapper.jsx
|   |       
|   +---hooks
|   |       useFetch.js
|   |       useinput.js
|   |       
|   \---main
|           List.jsx
|           ListItem.jsx
|           
+---lib
|   \---styles
|           palette.js
|           
+---pages
|       Detail.jsx
|       Home.jsx
|       
\---redux
    |   store.js
    |   
    +---config
    \---modules
            commentSlice.js
            commentsSlice.js
            postSlice.js
```
  

-----

### 폴더 및 파일 설명
- pages
  * Home ::: 메인페이지
  * Detail ::: 상세페이지, 게시글수정페이지, 게시글추가페이지, 댓글 조회, 댓글페이지네
  * ---------------- 

- components : 컨포넌트별 파일 생성
  * common[공통]
    * Button :::  만능버튼 
    * Header :::  헤더
    * Layout :::  레이아웃
    * Loading ::: 로딩스피너
    * Wrapper ::: Wrapper styled.components
    
  * ----------------
  
  * hooks[커스텀 훅]
    * useFetch ::: 
    * useinput ::: 인풋 커스텀훅
    
  * ---------------- 
  
  * main  [메인페이지]
    * List :::  게시글 조회(리스트 출력)
    * Listitem :::  각각의 게시글(게시글 삭제, 수정)

  * ---------------- 
  
  * comments[상세페이지 댓글]
    * AddComment :::  댓글 입력(댓글 입력 및 댓글 추가 버튼)
    * Comment :::  각각의 댓글
    * Pagination ::: 페이지네이션 푸터
  * ---------------- 
  
- redux
  * store.js ::: 스토어
- reudx/modules : 리덕스 
  * commentsSlice ::: 게시글id에 해당하는 댓글들 리듀서
  * commentSlice ::: 수정하는 댓글 input에 기존값을 불러오는 리듀서
  * postSlice ::: 게시글 리듀서
  * ---------------- 
-lib/styles
  * palett.js ::: 색깔 모음
  * ---------------- 

- App.js ::: 페이지 이동 관련 기능(라우터)

-----

### 스타일 적용
- 전체적인 틀: styled components 사용
- 인풋창, 버튼아이콘 : 머터리얼 ui 사용

-----

### DB Format
- posts > id(게시글 아이디: 기본값), title(게시글제목), text(게시글내용), comments(댓글)
- ... comments > id(댓글 아이디: 기본값), writer(댓글 작성자), massage(댓글 내용)
```
{
  "list": [
  {
    "id": 1,
    "writer": "김경문",
    "title": "리덕스툴킷",
    "contents": "툴킷으로 redux-thunk써보기"
  },
  {
    "writer": "김수정",
    "title": "무한스크롤",
    "contents": "인터셉션 옵져버를 이용해 무한스크롤 구현하기",
    "id": 2
},
  ],
  "comment_list" : [
   {
    "todoId": 1,
    "username": "김경문",
    "content": "잘만들었네요",
    "id": 1
  },
  {
    "todoId": 1,
    "username": "김주형",
    "content": "좋은 내용이네요",
    "id": 2
  }
  ]
}
```
