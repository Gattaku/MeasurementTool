(()=>{//即時間数に入れる

const arg1 = {capture: false, once: false, passive: false};
const $can = document.getElementById('c1');
const $ctx = $can.getContext('2d');
const $doc = document;
const $Label = $doc.getElementsByClassName('test');
const $clear = $doc.getElementsByClassName('allClear');
const $popUp = $doc.getElementsByClassName('hContent popUp');
const $initLabel = $doc.getElementsByClassName('initSettingLabel');
const $popLabel = $doc.getElementsByClassName('popUpLabel');
const $setDir = $doc.getElementsByClassName('selectDirect');
const $initVal = $doc.getElementById('initialValue');
const $SetButton = $doc.getElementsByClassName('buttonSettingContent');
const $MeasureTrriger = $doc.getElementsByClassName('MeasureTriger');
const $CancelTrriger = $doc.getElementsByClassName('cancelTrriger');
const $initSet =$doc.getElementsByClassName('initialSetting');
const $canLabel =$doc.getElementsByClassName('canvasLabel');
//クリックイベントの情報を残しておく関数
let clickCnt = 0; //クリックの回数をカウント（偶数回の時にcanvasへのdrawをする)
let positionInfo = []; //文字列として各測定点を格納する ("xStart yStart xEnd yEnd");


//*初期設定、測定トリガー用******************
const ACTIVATE_='is-active';
// let measure_trriger = 0;
// let init_setting = 0;
// let init_click_index = 0;
// let init_direction='null';
// let init_value_;
// let init_prevent_index = 0;
// let lean = 0;
//*************************** */
//測定結果格納用//
const $measure = document.getElementsByClassName('MeasureLabel');
const $measureLen = $measure.length;
//*******************↑↑↑↑↑ */
//画像の情報を保管しておく変数↓↓↓↓↓
let judgeImg =0; // 0->まだ画像登録なし。1->すでに画像登録あり。
let img0 = null;
let img1 = null;
let files = null;
let file = null;
let reader = null;
let item = null;
let img1EventTarget = null;
//**************************↑↑↑↑↑*/
//****線を書くために必要な変数/定数↓↓↓↓↓ */
const ballRadius = 4;
let measureLineColor = "#ff0000"; //測定線のカラーを選択
let measurePointCircle = "#ff0000"; //測定点のカラーを選択
//*******************************↑↑↑↑↑ */
//***測定結果を書くための変数/定数 */
let targetVal = 100;
let measurementCnt =0;
// let move_index_number =[];
// let set_move_index_number;
// let measure_data_label_cnt = 0;
//********************************** */
//*****Canvasサイズを全体にするための定数 */
const canvasWidth = document.documentElement.clientWidth - 38;
const canvasHeight = document.documentElement.clientHeight - 10;
//************************************************************ */
//**********************canvasのサイズをwindowサイズに合わせる関数******************************
function fitCanvasSize() {
  // Canvas のサイズをクライアントサイズに合わせる
  $can.width = canvasWidth;
  $can.height = canvasHeight;
}  
fitCanvasSize();
window.onresize = fitCanvasSize;
//**************************************************************************************** */


//関数類;
//①ドラッグ＆ドロップで画像を貼り付ける関数
//②コピペで貼り付ける関数
//③キャンバス上をクリックした時の座標（x,y）を取得する関数
//④取得した座標をもとにキャンバス上に線と〇をうつ関数

//************対象の画像をキャンバス上にセッティングする **************************/
//ドラッグ’ドロップのコード
const dragOverHandler = {
    handleEvent: (event) => {
      judge_img=0; //再貼り付けする際にカウンターを０に戻すための再定義
      event.dataTransfer.dropEffect = 'copy';
      event.preventDefault();
    }
  };  $can.addEventListener('dragover', dragOverHandler, arg1);        

  const dropHandler =(event)=> {
    files = event.dataTransfer.files;
    if (files.length === 1) {
      file = files[0];
      reader = new FileReader();
      reader.addEventListener('load', loadReaderHandler, arg1);
      reader.readAsDataURL(file);
    }
    event.preventDefault();    
  };  $can.addEventListener('drop',(arg1)=>{dropHandler(event);});

const drawCanvasHandler = {
    handleEvent: (event) => {
      if (judgeImg ===0){
        img0 = event.target;
        $ctx.drawImage(img0, 0, 0);
        $ctx.save();
        judgeImg=1; //命令の最後にジャッジカウントを１にして、再貼り付け可能にしておく
      } else if (judgeImg ===1){
        $ctx.drawImage(img0, 0, 0);
        $ctx.save();
      };   
      $canLabel[0].style.display = 'none'   
    }
};

const loadReaderHandler = {
    handleEvent: (event) => {
      if (judgeImg === 0){
        img1 = new Image();
        img1.addEventListener('load', drawCanvasHandler, arg1);
        img1EventTarget = img1.src = event.target.result;
      } else if (judgeImg === 1){
        img1.addEventListener('load', drawCanvasHandler,arg1);
        img1.src = img1EventTarget;
      };     
    }
};

//*********************コピペで画像を貼り付けるコード *******************
document.onpaste = function(pasteEvent) {
  judgeImg=0; //再貼り付けする際にカウンターを０に戻すための再定義
  item = pasteEvent.clipboardData.items[0];
  if (item.type.indexOf("image") === 0){
    file = item.getAsFile();
    reader = new FileReader();
    reader.addEventListener('load', loadReaderHandler, arg1);
    reader.readAsDataURL(file);
  }
}
//*******************************************************************
//********************************************************************************** */

//*③キャンバス上をクリックした時の座標（x,y）を取得する関数
/* @param {event} クリックした際のイベント全部取ってくる
   @return {str} クリック座標のx yを文字列として返却
 */
const makeCanCordinate = (event) => {
  const revice = event.target.getBoundingClientRect();//画面絶対座標に対するCanvas位置ずれを補正するための定数
  const x = event.clientX-revice.left;
  const y= event.clientY-revice.top;
  // const cordinate = [x,y];
  return `${x} ${y}`;
}

// ④取得した座標をもとにキャンバス上に線と〇をうつ関数
const canDraw = window.onload = (arrayData) => {
  switch (judgeImg){
    case 0:
      //何もしない
      break;
    case 1:
      img1.src = img1EventTarget;
      img1.onload = () => {
        $ctx.clearRect(0, 0,canvasWidth,canvasHeight);
        $ctx.drawImage(img0, 0, 0)
        let lineNum = arrayData.length;
        if (clickCnt % 2 !==0){
          lineNum += -1;
        }
        for (let index = 0 ;index < lineNum ; index++){
          const tempPosition = arrayData[index].trim().split(" ")
          $ctx.beginPath () ;
          $ctx.moveTo( parseInt(tempPosition[0])-ballRadius/2, parseInt(tempPosition[1])-ballRadius/2) ;
          $ctx.lineTo( parseInt(tempPosition[2]-ballRadius/2), parseInt(tempPosition[3])-ballRadius/2) ;
          $ctx.strokeStyle = measureLineColor ;
          $ctx.lineWidth = 3 ;
          $ctx.stroke();
        }
        for (let index = 0; index < lineNum ; index++) {
          const tempPosition = arrayData[index].trim().split(" ")
          $ctx.beginPath();
          $ctx.arc(parseInt(tempPosition[0])-ballRadius/2, parseInt(tempPosition[1])-ballRadius/2, ballRadius, 0, Math.PI*2);
          $ctx.arc(parseInt(tempPosition[2])-ballRadius/2, parseInt(tempPosition[3])-ballRadius/2, ballRadius, 0, Math.PI*2);
          $ctx.fillStyle = measurePointCircle;
          $ctx.fill();
          $ctx.closePath();
        }
        if (clickCnt % 2 !== 0) { //もしも奇数回の場合は、開始点の情報だけ存在するため、その点を打つ
          const tempPosition = arrayData[lineNum].trim().split(" ")
          $ctx.beginPath();
          $ctx.arc(parseInt(tempPosition[0])-ballRadius/2, parseInt(tempPosition[1])-ballRadius/2, ballRadius, 0, Math.PI*2);
          $ctx.fillStyle = measurePointCircle;
          $ctx.fill();
          $ctx.closePath();
        }
      }
      break;
  }
}



//キャンバス上をクリックすると発生するイベント
$can.addEventListener('click', (e) => {
  switch (judgeImg){
    case 0:
      //何もしない
      break;
    case 1:
      clickCnt++; //〇〇回目として情報を残しておく
      const position = makeCanCordinate (e);
      if (clickCnt % 2 ===0) {
        positionInfo[positionInfo.length-1] = `${positionInfo[positionInfo.length-1]} ${position}`;
      } else {
        positionInfo.push(position);
      }
      canDraw(positionInfo);
      console.log(positionInfo);
      break;
    default:
      break;
  }
});




}) ();