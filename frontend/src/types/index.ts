export interface CurrentUserProps {
  isLogin: boolean;
  user_Uid: number;
  user_Id: string;
}
export interface Comment extends Rowable {
  postId: number;
  nickname: string;
  comment: string;
  date: string;
}

export interface Recipe extends Rowable {
  imgSrc: string;
  imgAlt: string;
  title: string;
  likes: number;
  category: string;
  recipe: string;
  date: string;
  writer: string;
  isHot?: boolean;
}

export interface CsItem extends Rowable {
  title: string;
  writer: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

export interface PlaceProps extends Rowable {
  imgSrc: string;
  imgAlt: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  isHot: boolean;
  date: string;
  writer: string;
}

export interface NewItem {
  imgSrc: string;
  imgArt: string;
  title: string;
  url: string;
  date: string;
}

export interface User extends Rowable {
  name: string; //회원 이름
  nickname: string; //회원 닉네임
  phone_number: string; //회원 휴대폰번호
  login_id: string; //회원 id
  login_password: string; // 회원비밀번호
  login_type: string; //유저인지 관리자인지 판단
  social_id: number; //네이버,카카오 로그인을 구분하기위해 사용
  created_at?: string; // 회원가입한 시간
  updated_at?: string; // 수정한 시간
  profile_img: string; //프로필 이미지
  profile_text?: string; // 프로필 소갯말
}

export interface Rowable {
  id: number;
}

export type Table = Rowable[];

// prefix , suffix

// is, has -> boolean
// should -> boolean

// on, handle -> callback function

// -able -> struct 구조를 만들 때 implement 구조를 만들때 자주 사용

export interface Printable {
  Print: () => void;
}

class Person implements Printable {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  Print() {
    console.log(
      `안녕하세요. 제이름은 ${this.name}이고, 제 나이는 ${this.age}입니다.`
    );
  }
}

class HighPerson extends Person implements Printable {
  money: number;

  constructor(name: string, age: number, money: number) {
    super(name, age);
    this.money = money;
  }
}
