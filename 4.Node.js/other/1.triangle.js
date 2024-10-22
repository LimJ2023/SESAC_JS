function mytriangle() {
  console.log(" /\\");
  console.log("/__\\");

  console.log("  /\\");
  console.log(" /  \\");
  console.log("/____\\");

  console.log("   /\\");
  console.log("  /  \\");
  console.log(" /    \\");
  console.log("/______\\");
}
function mytriangleF(num) {
  let space = num;
  let line = "";
  console.log(`${space}/\\`);

  for (let i = 0; i < num; i++) {}
}

function leftTriangle1() {
  for (let i = 1; i <= 5; i++) {
    let star = "";
    for (let j = 0; j < i; j++) {
      star += "*";
    }
    console.log(star);
  }
}

function leftTriangle2() {
  for (let i = 5; i >= 1; i--) {
    let star = "";
    for (let j = 0; j < i; j++) {
      star += "*";
    }
    console.log(star);
  }
}
function righttriangle1F(line) {
  for (let i = 1; i <= line; i++) {
    let star = "";
    let space = "";
    for (let j = line - i; j >= 0; j--) {
      space += " ";
    }
    for (let j = 0; j < i; j++) {
      star += "*";
    }
    console.log(space + star);
  }
}
function righttriangle2F(line) {
  for (let i = 1; i <= line; i++) {
    let star = "";
    let space = "";
    for (let j = line - i; j >= 0; j--) {
      star += "*";
    }
    for (let j = 0; j < i; j++) {
      space += " ";
    }
    console.log(space + star);
  }
}
function pyramid1F(line) {
  for (let i = 1; i <= line; i++) {
    let star = "";
    let space = "";
    //공백은 4칸,3칸,2칸,1칸 순
    for (let j = line - i; j >= 0; j--) {
      space += " ";
    }
    //별은 1,2,3,4,5 + 오른편이 0,1,2,3,4...
    for (let j = 0; j < i; j++) {
      star += "*";
    }
    //얘는 한 순회를 건너뛰어야 함
    for (let j = 1; j < i; j++) {
      star += "*";
    }
    console.log(space + star);
  }
}
function pyramid2F(line) {
  for (let i = 1; i <= line; i++) {
    let star = "";
    let space = "";
    for (let j = line - i; j >= 0; j--) {
      star += "*";
    }
    for (let j = line; j >= 1 + i; j--) {
      star += "*";
    }
    for (let j = 0; j < i; j++) {
      space += " ";
    }
    console.log(space + star);
  }
}

function leftTriangleF1(line) {
  for (let i = 1; i <= line; i++) {
    let star = "";
    for (let j = 0; j < i; j++) {
      star += "*";
    }
    console.log(star);
  }
}
function leftTriangle2F(line) {
  for (let i = line; i >= 1; i--) {
    let star = "";
    for (let j = 0; j < i; j++) {
      star += "*";
    }
    console.log(star);
  }
}
// leftTriangle1();
// leftTriangle2();
// righttriangle1();
// righttriangle2();
// pyramid1();
// pyramid2();
// leftTriangleF1(4);
// leftTriangle2F(4);
pyramid1F(10);
pyramid2F(10);
