'use strict'
// 1行目に記載している 'use strict' は削除しないでください


// 設定
const xSquareNum = 4;
const ySquareNum = xSquareNum;
let currentColor = 1; //先手は黒

const xyState = [
  [2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 2],
  [2, 0, -1, 1, 0, 2],
  [2, 0, 1, -1, 0, 2],
  [2, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2]
];

// マス目の宣言
const stage = document.getElementById("stage");
const squareTemplate = document.getElementById("square-template");
const numState = [2]; //numState[0]は使わない → 壁の意味の２を代入
const currentTurnText = document.getElementById("currentTurn");


// 開始時の宣言
const startText = document.getElementById("start-text");

// 終了時の宣言
let endFrag; 
const playerText = document.getElementById("playerText");
const gameEndText = document.getElementById("gameEnd");
const blackPoint = document.getElementById("blackPoint");
const whitePoint = document.getElementById("whitePoint");
const winner = document.getElementById("winner");
const winText = document.getElementById("winText");


// 終了チェック関数
function checkGameEnd() {
  // 終了チェック
  for (let i = 1; i <= xSquareNum * ySquareNum; i++) {
    if (numState[i] === 0) {
      endFrag = false;
    }
  }

  // ゲーム終了なら
  if (endFrag === true) {
    let blackSum = 0;
    let whiteSum = 0;

    //ポイント集計
    for (let i = 0; i < xSquareNum * ySquareNum; i++) {
      if (numState[i] === 1) {
        blackSum++;
      } else {
        whiteSum++;
      }
    }

    // 勝敗判定
    if (blackSum > whiteSum) {
      winner.textContent = "黒";
      winner.style.color = "black";
    } else if (blackSum < whiteSum) {
      winner.textContent = "白";
      winner.style.color = "white";
    } else {
      winner.textContent = "引き分け";
      winText.textContent = "";
    }

    // テキスト表示
    playerText.textContent = "ゲームが終了しました。";
    playerText.style.fontSize = 23 + "px";
    // playerText.style.color = "yellow";
    blackPoint.textContent = blackSum;
    whitePoint.textContent = whiteSum;
    gameEndText.style.display = "block";
  }

  endFrag = true; //初期化
}


// クリック時の実行関数
function clickSquare(nowX, nowY, index) {

  // 置けない注意
  if (numState[index] !== 0) {
    alert("ここには置けません！");
    // alert(numState[index]);
    return; //以降の処理をさせない
  }

  startText.style.display = "none";

  // 自分の石を置く
  xyState[nowX][nowY] = currentColor;
  numState[index] = currentColor;
  if (currentColor === 1) {
    document.querySelector(`[num = '${index}']`).style.backgroundColor ="black"
  } else if (currentColor === -1) {
    document.querySelector(`[num = '${index}']`).style.backgroundColor ="white"
  }

  // ひっくり返し
  // → x++
  if (xyState[nowX + 1][nowY] === -currentColor) { //となりが相手の石
    if (xyState[nowX + 2][nowY] === -currentColor) {
      if (xyState[nowX + 3][nowY] === currentColor) {

        // 〇〇●
        xyState[nowX + 1][nowY] *= -1;
        xyState[nowX + 2][nowY] *= -1;
        
        // マス色を変更
        const n1 = (nowY - 1) * xSquareNum + (nowX + 1);
        const n2 = (nowY - 1) * xSquareNum + (nowX + 2);
        numState[n1] *= -1;
        numState[n2] *= -1;
  
        if (numState[n1] === 1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
        } else if (numState[n1] === -1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
        }

        if (numState[n2] === 1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="black"
        } else if (numState[n2] === -1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="white"
        }

      }
    } else if (xyState[nowX + 2][nowY] === currentColor) {

      // 〇●
      xyState[nowX + 1][nowY] *= -1;

      // マス色を変更
      const n1 = (nowY - 1) * xSquareNum + (nowX + 1);
      numState[n1] *= -1;

      if (numState[n1] === 1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
      } else if (numState[n1] === -1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
      }

    }
  }

  // →↓ x++ y++
  if (xyState[nowX + 1][nowY + 1] === -currentColor) { //となりが相手の石
    if (xyState[nowX + 2][nowY + 2] === -currentColor) {
      if (xyState[nowX + 3][nowY + 3] === currentColor) {

        // 〇〇●
        xyState[nowX + 1][nowY + 1] *= -1;
        xyState[nowX + 2][nowY + 2] *= -1;
        
        // マス色を変更
        const n1 = (nowY + 1 - 1) * xSquareNum + (nowX + 1);
        const n2 = (nowY + 2 - 1) * xSquareNum + (nowX + 2);
        numState[n1] *= -1;
        numState[n2] *= -1;
  
        if (numState[n1] === 1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
        } else if (numState[n1] === -1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
        }

        if (numState[n2] === 1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="black"
        } else if (numState[n2] === -1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="white"
        }

      }
    } else if (xyState[nowX + 2][nowY + 2] === currentColor) {

      // 〇●
      xyState[nowX + 1][nowY + 1] *= -1;

      // マス色を変更
      const n1 = (nowY + 1 - 1) * xSquareNum + (nowX + 1);
      numState[n1] *= -1;

      if (numState[n1] === 1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
      } else if (numState[n1] === -1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
      }

    }
  }

  // ↓ y++
  if (xyState[nowX][nowY + 1] === -currentColor) { //となりが相手の石
    if (xyState[nowX][nowY + 2] === -currentColor) {
      if (xyState[nowX][nowY + 3] === currentColor) {

        // 〇〇●
        xyState[nowX][nowY + 1] *= -1;
        xyState[nowX][nowY + 2] *= -1;
        
        // マス色を変更
        const n1 = (nowY + 1 - 1) * xSquareNum + (nowX);
        const n2 = (nowY + 2 - 1) * xSquareNum + (nowX);
        numState[n1] *= -1;
        numState[n2] *= -1;

        if (numState[n1] === 1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
        } else if (numState[n1] === -1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
        }

        if (numState[n2] === 1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="black"
        } else if (numState[n2] === -1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="white"
        }

      }
    } else if (xyState[nowX][nowY + 2] === currentColor) {

      // 〇●
      xyState[nowX][nowY + 1] *= -1;

      // マス色を変更
      const n1 = (nowY + 1 - 1) * xSquareNum + (nowX);
      numState[n1] *= -1;

      if (numState[n1] === 1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
      } else if (numState[n1] === -1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
      }
    }
  }

    // ←↓ x-- y++
  if (xyState[nowX - 1][nowY + 1] === -currentColor) { //となりが相手の石
    if (xyState[nowX - 2][nowY + 2] === -currentColor) {
      if (xyState[nowX - 3][nowY + 3] === currentColor) {

        // 〇〇●
        xyState[nowX - 1][nowY + 1] *= -1;
        xyState[nowX - 2][nowY + 2] *= -1;
        
        // マス色を変更
        const n1 = (nowY + 1 - 1) * xSquareNum + (nowX - 1);
        const n2 = (nowY + 2 - 1) * xSquareNum + (nowX - 2);
        numState[n1] *= -1;
        numState[n2] *= -1;
  
        if (numState[n1] === 1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
        } else if (numState[n1] === -1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
        }

        if (numState[n2] === 1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="black"
        } else if (numState[n2] === -1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="white"
        }

      }
    } else if (xyState[nowX - 2][nowY + 2] === currentColor) {

      // 〇●
      xyState[nowX - 1][nowY + 1] *= -1;

      // マス色を変更
      const n1 = (nowY + 1 - 1) * xSquareNum + (nowX - 1);
      numState[n1] *= -1;

      if (numState[n1] === 1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
      } else if (numState[n1] === -1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
      }

    }
  }


  // ← x-- 
  if (xyState[nowX - 1][nowY] === -currentColor) { //となりが相手の石
    if (xyState[nowX - 2][nowY] === -currentColor) {
      if (xyState[nowX - 3][nowY] === currentColor) {

        // 〇〇●
        xyState[nowX - 1][nowY] *= -1;
        xyState[nowX - 2][nowY] *= -1;
        
        // マス色を変更
        const n1 = (nowY - 1) * xSquareNum + (nowX - 1);
        const n2 = (nowY - 1) * xSquareNum + (nowX - 2);
        numState[n1] *= -1;
        numState[n2] *= -1;
  
        if (numState[n1] === 1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
        } else if (numState[n1] === -1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
        }

        if (numState[n2] === 1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="black"
        } else if (numState[n2] === -1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="white"
        }

      }
    } else if (xyState[nowX - 2][nowY] === currentColor) {

      // 〇●
      xyState[nowX - 1][nowY] *= -1;

      // マス色を変更
      const n1 = (nowY - 1) * xSquareNum + (nowX - 1);
      numState[n1] *= -1;

      if (numState[n1] === 1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
      } else if (numState[n1] === -1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
      }

    }
  }

  // ← x-- ↑y--
  if (xyState[nowX - 1][nowY - 1] === -currentColor) { //となりが相手の石
    if (xyState[nowX - 2][nowY - 2] === -currentColor) {
      if (xyState[nowX - 3][nowY - 3] === currentColor) {

        // 〇〇●
        xyState[nowX - 1][nowY - 1] *= -1;
        xyState[nowX - 2][nowY - 2] *= -1;
        
        // マス色を変更
        const n1 = (nowY - 1 - 1) * xSquareNum + (nowX - 1);
        const n2 = (nowY - 2 - 1) * xSquareNum + (nowX - 2);
        numState[n1] *= -1;
        numState[n2] *= -1;
  
        if (numState[n1] === 1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
        } else if (numState[n1] === -1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
        }

        if (numState[n2] === 1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="black"
        } else if (numState[n2] === -1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="white"
        }

      }
    } else if (xyState[nowX - 2][nowY - 2] === currentColor) {

      // 〇●
      xyState[nowX - 1][nowY - 1] *= -1;

      // マス色を変更
      const n1 = (nowY - 1 - 1) * xSquareNum + (nowX - 1);
      numState[n1] *= -1;

      if (numState[n1] === 1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
      } else if (numState[n1] === -1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
      }

    }
  }


  // ↑y--
  if (xyState[nowX][nowY - 1] === -currentColor) { //となりが相手の石
    if (xyState[nowX][nowY - 2] === -currentColor) {
      if (xyState[nowX][nowY - 3] === currentColor) {

        // 〇〇●
        xyState[nowX][nowY - 1] *= -1;
        xyState[nowX][nowY - 2] *= -1;
        
        // マス色を変更
        const n1 = (nowY - 1 - 1) * xSquareNum + (nowX);
        const n2 = (nowY - 2 - 1) * xSquareNum + (nowX);
        numState[n1] *= -1;
        numState[n2] *= -1;
  
        if (numState[n1] === 1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
        } else if (numState[n1] === -1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
        }

        if (numState[n2] === 1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="black"
        } else if (numState[n2] === -1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="white"
        }

      }
    } else if (xyState[nowX][nowY - 2] === currentColor) {

      // 〇●
      xyState[nowX][nowY - 1] *= -1;

      // マス色を変更
      const n1 = (nowY - 1 - 1) * xSquareNum + (nowX);
      numState[n1] *= -1;

      if (numState[n1] === 1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
      } else if (numState[n1] === -1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
      }

    }
  }

  // ↑→ x++ y--
  if (xyState[nowX + 1][nowY - 1] === -currentColor) { //となりが相手の石
    if (xyState[nowX + 2][nowY - 2] === -currentColor) {
      if (xyState[nowX + 3][nowY - 3] === currentColor) {

        // 〇〇●
        xyState[nowX + 1][nowY - 1] *= -1;
        xyState[nowX + 2][nowY - 2] *= -1;
        
        // マス色を変更
        const n1 = (nowY - 1 - 1) * xSquareNum + (nowX + 1);
        const n2 = (nowY - 2 - 1) * xSquareNum + (nowX + 2);
        numState[n1] *= -1;
        numState[n2] *= -1;
  
        if (numState[n1] === 1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
        } else if (numState[n1] === -1) {
          document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
        }

        if (numState[n2] === 1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="black"
        } else if (numState[n2] === -1) {
          document.querySelector(`[num = '${n2}']`).style.backgroundColor ="white"
        }

      }
    } else if (xyState[nowX + 2][nowY - 2] === currentColor) {

      // 〇●
      xyState[nowX + 1][nowY - 1] *= -1;

      // マス色を変更
      const n1 = (nowY - 1 - 1) * xSquareNum + (nowX + 1);
      numState[n1] *= -1;

      if (numState[n1] === 1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="black"
      } else if (numState[n1] === -1) {
        document.querySelector(`[num = '${n1}']`).style.backgroundColor ="white"
      }

    }
  }



  //ゲーム終了かチェック 
  checkGameEnd();

  // プレイヤー交代
  currentColor *= -1;
  if (currentColor === 1) {
    currentTurnText.textContent = "黒";
    currentTurnText.style.color = "black";
  } else {
    currentTurnText.textContent = "白";
    currentTurnText.style.color = "white";
  }
  
}


function createSquares() {
  for (let j = 0; j <= (ySquareNum + 1); j++) {
    for (let i = 0; i <= (xSquareNum + 1); i++) {

      // 壁以外のマスで、要素作成
      if (xyState[i][j] !== 2) {
        
        //テンプレート→盤上へコピー 
        const square = squareTemplate.cloneNode(true); //テンプレートから要素をクローン
        square.removeAttribute("id"); //テンプレート用のid属性を削除
        stage.appendChild(square); //盤に追加
        
        // 属性追加
        const stone = square.querySelector('.stone');

        if (xyState[i][j] === 1) {
          stone.style.backgroundColor ="black"
        } else if (xyState[i][j] === -1) {
          stone.style.backgroundColor ="white"
        }
        stone.setAttribute("num", (j - 1) * xSquareNum + i); //インデックス番号
        numState.push(xyState[i][j]); //初期値を配列に格納

        // クリックされたら実行
        square.addEventListener('click', function() {
          console.log(i, j, (j - 1) * xSquareNum + i);
          
          clickSquare(i, j, (j - 1) * xSquareNum + i);
        });
      }
    }
  }
}
  
// 開始
createSquares();
