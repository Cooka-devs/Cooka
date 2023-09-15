import { ResultSetHeader } from "mysql2/promise";
import { DB_QUERY_ERROR } from "../constants/response";
import { QueriesFunction, QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { Pool } from "mysql2";
export const getUsers: QueriesFunction = async (conn) => {
  try {
    const result = await conn.query("SELECT * from user");
    return makeSuccessResponse(result[0]); //pool.query로 user를 get후 result로저장후 첫번째 데이터를 리턴 makeSuccessResponse 형태로
  } catch (err) {
    return DB_QUERY_ERROR;
  }
};

export interface AddUserParams {
  name: string;
  nickname: string;
  phone_number: string;
  login_id: string;
  login_password: string;
  login_type: string;
  profile_img: string;
  profile_text?: string;
  social_id: number;
}

export const addUser: QueriesFunctionWithBody<AddUserParams> = async (
  conn,
  params
) => {
  //conn에 pool, params에 요청된body
  const { name, nickname, phone_number, login_type, social_id } = params;
  try {
    const result = await conn.execute(
      //pool.execute
      //execute()란 작업 처리 결과를 반환하지 않는다.
      //작업 처리 도중 예외가 발생하면 스레드가 종료되고 해당 스레드는 스레드 풀에서 제거된다.
      //다른 작업을 처리하기 위해 새로운 스레드를 생성한다.

      //<=>submit()
      //작업 처리 결과를 반환한다.
      //작업 처리 도중 예외가 발생하더라도 스레드는 종료되지 않고 다음 작업을 위해 재사용
      //스레드의 생성 오버헤드를 방지하기 위해서라도 submit() 을 가급적 사용한다.
      "INSERT INTO user (name, nickname, phone_number, login_type, social_id) VALUES (?, ?, ?, ?, ?)",
      [name, nickname, phone_number, login_type, social_id]
    ); //INSERT INTO user (res.body)
    const id = (result as ResultSetHeader[])[0].insertId; // ?? 잘모르겠음
    return makeSuccessResponse(id);
  } catch (err) {
    console.log(`err`, err);
    return DB_QUERY_ERROR;
  }
};

// 실무면접에 -> 실무자 (팀장, 사수) + 대표나 인사팀, 실무자 (팀장 + 사수) + 대표나 인사팀
// 2명 3명 (드라마에서 보던것처럼 정장입고 4명앉아있고 면접관 4명앉아있어서 총 8명)
// 누구누구씨? 자기소개 해보세요.

// 개발자 면접 장점 단점 자기소개 어렸을때 환경 -> 안물어봄......

// 만약에 니가 희망하는 프로덕트의 퀄리티가 1000인데, 이만큼 달성하려면 6개월이 필요하다.
// 근데, 지금 상황이 회사가 투자를 꼭 받아야하는 상황이라, 2개월안에 프로덕트를 만들어내야한다.
// => 보통 이럴때, 어떻게 할거고, 평소에 프로덕트를 만들 때 방향성을 어떻게 잡느냐??

// => 아.. 개발자는 무조건 장인정신이 필요하다고 생각합니다. 그래서 대충만들어서 내는건 있을 수 없는 일입니다.
// => 아 무조건 시간에 맞춰야죠. 어떻게든 만들어내면 된다고 생각합니다.
// 그래서 2개월만에 만들었어, 근데 그 뒤에 업데이트가 일주일마다 해야되네?
// 이거 언제 고치고 언제 업데이트할거임? 졷됐다고 볼 수 있다. 왜? 2개월만에 난리를 쳐놨으니,

// => 시간안에 만들되, 어떤 그 유지보수의 가능성을 염두에 두고 만들어야한다고 생각합니다.
// => 예를들어서 확장성이나 유지보수를 염두에두고, 코드를 수정하기 쉽게 설계를 잘한다.
// 인터페이스 위주로 뭔가 모듈들을 갈아끼우기 쉽게 만들어 둔다던가.

// 아 이제 기술질문을 좀 드리겠습니다.
// 자 졷됐다 느꼈어 모르는 질문이야. (어떻게든 니가 최소한 이해한만큼이라도 설명을 존나해야돼)

// 윤승휘 닉네임 유저가 10명이있어,
// 스스로 이제 게임을 접기위해서 탈퇴를 했어
// affectedRows => 10
// 닉네임이 중복불가면? 닉네임으로 해도되지 않나? -> 반은 맞고 반은 틀린말이야
// db index -> 색인 (기본적으로 primary key는 색인이 걸려있어)
// => 무슨 뜻이냐 존나 빨리찾을수 있다. 아이디가 6699번인 유저를 개빨리 찾아
// 정렬 -> 정렬이랑 찾는거랑 무슨상관이지? (인덱스 -> 정렬해놓는거)
// 이분 탐색이 가능해 (아무리 늦어도 20-30번안에 엄청나게 큰 숫자여도 금방찾아) => 인덱스
// 인덱스를걸때 -> nickname도 인덱스 걸어놓으면 되지않아?? -> 반은 맞고 반은 틀린말이야
// => 왜 와이?? nickname은 string이고 id는 number기 때문이지
// 컴퓨터가 정렬을 하려면 얘가 얘보다 큰지 작은지를 알아야하는데 기본적으로
// 이 과정에서 string은 그게 오래걸려 number보다
// number (integer 4바이트잖아)
// "윤승휘지존검사" (x바이트 * x바이트 * x바이트 * x바이트 * x바이트 * x바이트 * x바이트)
// 문자열 인코딩에 따라 문자열 바이트수가 달라
// ASCII, 유니코드
// ASCII (문자가 256개 밖에없어 문자하나에 1바이트야)

// 2번은 이분탐색이 안돼. 무조건 풀스캔이야 (존나 비효율적 컴퓨터 입장에서)
// 그냥 제일 큰숫자보다 +1해서 넣으면돼 그냥
// 어차피 빈숫자는 인덱싱에 영향을 전혀 안미치고, id는 보통 bigint라고해서
// 2000억인가? 2조인가 까지 쌓일수 있게 돼있기때문에 (int를 보통써 어차피 다 쌓일때쯤 바꾸면돼 타입)
// int만해도 21억이잖아 (웬만한 서비스가지고는 힘들어)
// 네이버에 카페댓글(bigint) 네이버도 유저id는 아직 21억개가 안될거다.. 이말이지
// 니가짠 서버를 돌리려면 천만원짜리컴터가필요해 (한달에)
// 어떤 좆고수가 짠 서버를 돌리려면 200만원짜리컴터가필요해 ( 한달에)

// n * n * n(시간복잡도 10000 * 10000 * 10000 => 1000000000000)
// n * 2 (시간복잡도 10000 * 2 => 20000)
// 브루트포스 알고리즘 (막무가내로 쑤셔넣기)
// 공간복잡도

const a = [0, 1, 3, 4, 5, 7, 8, 9, 10, 10230123];

a[10230123 + 1]; //10230123 크기만큼 써야돼 잘못스면 엄청나게 비효율적 -> cpu를 적게쓰는대신에
// -> ? 메모리를 많이써 얘는 cpu한테 일을 줄이는 대신에 메모리를 너무 많이써서 쓰레기 프로그램
// cpu가 일을 4번만 하면되는데, 메모리는 11개만 쓰고 (11 * 4 byte) => 44byte
// 10230123 * 4 byte + cpu가 일을 1번만하면돼

export const deleteUser = async (conn: Pool, id: number) => {
  try {
    const result = await conn.execute(`DELETE user WHERE id=${id}`);
    return makeSuccessResponse("delete");
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
