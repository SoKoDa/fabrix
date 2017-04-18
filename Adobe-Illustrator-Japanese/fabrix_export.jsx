///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// Fabrix Script
// G-CODE-IMPORT PLUGIN for Adobe Illustrator
// (c) Hiroya Tanaka, Social Fabrication Lab, Keio University, Japan, 2016 - 2017
// 
// Project Official Website:  http://www.fabrix.design/ 
// 
// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//

//�����ݒ�
//
var xx = 0;
var yy = 0;
// F�l�̔{��
var trans  = 12;

//e�l����Βl�ł��邽�ߐώZ
var extrude = 0; 
var extrudetwo = 0; 
// ���x
var heatbed = 55;
var hotend = 195;
var hotendtwo = 160;

// ���g���N�g�̒���
var retract = 2; 

// �w�b�h�̐�
var extrudenum = 1;
function setTextQ() {
extrudenum = 1;
    }
function setTextR() {
extrudenum = 2;
    }

// �w�b�h�̐؂�ւ��ϐ�(E�̂܂�T0/T1 or A/B)
var headnum = 1;
function setTextO() {
headnum = 1;
    }
function setTextP() {
headnum = 2;
    }

// E�̒l�������v�Z
var eassign = 1;
function setTextS() {
eassign = 1;
    }
function setTextT() {
eassign = 2;
    }
function setTextU() {
eassign = 3;
    }

// E�𒷂��ɐ��`�Őݒ肷��ꍇ�̌W��
var eratio = 0.5;


// E�𒴏ڍאݒ肷��ꍇ�̃t�B�������g���a

var filament = 1.75

// E�𒴏ڍאݒ肷��ꍇ�̑w�̍���
var extrudeheight = 0.2;

// E�𒴏ڍאݒ肷��ꍇ�̑w�̕�
var extrudewidth = 0.42


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var saveFolder = actDoc.path;
//var actDocName = actDoc.name;
//var myFolder=Folder(app.activeDocument.path).selectDlg("Choose g-code output folder:");
//alert (myFolder + "/" + actDocName + ".gco");
//var saveFile = new File(myFolder + "/" + actDocName + ".gco");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var actDoc = activeDocument;
var saveFilen = File.saveDialog("Save filename (.gco/.gcode)");
saveFilen = saveFilen + ".gco";
var saveFile = new File(saveFilen);
var resultArr = new Array;

//���C���[�̑����𐔂���
var n = activeDocument.layers.length; 
var ns = activeDocument.layers[0].layers.length; 
//�p�X�̑��������߂�
var pObj1 = activeDocument.pathItems; 

// �����p�l��
// Reference: https://github.com/nvkelso/illustrator-scripts/blob/master/other-authors/jwundes/SelectPathsBySize.jsx
var dlg = new Window('dialog', 'G-CODE�ϊ��ݒ�p�l��'); 

dlg.location = [500,50];
var defaultValueA = 50;
var defaultValueB = 50;
var defaultValue1 = trans ; //F�W���@12 (*100= 1200)
var defaultValue3 = heatbed; //temparature
var defaultValue4 = hotend; //temparature
var defaultValue5 = hotendtwo; //temparature
var defaultValue7 = retract; //rectract
var defaultValue10 = eratio; //E�W���@0.5
var defaultValue11 = filament; //�t�B�������g��
var defaultValue12 = extrudeheight; //����w����
var defaultValue13 = extrudewidth; //�����



     dlg.alertBtnsPnl0 = dlg.add('group',undefined, 'Threshold:');
    (dlg.alertBtnsPnl0.titleEt = dlg.alertBtnsPnl0.add('edittext', [100,15,160,35], 0)).helpTip = "X"; 
     dlg.alertBtnsPnl0.titleEt.text = defaultValueA; 
    (dlg.alertBtnsPnl0.titleSt = dlg.alertBtnsPnl0.add('statictext', [10,15,360,35], '���_�V�t�gX )')).helpTip = "Pixels."; 
     dlg.alertBtnsPnl0.orientation='row';

     dlg.alertBtnsPnl1 = dlg.add('group',undefined, 'Threshold:');
    (dlg.alertBtnsPnl1.titleEt = dlg.alertBtnsPnl1.add('edittext', [100,15,160,35], 0)).helpTip = "Y"; 
     dlg.alertBtnsPnl1.titleEt.text = defaultValueB; 
    (dlg.alertBtnsPnl1.titleSt = dlg.alertBtnsPnl1.add('statictext', [10,15,360,35], '���_�V�t�gY ')).helpTip = "Pixels."; 
     dlg.alertBtnsPnl1.orientation='row';

     dlg.alertBtnsPnl2 = dlg.add('group',undefined, 'Threshold:');
    (dlg.alertBtnsPnl2.titleEt = dlg.alertBtnsPnl2.add('edittext', [100,15,160,35], 0)).helpTip = ""; 
     dlg.alertBtnsPnl2.titleEt.text = defaultValue1; 
    (dlg.alertBtnsPnl2.titleSt = dlg.alertBtnsPnl2.add('statictext', [10,15,360,35], '���̓����x��F(���x)�l�ɕϊ�����W��')).helpTip = "times"; 
     dlg.alertBtnsPnl2.orientation='row';
     
      dlg.alertBtnsPnl4 = dlg.add('group',undefined, 'Threshold:');
    (dlg.alertBtnsPnl4.titleEt = dlg.alertBtnsPnl4.add('edittext', [100,15,160,35], 0)).helpTip = ""; 
     dlg.alertBtnsPnl4.titleEt.text = defaultValue3; 
    (dlg.alertBtnsPnl4.titleSt = dlg.alertBtnsPnl4.add('statictext', [10,15,360,35], '�q�[�g�x�b�h�̉��x (M104)')).helpTip = "c"; 
     dlg.alertBtnsPnl4.orientation='row';
     
      dlg.alertBtnsPnl5 = dlg.add('group',undefined, 'Threshold:');
    (dlg.alertBtnsPnl5.titleEt = dlg.alertBtnsPnl5.add('edittext', [100,15,160,35], 0)).helpTip = ""; 
     dlg.alertBtnsPnl5.titleEt.text = defaultValue4; 
    (dlg.alertBtnsPnl5.titleSt = dlg.alertBtnsPnl5.add('statictext', [10,15,360,35],'�G�N�X�g���[�_1�̉��x  (T0)')).helpTip = "c"; 
     dlg.alertBtnsPnl5.orientation='row';
     
      dlg.alertBtnsPnl6 = dlg.add('group',undefined, 'Threshold:');
    (dlg.alertBtnsPnl6.titleEt = dlg.alertBtnsPnl6.add('edittext', [100,15,160,35], 0)).helpTip = ""; 
     dlg.alertBtnsPnl6.titleEt.text = defaultValue5; 
    (dlg.alertBtnsPnl6.titleSt = dlg.alertBtnsPnl6.add('statictext', [10,15,360,35],'�G�N�X�g���[�_2�̉��x(T1)')).helpTip = "c"; 
     dlg.alertBtnsPnl6.orientation='row';
    
     dlg.alertBtnsPnl7 = dlg.add('group',undefined, 'Threshold:');
    (dlg.alertBtnsPnl7.titleEt = dlg.alertBtnsPnl7.add('edittext', [100,15,160,35], 0)).helpTip = ""; 
     dlg.alertBtnsPnl7.titleEt.text = defaultValue7; 
    (dlg.alertBtnsPnl7.titleSt = dlg.alertBtnsPnl7.add('statictext', [10,15,360,35], '���g���N�g�̒��� (mm)')).helpTip = "times"; 
     dlg.alertBtnsPnl7.orientation='row';
	 
     dlg.alertBtnsPnl8 = dlg.add('group',undefined, 'Threshold:');
     dlg.dimsPnl8 = dlg.add('panel', undefined, '�G�N�X�g���[�_��'); 
     dlg.dimsPnl8.orientation='row';
    (dlg.dimsPnl8.selectQ = dlg.dimsPnl8.add('radiobutton', [5,115,180,135], '1�w�b�h' )).helpTip = ""; 
    (dlg.dimsPnl8.selectR = dlg.dimsPnl8.add('radiobutton', [5,140,180,160], '2�w�b�h' )).helpTip = "";


	dlg.dimsPnl8.selectQ.value = true; 
	dlg.dimsPnl8.selectQ.onClick= setTextQ;
	dlg.dimsPnl8.selectR.onClick= setTextR;


	(dlg.dimsPnl9 = dlg.add('panel', undefined, 'E�l�̌v�Z���@')).helpTip = "�����̒����ɔ�Ⴕ��E�l���������Z"; 
	dlg.dimsPnl9.orientation='row';
	(dlg.dimsPnl9.selectS = dlg.dimsPnl9.add('radiobutton', [5,115,180,135], '�����ʎw��' )).helpTip = ""; 
	(dlg.dimsPnl9.selectT = dlg.dimsPnl9.add('radiobutton', [5,140,180,160], '�����̒����ɔ��' )).helpTip = "";
	(dlg.dimsPnl9.selectU = dlg.dimsPnl9.add('radiobutton', [5,140,180,160], '���ڍאݒ������' )).helpTip = "";

	dlg.dimsPnl9.selectT.value = true; 

	dlg.dimsPnl9.selectS.onClick= setTextS;
	dlg.dimsPnl9.selectT.onClick= setTextT;
	dlg.dimsPnl9.selectU.onClick= setTextU;


	(dlg.dimsPnl10b = dlg.add('panel', undefined, '��L�Łu�����ʎw��v���u�����̒����ɔ��v��I�������ꍇ�͉��L�̂P���ڂ�������')).helpTip = "��L�Łu�����̒����ɔ��v��I�������ꍇ�͉��L�̂P���ڂ�������"; 
	(dlg.dimsPnl10 = dlg.add('group', undefined, '��L�Łu�����ʎw��v�u�����̒����ɔ��v��I�������ꍇ�͉��L�̂P���ڂ�������')).helpTip = ""; 

     (dlg.dimsPnl10.titleEt = dlg.dimsPnl10.add('edittext', [100,15,160,35], 0)).helpTip = ""; 
      dlg.dimsPnl10.titleEt.text = defaultValue10; 
    (dlg.dimsPnl10.titleSt = dlg.dimsPnl10.add('statictext', [10,15,360,35], 'E�ϊ��搔')).helpTip = "times"; 
     dlg.dimsPnl10.orientation='row';
	 


	(dlg.dimsPnl11b = dlg.add('panel', undefined, '��L�Łu���ڍאݒ������v��I�������ꍇ�͏�L�̂P���ڂɉ����āA���L�̂R���ڂ����')).helpTip = "��L�Łu���ڍאݒ������v��I�������ꍇ�͏�L�̂P���ڂɉ����āA���L�̂R���ڂ����"; 
	(dlg.dimsPnl11 = dlg.add('group', undefined, '��L�Łu���ڍאݒ������v��I�������ꍇ�͏�L�̂P���ڂɉ����āA���L�̂R���ڂ����')).helpTip = ""; 
     (dlg.dimsPnl11.titleEt = dlg.dimsPnl11.add('edittext', [100,15,160,35], 0)).helpTip = "";  
      dlg.dimsPnl11.titleEt.text = defaultValue11; 
    (dlg.dimsPnl11.titleSt = dlg.dimsPnl11.add('statictext', [10,15,360,35], '�t�B�������g�̒��a(mm)')).helpTip = "times"; 
     dlg.dimsPnl11.orientation='row';


     dlg.alertBtnsPnl12 = dlg.add('group',undefined, 'Threshold:');
     (dlg.alertBtnsPnl12.titleEt = dlg.alertBtnsPnl12.add('edittext', [100,15,160,35], 0)).helpTip = "";  
      dlg.alertBtnsPnl12.titleEt.text = defaultValue12; 
    (dlg.alertBtnsPnl12.titleSt = dlg.alertBtnsPnl12.add('statictext', [10,15,360,35], '������ꂽ1�w�̍���(mm)')).helpTip = "times"; 
     dlg.alertBtnsPnl12.orientation='row';

     dlg.alertBtnsPnl13 = dlg.add('group',undefined, 'Threshold:');
     (dlg.alertBtnsPnl13.titleEt = dlg.alertBtnsPnl13.add('edittext', [100,15,160,35], 0)).helpTip = ""; 
      dlg.alertBtnsPnl13.titleEt.text = defaultValue13; 
    (dlg.alertBtnsPnl13.titleSt = dlg.alertBtnsPnl13.add('statictext', [10,15,360,35], '������ꂽ1�w�̕�(mm)')).helpTip = "times"; 
     dlg.alertBtnsPnl13.orientation='row';



///----------

    dlg.btnPnl = dlg.add('group', undefined, 'Do It!'); 
    dlg.btnPnl.orientation='row';
   
    dlg.btnPnl.buildBtn2 = dlg.btnPnl.add('button', [125,15,225,35], 'OK', {name:'ok'}); 


    dlg.show();

trans=  parseFloat(   dlg.alertBtnsPnl2.titleEt.text);
heatbed =  parseFloat(   dlg.alertBtnsPnl4.titleEt.text);
hotend =  parseFloat(     dlg.alertBtnsPnl5.titleEt.text);
hotendtwo =  parseFloat(     dlg.alertBtnsPnl6.titleEt.text);
var shiftx =  parseFloat(   dlg.alertBtnsPnl0.titleEt.text);
var shifty =  parseFloat(   dlg.alertBtnsPnl1.titleEt.text);
retract = parseFloat(   dlg.alertBtnsPnl7.titleEt.text);
eratio = parseFloat(   dlg.dimsPnl10.titleEt.text);
filament =  parseFloat(   dlg.dimsPnl11.titleEt.text);
extrudeheight = parseFloat(   dlg.alertBtnsPnl12.titleEt.text);
extrudewidth =  parseFloat(   dlg.alertBtnsPnl13.titleEt.text);



  //   alert( n + " layers to  "+ pObj1.length +" paths "); 
     
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// G-COde ����
//
     resultArr.push("; G-Code generated from G-Illustrator developed by Hiroya Tanaka");
     resultArr.push("; "+saveFilen ); 
     resultArr.push("; ");
     resultArr.push("; ");  

//--
//===�ȉ�Header===

resultArr.push("; ��^Header");
resultArr.push("M107")
resultArr.push("M190 S"+heatbed) // set bed temperature
resultArr.push("M104 S"+hotend+ "T0");
resultArr.push("M104 S"+hotendtwo+ "T1");
resultArr.push("M891 P0");
resultArr.push("T0");
resultArr.push("G28");
resultArr.push("G90");
resultArr.push("G1 Z5 F5000");
resultArr.push("M109 S"+hotend+ "T0");
resultArr.push("M109 S"+hotendtwo+ "T1");
resultArr.push("G1 X10 Y10");



resultArr.push("G21"); // set units to millimeters
resultArr.push("G90"); // use absolute coordinates
resultArr.push("M82"); // use absolute distances for extrusion

resultArr.push("T0");
resultArr.push("G92 E0");
if (retract>0) {
    resultArr.push("; ----Rectract Motion (Ready)-----");
  extrude = extrude - retract; //���g���N�g
  resultArr.push("G1 E"+extrude+" F1800.00000");
    resultArr.push("; --------------------------");
}

resultArr.push("T1");
resultArr.push("G92 E0");
if (retract>0) {
    resultArr.push("; ----Rectract Motion (Ready)-----");
  extrudetwo = extrudetwo - retract; //���g���N�g
  resultArr.push("G1 E"+extrudetwo +" F1800.00000");
    resultArr.push("; --------------------------");

}

resultArr.push("M106"); // Fan On
resultArr.push("; M106 Fan On");
resultArr.push("; Header");
//===============



   

      
for(i = n-1; i>=0; i--){
    if (!isNaN(parseFloat(activeDocument.layers[i].name))) {
    if (parseFloat(activeDocument.layers[i].name) >=0 && activeDocument.layers[i].visible){ 
   

  var pObj2 = activeDocument.layers[i].pathItems;
                     resultArr.push("; ");  
                     resultArr.push("; ");  
  
              resultArr.push(";  layer: "+String(n-1-i)+"/"+(n-1));  
                               resultArr.push("; ");  

      for (j=pObj2.length-1; j>-1; j--){


              resultArr.push("; ");  
              resultArr.push(";  layer: "+String(n-1-i)+ "  path: "+j+"/"+ (pObj2.length-1));  
      
      for (k=0; k<pObj2[j].pathPoints.length; k++){


              resultArr.push("; ");  
              resultArr.push(";  layer: "+String(n-1-i) + "  path: "+j +" points: "+k +"/"+(pObj2[j].pathPoints.length-1));  


//point����mm�ւ̕ϊ��imm�~2.834645�j
//mm����point�ւ̕ϊ� (point/2.834645�j
          
      var x =   activeDocument.layers[i].pathItems[j].pathPoints[k].anchor[0]; 
      var y =   activeDocument.layers[i].pathItems[j].pathPoints[k].anchor[1];
	  
	  if(eassign==1){
      var e =  eratio  * activeDocument.layers[i].pathItems[j].strokeWidth;
	  }
          if(eassign==2){ 
      var e =   eratio  * Math.sqrt((x-xx)*(x-xx)+ (y-yy)*(y-yy));
	  }
	  if(eassign==3){
      var e = eratio  * (Math.sqrt((x-xx)*(x-xx)+ (y-yy)*(y-yy)) * extrudewidth * extrudeheight)/(Math.PI*(filament/2)*(filament/2));

          }
	  
	  
      var h=    activeDocument.layers[i].pathItems[j].opacity;
      var z=    activeDocument.layers[i].name;

      x = x/ 2.834645;
      y = y/ 2.834645;
      h = h* trans;
      e = e/ 2.834645;

      x = x +  shiftx;
      y = y  + shifty;

//alert(activeDocument.layers[i].pathItems[j].strokeDashes);


// �ŏ��̓_(K=0)�̏ꍇ
if (k==0) {
// �ŏ��̓_�܂ł͎������o���Ȃ��ŒP�Ȃ�ړ�


// �j���̏ꍇ
 if (parseFloat(activeDocument.layers[i].pathItems[j].strokeDashes) > 0) {



    resultArr.push("T1");
    resultArr.push("G1 X"+x+" Y"+y+ " Z"+z+" F"+h); 

    xx=x; 
    yy=y;


  if (retract>0) {
  extrudetwo = extrudetwo + retract; //���g���N�g
    resultArr.push("; ----Rectract Motion (Start)-----");
  resultArr.push("G1 E"+extrudetwo +" F1800.00000");
    resultArr.push("; --------------------------------");
}	
} 

// �����̏ꍇ
 else {



    resultArr.push("T0");
    resultArr.push("G1 X"+x+" Y"+y+ " Z"+z+" F"+h); 

    xx=x; 
    yy=y;

  if (retract>0 ) {
  extrude = extrude + retract; //���g���N�g
    resultArr.push("; ----Rectract Motion (Start)----");
  resultArr.push("G1 E"+extrude+" F1800.00000");
    resultArr.push("; -------------------------------");
}
}
}


// �ŏ��̓_(K=0)�̏ꍇ'�ȊO'
 else {
     if (extrudenum == 1) { 
     //�w�b�h����1��

     extrude = extrude + e;
      resultArr.push("T0");
      resultArr.push("G1 X"+x+" Y"+y+ " Z"+z+" E"+extrude+" F"+h); 

    xx=x; 
    yy=y;


}

      
      

      if (extrudenum == 2) {
    //�w�b�h����2��
      if (parseFloat(activeDocument.layers[i].pathItems[j].strokeDashes) > 0 ) {
           extrudetwo = extrudetwo + e; 


     resultArr.push("T1");
      resultArr.push("G1 X"+x+" Y"+y+ " Z"+z+" E"+extrudetwo+" F"+h); 

    xx=x; 
    yy=y;
      }  else {
           extrude = extrude + e;

      resultArr.push("T0");
      resultArr.push("G1 X"+x+" Y"+y+ " Z"+z+" E"+extrude+" F"+h); 

    xx=x; 
    yy=y;
}

      }
 }
	 
      




if (k==pObj2[j].pathPoints.length-1){
//�A���J�[�̍Ō�ł܂����g���N�g


if (activeDocument.layers[i].pathItems[j].closed) {

            resultArr.push("; ");  
            resultArr.push(";  path closed"); 

      var x =   activeDocument.layers[i].pathItems[j].pathPoints[0].anchor[0]; 
      var y =   activeDocument.layers[i].pathItems[j].pathPoints[0].anchor[1];

	  if(eassign==1){
      var e =  eratio  * activeDocument.layers[i].pathItems[j].strokeWidth;
	  }
          if(eassign==2){ 
      var e =   eratio  * Math.sqrt((x-xx)*(x-xx)+ (y-yy)*(y-yy));
	  }
          if(eassign==3){
       var e = eratio  * (Math.sqrt((x-xx)*(x-xx)+ (y-yy)*(y-yy)) * extrudewidth * extrudeheight)/(Math.PI*(filament/2)*(filament/2));

          }
	  

      var h=    activeDocument.layers[i].pathItems[j].opacity;
      var z=    activeDocument.layers[i].name;

      x = x/ 2.834645;
      y = y/ 2.834645;
      h = h* trans;
      e = e/ 2.834645;

      x = x +  shiftx;
      y = y  + shifty;


//�w�b�h�����P��
  if (extrudenum == 1) {
 

      extrude = extrude + e;
      resultArr.push("T0");
      resultArr.push("G1 X"+x+" Y"+y+ " Z"+z+" E"+extrude+" F"+h); 

    xx=x; 
    yy=y;



      }
      

//�w�b�h�����Q��
      if (extrudenum == 2) {
      if (parseFloat(activeDocument.layers[i].pathItems[j].strokeDashes) > 0 ) {
           extrudetwo = extrudetwo + e; 
   resultArr.push("T1");
�@
      resultArr.push("G1 X"+x+" Y"+y+ " Z"+z+" E"+extrudetwo+" F"+h); 

    xx=x; 
    yy=y;


      }  else {
           extrude = extrude + e;

      resultArr.push("T0");
      resultArr.push("G1 X"+x+" Y"+y+ " Z"+z+" E"+extrude+" F"+h); 

    xx=x; 
    yy=y;
}

      }

}





////���g���N�g

 if (parseFloat(activeDocument.layers[i].pathItems[j].strokeDashes) > 0 ) {

  if (retract>0 && extrudenum ==2) {
	resultArr.push("; ----Rectract Motion (End) -----");
    resultArr.push("T1");

  extrudetwo = extrudetwo - retract; //���g���N�g
  resultArr.push("G1 E"+extrudetwo +" F1800.00000");
    resultArr.push("; -----------------------^^^^^---");
}	
} else {

  if (retract > 0) {

  resultArr.push("; ----Rectract Motion (End) -----");
  resultArr.push("T0");
  extrude = extrude - retract; //���g���N�g
  resultArr.push("G1 E"+extrude+" F1800.00000");
  resultArr.push("; -------------------------------");
}

}
}
}


}
}
	}

else {
resultArr.push("; Layer:"+activeDocument.layers[i].name+" failed.");
}
}

 

//--��^Footer
resultArr.push(";Footer");
resultArr.push("M107");
resultArr.push("M400");
resultArr.push("M104 S0 T0");
resultArr.push("M104 S0 T1");
resultArr.push("M140 S0");
resultArr.push("G1 Y300 F6000");
resultArr.push("T0");
resultArr.push("G28 X");
resultArr.push("G91");
resultArr.push("G1 Z100 F600");
resultArr.push("G90");
resultArr.push("M701");
resultArr.push("M107");
resultArr.push("; M107 Fan Off");
resultArr.push("M84");
resultArr.push("; ��^Footer�����܂�");
//--



saveFile.open("w");
var success = saveFile.write(resultArr.join("\n"));
saveFile.close();


// �ǂݍ��ݏI���@�\�����o��
if(success){
     alert( n + " layers to "+ pObj1.length +" paths are written in G-CODE"); 
    } else {
    alert("failed.");
    }
  
  /////
    
