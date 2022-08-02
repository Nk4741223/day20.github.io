'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// 備考
//  0:なし
//  1:黒
// -1:白
//  2:壁

// 関数以外の宣言--------------------------

// 設定値の宣言
const xSquareNum = 4;
const ySquareNum = xSquareNum;
let currentColor = 1; //先手

// マスの宣言
const xyState = [
  [2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 2],
  [2, 0, -1, 1, 0, 2],
  [2, 0, 1, -1, 0, 2],
  [2, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2]
];

// マスの１次元配列化（[1]～[16]）
const numState = [2]; //numState[0]は使わない → 壁の意味の２を代入

// 一般の宣言
const stage = document.getElementById("stage");
const squareTemplate = document.getElementById("square-template");
const currentTurnText = document.getElementById("currentTurn");
const startText = document.getElementById("start-text");

// 終了時の宣言
const playerText = document.getElementById("playerText");
const gameEndText = document.getElementById("gameEnd");
const blackPoint = document.getElementById("blackPoint");
const whitePoint = document.getElementById("whitePoint");
const winner = document.getElementById("winner");
const winText = document.getElementById("winText");

// Passボタンの宣言
const passButton = document.getElementById("pass-button");

// 押したときの処理
passButton.addEventListener('click', function() { 
  changePlayer(); //プレイヤー交代
  passButton.style.display = "none"; // PASSボタンを非表示

  // さらにパスならゲーム終了
  if (getIsPass() === true) {
    doGameEnd();
  }
});


// サブ実行関数の宣言--------------------

// 終了の実行関数
function doGameEnd() {
    let blackSum = 0;
    let whiteSum = 0;

    //ポイント集計
    for (let i = 1; i <= xSquareNum * ySquareNum; i++) {
      if (numState[i] === 1) {
        blackSum++;
      } else if (numState[i] === -1){
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

    // 表示
    playerText.textContent = "ゲームが終了しました";
    playerText.style.fontSize = 23 + "px";
    blackPoint.textContent = blackSum;
    whitePoint.textContent = whiteSum;
    gameEndText.style.display = "block";
}

// プレイヤー交代関数
function changePlayer() {
  // ×-1でプレイヤー交代（黒:1 白:-1）
  currentColor *= -1;

  if (currentColor === 1) {
    currentTurnText.textContent = "黒";
    currentTurnText.style.color = "black";
  } else {
    currentTurnText.textContent = "白";
    currentTurnText.style.color = "white";
  }
}

// マス裏返し関数
function flipStone(nowX, nowY, index) {

  // 自分の石を裏返す
  xyState[nowX][nowY] = currentColor;
  numState[index] = currentColor;
  if (currentColor === 1) {
    document.querySelector(`[num = '${index}']`).style.backgroundColor ="black"
  } else if (currentColor === -1) {
    document.querySelector(`[num = '${index}']`).style.backgroundColor ="white"
  }

  // 相手の石を裏返す
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
}


// チェック関数------------------

// 裏返せるかチェック関数
function getIsCanflip(X, Y) {

  // 初期値
  let isCanflip = false;

  // ひっくり返し
  // → x++
  if (xyState[X + 1][Y] === -currentColor) { //となりが相手の石
    if (xyState[X + 2][Y] === -currentColor) {
      if (xyState[X + 3][Y] === currentColor) {
        // 〇〇●
        isCanflip = true;
      }
    } else if (xyState[X + 2][Y] === currentColor) {
      // 〇●
      isCanflip = true;
    }
  }

  // →↓ x++ y++
  if (xyState[X + 1][Y + 1] === -currentColor) { //となりが相手の石
    if (xyState[X + 2][Y + 2] === -currentColor) {
      if (xyState[X + 3][Y + 3] === currentColor) {
        // 〇〇●
        isCanflip = true;
      }
    } else if (xyState[X + 2][Y + 2] === currentColor) {
      // 〇●
      isCanflip = true;
    }
  }

  // ↓ y++
  if (xyState[X][Y + 1] === -currentColor) { //となりが相手の石
    if (xyState[X][Y + 2] === -currentColor) {
      if (xyState[X][Y + 3] === currentColor) {
        // 〇〇●
        isCanflip = true;
      }
    } else if (xyState[X][Y + 2] === currentColor) {
      // 〇●
      isCanflip = true;
    }
  }

    // ←↓ x-- y++
  if (xyState[X - 1][Y + 1] === -currentColor) { //となりが相手の石
    if (xyState[X - 2][Y + 2] === -currentColor) {
      if (xyState[X - 3][Y + 3] === currentColor) {
        // 〇〇●
        isCanflip = true;
      }
    } else if (xyState[X - 2][Y + 2] === currentColor) {
      // 〇●
      isCanflip = true;
    }
  }

  // ← x-- 
  if (xyState[X - 1][Y] === -currentColor) { //となりが相手の石
    if (xyState[X - 2][Y] === -currentColor) {
      if (xyState[X - 3][Y] === currentColor) {
        // 〇〇●
        isCanflip = true;
      }
    } else if (xyState[X - 2][Y] === currentColor) {
      // 〇●
      isCanflip = true;
    }
  }

  // ← x-- ↑y--
  if (xyState[X - 1][Y - 1] === -currentColor) { //となりが相手の石
    if (xyState[X - 2][Y - 2] === -currentColor) {
      if (xyState[X - 3][Y - 3] === currentColor) {
        // 〇〇●
        isCanflip = true;
      }
    } else if (xyState[X - 2][Y - 2] === currentColor) {
      // 〇●
      isCanflip = true;
    }
  }


  // ↑y--
  if (xyState[X][Y - 1] === -currentColor) { //となりが相手の石
    if (xyState[X][Y - 2] === -currentColor) {
      if (xyState[X][Y - 3] === currentColor) {
        // 〇〇●
        isCanflip = true;
      }
    } else if (xyState[X][Y - 2] === currentColor) {
      // 〇●
      isCanflip = true;
    }
  }

  // ↑→ x++ y--
  if (xyState[X + 1][Y - 1] === -currentColor) { //となりが相手の石
    if (xyState[X + 2][Y - 2] === -currentColor) {
      if (xyState[X + 3][Y - 3] === currentColor) {
        // 〇〇●
        isCanflip = true;
      }
    } else if (xyState[X + 2][Y - 2] === currentColor) {
      // 〇●
      isCanflip = true;
    }
  }

  return isCanflip;
}

// マス埋まっているかチェック関数
function getIsPass() {
  let isPass = true;
  
  // 一つでもひっくり返せるところがあれば
  for (let j = 1; j <= ySquareNum; j++) {
    for (let i = 1; i <= xSquareNum; i++) {
      // 置けて、ひっくり返せる
      if (xyState[i][j] === 0 && getIsCanflip(i, j) === true) {
        isPass = false;
      }
    }
  }
  
  return isPass;
}

// 終了チェック関数
function isCheckFull() {
  for (let i = 1; i <= xSquareNum * ySquareNum; i++) {
    if (numState[i] === 0) {
      return false;
    }
  }
  return true;
}


// メイン関数------------------

// クリック時の実行関数
function clickSquare(nowX, nowY, index) {

  // 置けない位置なら、アラート表示
  if (numState[index] !== 0 || getIsCanflip(nowX, nowY) === false) {
    alert("ここには置けません！");
    return; //以降の処理をさせない
  }

  // 開始時テキストを隠す
  startText.style.display = "none";

  // 石を裏返す
  flipStone(nowX, nowY, index);

  //ゲーム終了かチェック 
  if (isCheckFull() === true) {
    doGameEnd();
    return; //以降の処理はさせない
  }

  // プレイヤー交代
  changePlayer();

  // パスかチェック
  if (getIsPass() === true) {
    passButton.style.display = "block"; // PASSボタンを表示
  }
}

// 開始の実行関数
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
        stone.setAttribute("num", (j - 1) * xSquareNum + i); //インデックス番号の属性追加
        numState.push(xyState[i][j]); //状態を１次元配列にも追加

        // クリックされたら実行
        square.addEventListener('click', function() { 
          clickSquare(i, j, (j - 1) * xSquareNum + i);
        });
      }
    }
  }
}
  
// 開始
createSquares();

