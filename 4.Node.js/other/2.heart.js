function heart(line) {
  //하트의 머리부분
  for (let i = 1; i <= line; i++) {
    let str = "";
    let star = "";
    let space = "";
    for (let j = line - i; j >= 0; j--) {
      space += " ";
    }
    for (let j = 0; j < i; j++) {
      star += "*";
    }
    for (let j = 0; j < i - 1; j++) {
      star += "*";
    }
    str += space + star;
    //하트 두 쪽으로 나눠서 위가 왼쪽 아래가 오른쪽
    star = "";
    space = "";
    for (let j = line - i; j >= 1; j--) {
      space += " ";
    }
    for (let j = line - i; j >= 0; j--) {
      space += " ";
    }
    for (let j = 0; j < i; j++) {
      star += "*";
    }
    for (let j = 1; j < i; j++) {
      star += "*";
    }
    //str에 따로 담아서 console.log로 출력하는 방법이 좋겠음
    str += space + star;
    console.log(str);
  }

  //피라미드 뒤집고 줄 수를 2배 해줌
  line *= 2;
  //중간 줄.
  //   let star = "";
  //   for (let j = 0; j < line * 2 + 1; j++) {
  //     star += "*";
  //   }
  //   console.log(star);
  // 중간줄 없어도 됨 다시 지움

  // 하트 아래부분
  for (let i = 0; i < line + 2; i++) {
    //1,3,5,7,9순으로 나오도록...
    if (i % 2 !== 0) continue;
    let star = "";
    let space = "";
    for (let j = line - i; j >= 0; j--) {
      star += "*";
    }
    for (let j = line - i; j >= 0 + 1; j--) {
      star += "*";
    }
    for (let j = 0; j < i; j++) {
      space += " ";
    }
    console.log(space + star);
  }
}

heart(2);
