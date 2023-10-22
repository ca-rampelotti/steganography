var imageshow;
var imagehide;


function loadShow(){
  var inputshow = document.getElementById('show');
  var canvas1 = document.getElementById('canvas1');
  imageshow = new SimpleImage(inputshow);
  imageshow.drawTo(canvas1);
}

function loadHide(){
  var inputhide = document.getElementById('hide');
  var canvas2 = document.getElementById('canvas2');
  imagehide = new SimpleImage(inputhide);
  imagehide.drawTo(canvas2);
}


function manipShow(image){
  for (var px of image.values()){
    px.setRed(Math.floor(px.getRed()/16)*16);
    px.setGreen(Math.floor(px.getGreen()/16)*16);
    px.setBlue(Math.floor(px.getBlue()/16)*16);
  }
  return image;
}

function manipHide(image){
  for (var px of image.values()){
    px.setRed(px.getRed()/16);
    px.setGreen(px.getGreen()/16);
    px.setBlue(px.getBlue()/16);
  }
  return image;  
}

function doMerge(){
 
  var imageshow2 = manipShow(imageshow);

  imagehide.setSize(imageshow2.width,imageshow2.height);
  var imagehide2 = manipHide(imagehide);
  
  var finalimage = new SimpleImage(imageshow2.width, imageshow2.height);
  
  for (var px of finalimage.values()){
    var x = px.getX();
    var y = px.getY();
    var pxshow = imageshow2.getPixel(x,y);
    var pxhide = imagehide2.getPixel(x,y);
    px.setRed(pxshow.getRed() + pxhide.getRed());
    px.setGreen(pxshow.getGreen() + pxhide.getGreen());
    px.setBlue(pxshow.getBlue() + pxhide.getBlue());
  }
  var canvas1 = document.getElementById('canvas1');
  var canvas2 = document.getElementById('canvas2');
  doClear(canvas1);
  doClear(canvas2);
  
  
  finalimage.drawTo(canvas1);

}


function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}