var clientWidth; // 全局变量 视口宽度
var clientHeight; // 全局变量 视口高度
var baseFontSize;
var stopBackgroundCanvas = true;
var particale;
var loacl1 = true;
var loacl2 = true;
var loacl3 = true;
var loacl4 = true;
var loacl5 = true;
var toNextLoactionFunction;
var baserule = 0.02;
var baseRange = 0.04;
var moveFun;
var switchFun;
var pObj = null;
var ap = null;
var canReplay = false;
$(function () {
  var long = document.documentElement.clientHeight < document.documentElement.clientWidth ? document.documentElement.clientWidth : document.documentElement.clientHeight;
  $('.container').css('height', long + 'px');
  window.addEventListener('resize', initPage, false);
  initPage();
  preLoad([
    './images/map1.jpg',
    './images/map2.jpg',
    './images/map3.jpg',
    './images/map4.jpg',
    './images/map5.jpg',
    './images/switch-background.png',
    './images/1_1.png',
    './images/1_2.png',
    './images/1_3.png',
    './images/2_1.png',
    './images/2_2.png',
    './images/2_3.png',
    './images/3_1.png',
    './images/3_2.png',
    './images/3_3.png',
    './images/3_4.png',
    './images/3_5.png',
    './images/3_6.png',
    './images/4_1.png',
    './images/4_2.png',
    './images/4_3.png',
    './images/4_4.png',
    './images/5_1.png',
    './images/5_2.png',
    './images/5_3.png',
    './images/5_4.png',
    './images/5_5.png',
    './images/5_6.png',
    './images/5_7.png',
    './images/5_8.png',
    './images/hand.png',
    './images/letter_title.png',
    './images/main_letter.png',
    './images/replay_button.png',
    './images/replay_text.png',
    './images/thanks_bottom.png',
    './images/open_letter.png',
    './images/message.png',
    './images/top_flow.png'
  ], function () {
    $('.map-box').addClass('map-box-ready')
    $('.map-box').addClass('map-box-0-1');
    $('#loading-per').text('开始穿越');
    $('.loading_button').click(function () {
      $('#loading-per').text('穿越中...');
      $('.loading').css('opacity', '0');
      setTimeout(function () {
        $('.loading').remove();
        setTimeout(function(){
          $('.map-box').addClass('map-box-0-2');
          setTimeout(function(){
            messageIn();
          },1600);
        },600);
      }, 1000);
    });
    switchFun = toSwitch1;
    $('#switch-point').click(callSwitchFun);
  });
  $('#replay').click(replay);
  // $('#to-login').click(function(){
  //   window.location.href = './thanksletter.html';
  // });
});

/**
 * 主容器初始化函数
 */
function initPage() {
  var container = document.getElementById('container');
  clientWidth = container.clientWidth;
  clientHeight = container.clientHeight;
  baseFontSize = +document.getElementsByTagName('html')[0].style.fontSize.slice(0, -2);
  var mainContainer = $('.main-container');
  mainContainer.css('width', clientWidth + 'px');
  mainContainer.css('height', clientHeight + 'px');
  // $('.loading').css('width', clientWidth + 'px');
  // $('.loading').css('height', clientWidth + 'px');
  $('#background-canvas').attr('width', clientWidth + 'px');
  $('#background-canvas').attr('height', clientHeight + 'px');
  $('#point-canvas').attr('width', clientWidth + 'px');
  $('#point-canvas').attr('height', clientHeight + 'px');
  $('#point-canvas').css('width', clientWidth + 'px');
  $('#point-canvas').css('height', clientHeight + 'px');
  $('#map').attr('width', clientWidth + 'px');
  $('#map').attr('height', clientHeight + 'px');
  $('#map').css('width', clientWidth + 'px');
  $('#map').css('height', clientHeight + 'px');
  if (!stopBackgroundCanvas) {
    backCanvasStart();
  }
  if (pObj) {
    if (ap) {
      ap.end();
      $('#switch-text').css('opacity', '0');
      setTimeout(function () {
        ap = startAnimation(pObj);
      }, 100);
    }
  }
}
// bgm
function toggleBGMPlay(audio) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
// bgm

function messageIn(){
  $('.message').css('opacity','1');
  $('.main-title').css('opacity','1');
  $('.main-locaiton').css('opacity','1');
  $('.single-location').css('opacity','1');
  $('.top-flow').css('opacity','1');
  var audio = $('audio')[0];
  audio.pause();
}

function messageOut(){
  $('.message').css('opacity','0');
  $('.main-title').css('opacity','0');
  $('.main-locaiton').css('opacity','0');
  $('.single-location').css('opacity','0');
  $('.top-flow').css('opacity','0');
  var audio = $('audio')[0];
  audio.pause();
}




function preLoad(assets, cb) {
  var sum = assets.length;
  var finish = 0;
  var per = finish / sum * 100;
  for (var i = 0; i < assets.length; i++) {
    var img = new Image();
    img.onload = function () {
      finish++;
      per = finish / sum * 100;
      $('#loading-per').text(Math.floor(per)+'%');
      if (sum == finish) {
        cb();
      }
    }
    img.src = assets[i];
  }
}

function replay() {
  if (!canReplay) {
    return;
  }
  canReplay = false;
  $('.map-box').removeClass('map-box-1');
  $('.map-box').removeClass('map-box-2');
  $('.map-box').removeClass('map-box-3');
  $('.map-box').removeClass('map-box-4');
  $('.map-box').removeClass('map-box-5');
  $('.map-box').removeClass('map-box-6');
  $('.map-box').removeClass('map-box-7');
  $('.map-box').removeClass('map-box-8');
  $('.map-box').removeClass('map-box-9');
  $('.map-box').removeClass('map-box-10');
  loacl1 = true;
  loacl2 = true;
  loacl3 = true;
  loacl4 = true;
  loacl5 = true;
  switchFun = toSwitch1;
  $('.map-box').addClass('map-box-0-1');
  setTimeout(function () {
    $('.thanks').css('opacity', '0');
    setTimeout(function(){
      $('.map-box').addClass('map-box-0-2');
      setTimeout(function () {
        messageIn();
        $('.thanks').css('display', 'none');
      }, 1000);
    },1000)
  }, 500);
}

function callSwitchFun() {
  switchFun();
}

function endSwitch() {
  stopAnimation();
  backCanvasStop();
  setTimeout(moveFun, 500);
}


function move1() {
  $('.map-box').addClass('map-box-2');
  messageOut();
  setTimeout(function(){
    $('.message').addClass('message-2');
    $('.message').removeClass('message-1');
    $('.main-title').text('时光穿梭 · ');
    $('.single-location').text('体育东');
    $('.main-locaiton').text('');
    $('.year-range').text('2000年')
    $('.message-content').html('互联网严冬<br>公司确立长期发展三大战略');
    messageIn();
  },1500);
}

function move2() {
  $('.map-box').addClass('map-box-4');
  messageOut();
  setTimeout(function(){
    $('.message').addClass('message-3');
    $('.message').removeClass('message-2');
    $('.main-title').text('时光穿梭 · ');
    $('.single-location').text('华天');
    $('.main-locaiton').text('');
    $('.year-range').text('2006年')
    $('.message-content').html('入驻华天总部<br>开启公司高速发展新阶段');
    messageIn();
  },1500);
  
}

function move3() {
  $('.map-box').addClass('map-box-6');
  messageOut();
  setTimeout(function(){
    $('.message').addClass('message-4');
    $('.message').removeClass('message-3');
    $('.main-title').text('时光穿梭 · ');
    $('.single-location').text('越秀南');
    $('.main-locaiton').text('');
    $('.year-range').text('2013年')
    $('.message-content').html('综合平台成立<br>全面拥抱移动互联网<br>入驻移互中心');
    messageIn();
  },1500);
}

function move4() {
  $('.map-box').addClass('map-box-8');
  messageOut();
  setTimeout(function(){
    $('.message').addClass('message-5');
    $('.message').removeClass('message-4');
    $('.main-title').text('时光穿梭 · ');
    $('.single-location').text('财润');
    $('.main-locaiton').text('');
    $('.year-range').text('2015年')
    $('.message-content').html('公司业务指数级增长<br>扩容财润办公地点');
    messageIn();
  },1500);
}

function move5() {
  canReplay = true;
  $('.map-box').addClass('map-box-10');
  messageOut();
  setTimeout(function () {
    $('.thanks').css('display', 'block');
    setTimeout(function () {
      $('.thanks').css('opacity', '1');
    }, 100);
    $('.message').addClass('message-1');
    $('.message').removeClass('message-5');
    $('.main-title').text('时光穿梭 · ');
    $('.single-location').text('天河');
    $('.main-locaiton').text('');
    $('.year-range').text('1999年')
    $('.message-content').html('三次乔迁<br>21CN成立 出生非凡');
  }, 3000);
}

function mapMoveTo(x, y, sc) {
  var halfWidth = clientWidth / baseFontSize / 2;
  var halfHeight = clientHeight / baseFontSize / 2;
  var targetX = -(x - halfWidth > 0 ? x - halfWidth : 0);
  var targetY = -(y - halfHeight > 0 ? y - halfHeight : 0);
  $('.map-box').css('transform', 'translateX(' + targetX + 'rem) translateY(' + targetY + 'rem) scale(' + sc + ')');
  $('.map-box').css('transform-origin', x + 'rem ' + y + 'rem');
}


function backCanvasStart(p) {
  var audio = $('audio')[0];
  audio.play();
  $('#background-canvas').css('display', 'block');
  setTimeout(function () {
    $('#background-canvas').css('opacity', '1');
  }, 100);
  stopBackgroundCanvas = false;
  var p = p || {
    window_width: clientWidth,
    window_height: clientHeight,
    window_background: '#00113F',
    star_count: '100',
    star_color: '#FBFFAF',
    star_depth: '100'
  };
  var w_w = p && p.window_width ? p.window_width : "500";
  var w_h = p && p.window_height ? p.window_height : "400";
  var w_b = p && p.window_background ? p.window_background : "#000";
  var s_c = p && p.star_count ? p.star_count : "600";
  var s_color = ['#d3db18', '#b003f8', '#265754', '#3b3c23']
  var s_d = p && p.star_depth ? p.star_depth : "250";
  var fov = parseInt(s_d);
  var SCREEN_WIDTH = parseInt(w_w);
  var SCREEN_HEIGHT = parseInt(w_h);
  var HALF_WIDTH = SCREEN_WIDTH / 2;
  var HALF_HEIGHT = SCREEN_HEIGHT / 2;
  var numPoints = s_c;

  var bakcgroundImg = new Image();
  bakcgroundImg.width = clientWidth + 'px';
  bakcgroundImg.height = clientWidth + 'px';
  bakcgroundImg.src = './images/switch-background.png';

  var canvas = document.getElementById('background-canvas');
  var c = canvas.getContext('2d');
  var offlineCanvas = document.createElement('canvas');
  offlineCanvas.width = SCREEN_WIDTH;
  offlineCanvas.height = SCREEN_HEIGHT;
  var offC = offlineCanvas.getContext('2d');

  function draw3Din2D(point3d) {
    x3d = point3d[0];
    y3d = point3d[1];
    z3d = point3d[2];
    var scale = fov / (fov + z3d) / 4;
    var x2d = (x3d * scale) + HALF_WIDTH;
    var y2d = (y3d * scale) + HALF_HEIGHT;


    // c.lineWidth = scale;
    // c.strokeStyle = s_color;
    offC.fillStyle = s_color[Math.floor(Math.random() * 4)];
    offC.beginPath();
    offC.arc(x2d, y2d, scale, 0, 2 * Math.PI);
    // c.moveTo(x2d, y2d);
    // c.lineTo(x2d + scale, y2d);
    offC.fill();
    // c.stroke();

  }

  function draw3Din2D(point3d) {
    x3d = point3d[0];
    y3d = point3d[1];
    z3d = point3d[2];
    var scale = fov / (fov + z3d) / 4;
    var x2d = (x3d * scale) + HALF_WIDTH;
    var y2d = (y3d * scale) + HALF_HEIGHT;


    // c.lineWidth = scale;
    // c.strokeStyle = s_color;
    offC.fillStyle = point3d[3];
    offC.beginPath();
    offC.arc(x2d, y2d, scale, 0, 2 * Math.PI);
    // c.moveTo(x2d, y2d);
    // c.lineTo(x2d + scale, y2d);
    offC.fill();
    // c.stroke();

  }



  var points = [];

  function initPoints() {
    for (i = 0; i < numPoints; i++) {
      point = [(Math.random() * 400) - 200, (Math.random() * 400) - 200, (Math.random() * 400) - 200, s_color[Math.floor(Math.random() * 4)]];
      points.push(point);
    }

  }

  function render() {
    if (stopBackgroundCanvas) {
      offC.clearRect(0, 0, clientWidth, clientHeight);
    } else {
      // offC.fillStyle =  'rgba(0,0,0,0.2)';
      // offC.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      offC.drawImage(bakcgroundImg, 0, 0, 750, 1206, 0, 0, clientWidth, clientHeight);
      for (i = 0; i < numPoints; i++) {
        point3d = points[i];
        z3d = point3d[2];
        z3d -= 1;
        if (z3d < -fov) z3d += 400;
        point3d[2] = z3d;
        draw3Din2D(point3d);
      }
      c.drawImage(offlineCanvas, 0, 0);
      requestAnimationFrame(render);
    }
  }

  initPoints();

  requestAnimationFrame(render);
}


function backCanvasStop() {
  $('#background-canvas').css('opacity', '0');
  setTimeout(function () {
    stopBackgroundCanvas = true;
    $('#background-canvas').css('display', 'none');
  }, 1000);
}


function Particale(p) {
  this.warp = p.warp;		//画布
  this.ctx = this.warp.getContext('2d');
  this.assets = p.assets;	//资源数组
  this.assetsObj = [];		//图片对象数组
  this.radius = p.radius;	//粒子半径
  this.index = 0;			//当前图片下标
  this.initz = 300;
  this.dots = [];
  this.init();
  ap = this;
}

//  ///添加原型属性
Particale.prototype = {
  constructor: Particale,
  init: function () {
    var that = this;
    ////画布居中
    // this.warp.style.marginLeft = "calc(10vw)";
    // this.warp.style.marginTop = "calc(10vh)";
    /////限制小球半径
    // if (this.warp.width > 500 || this.warp.height > 300)
    //   this.radius >= 4 ? this.radius = this.radius : this.radius = 4;
    // else
    //   this.radius >= 2 ? this.radius = this.radius : this.radius = 2;

    var promiseArr = this.assets.map(function (asset, index) {
      return new Promise(function (resolve, reject) {
        if (asset.type == 1) {
          var imgObj = new Image();
          imgObj.onload = function () {
            imgObj.widthPer = asset.widthPer;
            imgObj.radius = asset.radius;
            imgObj.html = asset.html;
            if(asset.showOri){
              imgObj.showOri = asset.showOri;
            }
            that.assetsObj[index] = imgObj;
            resolve();
          };
          imgObj.src = asset.url;
        } else {
          that.assetsObj[index] = asset;
          resolve();
        }
      });
    });
    this.offlineCanvas = document.createElement("canvas");
    this.offlineCanvas.width = this.warp.width;
    this.offlineCanvas.height = this.warp.height;
    this.offlineCtx = this.offlineCanvas.getContext('2d');
    /////图片全部加载完毕开始绘制
    Promise.all(promiseArr).then(function () {
      that.run = true;
      that.picLoop();
    });

  },
  picLoop: function () {
    if (this.index === this.assetsObj.length) {
      endSwitch();
      return;
    }
    this.dots = [];
    this.drawPic();			//绘制当前图片
    this.toParticle();		//得到像素点
    this.combineAnimate();	//合成图像
    this.index++;  //下标移动到下一张图片

  },
  drawPic: function () {
    /////清除画布
    this.ctx.clearRect(0, 0, this.warp.width, this.warp.height);
    var imgObj = this.assetsObj[this.index];
    this.currentImg = imgObj;
    if (imgObj.text) {
      var frontSize = (this.warp.width * 0.9 / imgObj.text.length);
      if (imgObj.double) {
        frontSize = frontSize * 2;
      }
      this.ctx.font = "normal bold " + frontSize + "px/" + frontSize + "px Noto";
      this.ctx.fillStyle = '#f9fafa';
      var textWidth = this.ctx.measureText(imgObj.text).width;
      if (textWidth > this.warp.width * 0.9) {
        textWidth = this.warp.width * 0.9;
      }
      var textHeight = textWidth / imgObj.text.length;
      this.ctx.fillText(imgObj.text, this.warp.width / 2 - textWidth / 2, (this.warp.height / 2 - textHeight / 2) * 1.5, this.warp.width * 0.9);
    } else {
      /////限制图片大小
      ImgScale = imgObj.height / imgObj.width;
      imgObj.width = this.warp.width * imgObj.widthPer;
      imgObj.height = imgObj.width * ImgScale;
      this.radius = imgObj.radius;
      $('#switch-text').html(imgObj.html)
      // if (imgObj.width > imgObj.height) {
      //   ImgScale = imgObj.height / imgObj.width;
      //   imgObj.width = this.warp.width * .7;
      //   imgObj.height = imgObj.width * ImgScale;
      // } else {
      //   ImgScale = imgObj.width / imgObj.height;
      //   imgObj.height = this.warp.height * .7;
      //   imgObj.width = imgObj.height * ImgScale;
      // }
      //////绘制图片到canvas
      this.ctx.drawImage(imgObj, this.warp.width / 2 - imgObj.width / 2, this.warp.height / 2 - imgObj.height / 2, imgObj.width, imgObj.height);
    }
  },
  toParticle: function () {
    ////得到像素
    var imageData = this.ctx.getImageData(0, 0, this.warp.width, this.warp.height);
    var data = imageData.data;
    for (var x = 0; x < imageData.width; x += this.radius * 2) {
      for (var y = 0; y < imageData.height; y += this.radius * 2) {
        var i = (x + y * this.warp.width) * 4;
        // if (data[i + 3] !== 0 && data[i] !== 255 && data[i + 1] !== 255 && data[i + 2] !== 255) {
        if (data[i + 3] !== 0) {
          var dot = {
            x: x,												//图片x轴坐标
            y: y,												//	  y轴坐标
            z: 0,												//	  z轴坐标
            r: data[i],											//	  rgba
            g: data[i + 1],										//	  rgba
            b: data[i + 2],										//	  rgba
            a: 1,												//	  rgba
            ix: Math.random() * this.warp.width, 				//初始化x轴坐标
            iy: Math.random() * this.warp.height, 				//		y轴坐标
            iz: Math.random() * this.initz * 2 - this.initz, 	//		z轴坐标
            ir: 255,											//		rgba
            ig: 255,											//		rgba
            ib: 255,											//		rgba
            ia: 0,												//		rgba
            tx: Math.random() * this.warp.width, 				//目标x轴坐标
            ty: Math.random() * this.warp.height, 				//	  y轴坐标
            tz: Math.random() * this.initz * 2 - this.initz, 	//	  z轴坐标
            tr: 255,											//	  rgba
            tg: 255,											//	  rgba
            tb: 255,											//	  rgba
            ta: 0,												//	  rgba
          };
          this.dots.push(dot);
        }
      }
    }
  },
  combineAnimate: function () {

    if (!this.run) {
      return;
    }
    // var imgObj = this.assetsObj[this.index];
    $('#switch-text').css('opacity', '1');
    var that = this;
    var combined = false;
    this.offlineCtx.clearRect(0, 0, this.offlineCanvas.width, this.offlineCanvas.height);
    this.dots.map(function (dot) {
      if (Math.abs(dot.ix - dot.x) < 0.3 && Math.abs(dot.iy - dot.y) < 0.3 && Math.abs(dot.iz - dot.z) < 0.3) {
        dot.ix = dot.x;
          dot.iy = dot.y;
          dot.iz = dot.z;
          dot.ir = dot.r;
          dot.ig = dot.g;
          dot.ib = dot.b;
          dot.ia = dot.a;
          combined = true;
      } else {
        dot.ix += (dot.x - dot.ix) * 0.14;
        dot.iy += (dot.y - dot.iy) * 0.14;
        dot.iz += (dot.z - dot.iz) * 0.14;
        dot.ir += (dot.r - dot.ir) * 0.6;
        dot.ig += (dot.g - dot.ig) * 0.6;
        dot.ib += (dot.b - dot.ib) * 0.6;
        dot.ia += (dot.a - dot.ia) * 0.2;
        combined = false;
      }
      return that.drowDot(dot);
    });
    this.ctx.clearRect(0, 0, this.warp.width, this.warp.height);
    this.ctx.drawImage(this.offlineCanvas, 0, 0);
    if (!combined) {
      requestAnimationFrame(function () {
        return that.combineAnimate();
      });
    } else {
      if(that.currentImg.showOri){
        that.ctx.drawImage(that.currentImg, that.warp.width / 2 - that.currentImg.width / 2, that.warp.height / 2 - that.currentImg.height / 2, that.currentImg.width, that.currentImg.height);
      }
      setTimeout(function () {
        return that.separateAnimate();
      }, 1500);
    }
  },
  separateAnimate: function () {
    if (!this.run) {
      return;
    }
    $('#switch-text').css('opacity', '0');
    var that = this;
    var separated = false;
    this.offlineCtx.clearRect(0, 0, this.offlineCanvas.width, this.offlineCanvas.height);
    this.dots.map(function (dot) {
      if (Math.abs(dot.ix - dot.tx) < 0.3 && Math.abs(dot.iy - dot.ty) < 0.3 && Math.abs(dot.iz - dot.tz) < 0.3) {
        dot.ix = dot.tx;
        dot.iy = dot.ty;
        dot.iz = dot.tz;
        dot.ir = dot.tr;
        dot.ig = dot.tg;
        dot.ib = dot.tb;
        dot.ia = dot.ta;
        separated = true;
      } else {
        dot.ix += (dot.tx - dot.ix) * 0.21;
        dot.iy += (dot.ty - dot.iy) * 0.21;
        dot.iz += (dot.tz - dot.iz) * 0.21;
        dot.ir += (dot.tr - dot.ir) * 0.06;
        dot.ig += (dot.tg - dot.ig) * 0.06;
        dot.ib += (dot.tb - dot.ib) * 0.06;
        dot.ia += (dot.ta - dot.ia) * 0.13;
        separated = false;
      }
      return that.drowDot(dot);
    });
    this.ctx.clearRect(0, 0, this.warp.width, this.warp.height);
    this.ctx.drawImage(this.offlineCanvas, 0, 0);
    if (!separated) {
      requestAnimationFrame(function () {
        return that.separateAnimate();
      });
    } else {
      setTimeout(function () {
        return that.picLoop();		//间接递归，使用尾递归优化
      }, 300);
    }
  },
  drowDot: function (dot) {
    var scale = this.initz / (this.initz + dot.iz);
    this.offlineCtx.save();
    this.offlineCtx.beginPath();
    this.offlineCtx.fillStyle = 'rgba(' + Math.floor(dot.ir) + ', ' + Math.floor(dot.ig) + ', ' + Math.floor(dot.ib) + ', ' + dot.ia + ')'
    this.offlineCtx.arc(this.warp.width / 2 + (dot.ix - this.warp.width / 2) * scale, this.warp.height / 2 + (dot.iy - this.warp.height / 2) * scale, this.radius * scale, 0, Math.PI * 2);
    this.offlineCtx.fill();
    this.offlineCtx.closePath();
    this.offlineCtx.restore();
  },
  stop: function () {
    var that = this;
    this.run = false;
    this.warp.style.opacity = '0';
    ap = null;
    setTimeout(function () {
      that.warp.style.display = 'none';
      that.ctx.clearRect(0, 0, that.warp.width, that.warp.height);
      that.ctx.clearRect(0, 0, that.warp.width, that.warp.height);
    }, 1000);

  },
  end: function () {
    this.run = false;
  }
}

function startAnimation(assets) {
  $('#point-canvas').css('opacity', '1');
  setTimeout(function () {
    $('#point-canvas').css('display', 'block');
    particale = new Particale({
      warp: document.getElementById('point-canvas'),
      assets: assets,
      radius: 2,
    });
  }, 1000);
}

function stopAnimation() {
  particale.stop();
}

function toSwitch1() {
  if (loacl1) {
    backCanvasStart();
    setTimeout(function () {
      $('.map-box').addClass('map-box-1');
      $('.map-box').removeClass('map-box-0-1');
      $('.map-box').removeClass('map-box-0-2');
    }, 1000);
    pObj = [{
      type: 1,
      url: 'images/1_1.png',
      widthPer: 1,
      radius: 2,
      html: '21CN.com 门户网站开通<br>1999.02',
    }, {
      type: 1,
      url: 'images/1_2.png',
      widthPer: 1,
      radius: 2,
      html: '21CN推出国内首批个人邮箱<br>1999.04'
    }, {
      type: 1,
      url: 'images/1_3.png',
      widthPer: 1,
      radius: 2,
      html: '世纪龙公司正式成立<br>1999.12'
    }]
    startAnimation(pObj);
    moveFun = move1;
    switchFun = toSwitch2;
    loacl1 = false;
  }

}

function toSwitch2() {
  if (loacl2) {
    backCanvasStart();
    setTimeout(function () {
      $('.map-box').addClass('map-box-3');
      $('.map-box').removeClass('map-box-1');
      $('.map-box').removeClass('map-box-2');
    }, 1000);
    pObj = [{
      type: 1,
      url: 'images/2_1.png',
      widthPer: 1,
      radius: 2,
      html: '首推付费个人商务邮箱<br>2001.02'
    }, {
      type: 1,
      url: 'images/2_2.png',
      widthPer: 1,
      radius: 4,
      html: '21CN门户网站<br>中国第四，华南第一<br>2003.08'
    }, {
      type: 1,
      url: 'images/2_3.png',
      widthPer: 1,
      radius: 2,
      html: '21CN企业邮箱，综合实力第一<br>2005.08'
    }];
    startAnimation(pObj);
    moveFun = move2;
    switchFun = toSwitch3;
    loacl2 = false;
  }
}

function toSwitch3() {
  if (loacl3) {
    backCanvasStart();
    setTimeout(function () {
      $('.map-box').addClass('map-box-5');
      $('.map-box').removeClass('map-box-3');
      $('.map-box').removeClass('map-box-4');
    }, 1000);
    pObj = [{
      type: 1,
      url: 'images/3_1.png',
      widthPer: 1,
      radius: 2,
      html: '承建中国电信各省份3G门户<br>2008.10'
    }, {
      type: 1,
      url: 'images/3_2.png',
      widthPer: 1,
      radius: 2,
      html: '189邮箱上线<br>2008.12'
    }, {
      type: 1,
      url: 'images/3_3.png',
      widthPer: 1,
      radius: 2,
      html: '感恩十年·你我同行，公司十周年庆<br>2009.12'
    }, {
      type: 1,
      url: 'images/3_4.png',
      widthPer: 1,
      radius: 2,
      html: 'VGO上线<br>2010.08'
    }, {
      type: 1,
      url: 'images/3_5.png',
      widthPer: 1,
      radius: 2,
      html: '189邮箱（微邮）App上线<br>2011.07'
    }, {
      type: 1,
      url: 'images/3_6.png',
      widthPer: 1,
      radius: 2,
      html: '云存储业务“天翼云”上线<br>2012.07'
    }];
    startAnimation(pObj);
    moveFun = move3;
    switchFun = toSwitch4;
    loacl3 = false;
  }
}

function toSwitch4() {
  if (loacl4) {
    backCanvasStart();
    setTimeout(function () {
      $('.map-box').addClass('map-box-7');
      $('.map-box').removeClass('map-box-5');
      $('.map-box').removeClass('map-box-6');
    }, 1000);
    pObj = [{
      type: 1,
      url: 'images/4_1.png',
      widthPer: 1,
      radius: 2,
      html: '中国电信综合平台成立<br>2013.08',
      showOri:true
    }, {
      type: 1,
      url: 'images/4_2.png',
      widthPer: 1,
      radius: 2,
      html: '流量宝3.0发布，推出流量红包<br>2014.11'
    }, {
      type: 1,
      url: 'images/4_3.png',
      widthPer: 1,
      radius: 2,
      html: '天翼流量800 合作伙伴大会召开<br>2014.12'
    }];
    startAnimation(pObj);
    moveFun = move4;
    switchFun = toSwitch5;
    loacl4 = false;
  }
}

function toSwitch5() {
  if (loacl5) {
    backCanvasStart();
    setTimeout(function () {
      $('.map-box').addClass('map-box-9');
      $('.map-box').removeClass('map-box-7');
      $('.map-box').removeClass('map-box-8');
    }, 1000);
    pObj = [{
      type: 1,
      url: 'images/5_1.png',
      widthPer: 1,
      radius: 2,
      html: '微企上线<br>2015.01'
    }, {
      type: 1,
      url: 'images/5_2.png',
      widthPer: 1,
      radius: 2,
      html: '看荐上线<br>2015.07'
    }, {
      type: 1,
      url: 'images/5_3.png',
      widthPer: 1,
      radius: 2,
      html: '流量来了上线<br>2016.01.01'
    }, {
      type: 1,
      url: 'images/5_4.png',
      widthPer: 1,
      radius: 4,
      html: '流量宝推出流量红包，引起业内轰动<br>2016.01'
    }, {
      type: 1,
      url: 'images/5_5.png',
      widthPer: 0.7,
      radius: 2,
      html: '流量+ 开放合作大会在北京召开<br>2016.08'
    }, {
      type: 1,
      url: 'images/5_6.png',
      widthPer: 1,
      radius: 2,
      html: '家庭云 上线<br>2017.05'
    }, {
      type: 1,
      url: 'images/5_7.png',
      widthPer: 1,
      radius: 2,
      html: '共筑生态·通行未来<br>天翼账号开发合作大会在北京召开<br>2017.09'
    }, {
      type: 1,
      url: 'images/5_8.png',
      widthPer: 1,
      radius: 2,
      html: '翼健康生态合作大会在广州召开<br>2017.11'
    }];
    startAnimation(pObj);
    moveFun = move5;
    loacl5 = false;
  }
}
