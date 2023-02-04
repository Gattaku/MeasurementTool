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
    let clickIndex=0;
    let x_start =0;
    let y_start =0;
    let x_end =0;
    let y_end =0;
    // let position_index1 =[x_start ,y_start,x_end, y_end, 0,0,0,0]; //[x_start ,y_start,x_end, y_end, クリックされた回数,ラベルのｘ、ラベルのｙ,move_triger]
    // let position_index2 =[[x_start ,y_start,x_end, y_end, 0,0,0,0]];
    // let init_position1 = [x_start ,y_start,x_end, y_end,0];
    // let init_position2 = [x_start ,y_start,x_end, y_end,0];
    const ballRadius = 4;
    //*******************************↑↑↑↑↑ */
    //***測定結果を書くための変数/定数 */
    let targetVal = 100;
    let measurementCnt =0;
    // let move_index_number =[];
    // let set_move_index_number;
    // let measure_data_label_cnt = 0;
    //********************************** */
    //*****Canvasサイズを全体にするための定数 */
    const canvas_width = document.documentElement.clientWidth - 38;
    const canvas_height = document.documentElement.clientHeight - 10;
    //************************************************************ */
    //**********************canvasのサイズをwindowサイズに合わせる関数******************************
    function fitCanvasSize() {
      // Canvas のサイズをクライアントサイズに合わせる
      $can.width = canvas_width;
      $can.height = canvas_height;
    
    }  
    fitCanvasSize();
    window.onresize = fitCanvasSize;
    //**************************************************************************************** */
  
  




}) ();