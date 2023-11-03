# Cooka !
<br/>
서비스url : 

<br/>

#  💻 서비스 소개 

<br/>
 - 요리를 좋아하는 사람들을 위한 간단한 커뮤니티 사이트입니다.  
 - 서로의 레시피 , 맛집을 공유할 수 있고, 댓글로 의견을 나눌 수 있습니다. 
- 그 외에 요리와 관련된 질문/답변 서비스와 음식관련 뉴스페이지를 제공합니다.
- 좋아요, 댓글로 마음에 드는 게시물을 모아볼 수도 있습니다.

<br/>

##  🛠️ 기술 스택

<br/>
-   HTML/CSS, React, Next.js, Typescript
    -   트래픽이 중요한 커뮤니티 사이트인만큼 손 쉬운 SEO를 위해 Next.js 를 사용하였습니다.
    -   런타임 에러를 최소화 하기 위해 Typescript를 적용시켜 보았습니다.

-   Node.js, MySQL
    -   프론트엔드와 똑같은 언어를 써 서버를 개발할 수 있다는 장점 때문에 Node.js로 백엔드 서버를 구축하였습니다.
    -   가장 기본적인 형태의 RDBMS이자 관련 커뮤니티가 큰 MySQL을 DBMS로 선택하였습니다.
<br/>

##  ⚙️ 구현 기능

<br/>
-   로그인
    -   전통적인 방식인 Session 을 이용해 로그인 방식을 구현 하였습니다.
    -   Session이 어떻게 동작 하는지 이해하고 Session을 파일이 아닌 MySQL에서 제공되는 Session을 활용하여 구현하였습니다.
    -   KaKao Oauth API를 이용해 소셜로그인을 구현하였습니다.

-   포스팅
    -   이미지나, 폰트 스타일 등 게시글의 퀄리티를 높이기 위해 text-area를 input으로 사용하지 않고 React-quill 라이브러리를 사용하였습니다.
    -   해당 글작성자는 포스팅을 수정, 삭제할 수 있습니다.
-   좋아요 / 댓글
    -   관계형 데이터베이스를 바탕으로 게시글당 좋아요, 댓글을 구현하였습니다.
-   검색
    -   router의 query를 이용해 검색기능을 구현하였습니다.
-   화제의 게시글
    -   좋아요를 기준으로 분야별 화제의 게시글이 선정됩니다.
-   화제의 쉐프
    -   유저 전체게시글의 총 좋아요의 갯수로 선정됩니다.
    -   
<br/>
