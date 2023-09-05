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
  comments: number;
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
  email: string;
  nickname: string;
  status: string;
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
