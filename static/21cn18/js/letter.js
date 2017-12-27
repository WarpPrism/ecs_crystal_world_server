$(function() {
  // $('.scene2').hide();
  // $('.scene1').show();
  resizeLetterSize();
  window.onresize = resizeLetterSize;
  window.onorientationchange = resizeLetterSize;
  // Request Data
  getUserInfo(getInfoResolve);
  // getInfoResolve({name: 'TEST', joinDate: '2014-07-23'})

  setPageShare({
    url: 'http://k.21cn.com/18th/events/',
    title: 'Beyond | 21CN十八周年庆',
    desc: '与你分享21CN十八岁生日的喜悦',
    picUrl: 'http://k.21cn.com/18th/events/images/wx-share.png'
  })
  setShareInfo({
    url: 'http://k.21cn.com/18th/events/',
    title: 'Beyond | 21CN十八周年庆',
    desc: '与你分享21CN十八岁生日的喜悦',
    picUrl: 'http://k.21cn.com/18th/events/images/wx-share.png'
  })

  $('.share-btn').click(function() {
    $('.ercode-section').fadeIn(300);
    $('.share-btn').hide();

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
    var radio = getPixelRatio(ctx);
    canvas.width = window.innerWidth * radio;
    canvas.height = window.innerHeight * radio;
    ctx.scale(radio, radio);
    setTimeout(function() {
      html2canvas(document.querySelector(".scene1"), {
        canvas: canvas,
        onrendered: function (canvas) {
        }
      }).then(function(canvas) {
        $('.for-screen').attr('src',canvas.toDataURL("image/png"));
        $('.for-screen').css('display','block');
        $('.share-mask').show();
      })
    }, 1200)
  })
})

function getPixelRatio(context) {
  var backingStore = context.backingStorePixelRatio ||
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}

// 计算页面内元素宽高
function resizeLetterSize() {
  var cw = document.documentElement.clientWidth;
  var ch = document.documentElement.clientHeight;
  var ratio = ch / cw;
  if (cw > ch) ratio = cw / ch;
  ratio = ratio > 1.608 ? ratio : 1.608;
  var letterpaperHeight = cw * ratio * 0.75;
  $('html, body').width(cw);
  $('html, body').height(cw * ratio);
  $('.content-wrap').css('min-height', letterpaperHeight * 0.86 + 'px')
}

// 获取用户信息完成后的回调
function getInfoResolve(res) {
  var name = res.name;
  var joinDate = res.joinDate;
  var now = new Date();
  var join = Date.parse(joinDate);
  var dayNum = Math.round((now - join) / 1000 / (24 * 60 * 60));
  $('.staff-name').html(name);
  $('.day').html(dayNum);
  $('.loader-wrap').hide();
  $('.scene').css({'top': 0, 'left': 0, 'opacity': 1});

  var animTime = 1000;
  // animTime = 0;
  $('.staff-section').fadeIn(animTime, function() {
    $('.time-section').fadeIn(animTime, function() {
      var thanksMsg = '光阴荏苒 白驹过隙<br>与你朝夕相处的日子<br>有酸甜苦辣 有欢笑和泪花<br>一起见证你的青春年少 风华正茂<br>一起经历你的彷徨与迷茫 坚强与执着 <br>一起见证你的成长 与团队共进步 <br>让我们继续同心 同行 风雨彩虹<br>因为有你<br>21CN的明天更精彩'
      dynamicAppendText(thanksMsg, $('.msg')[0], function() {
        setTimeout(function() {
          $('.share-section').fadeIn(animTime);
        }, 500)
      });
    });
  });

}

// 外部分享
function setPageShare(share) {
  var shareurl = share.url;
  var sharetitle = share.title;
  var sharedesc = share.desc;
  var shareimage = share.picUrl;

  $.ajax({
    url: 'http://event.21cn.com/api/v1/wxin/getSign2.do',
    data: { 'url': encodeURIComponent(window.location.href.split('#')[0]) },
    type: 'post',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    timeout: 3000,
    success: function(json) {
      var signature = json.signature;
      var noncestr = json.nonceStr;
      var timestamp = json.timeStr;

      wx.config({
        debug: false,
        appId: 'wxe632d63bbcfe4e6c',
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareWeibo', 'onMenuShareQQ', 'onMenuShareQZone']
      });
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: sharetitle,
          desc: sharedesc,
          link: shareurl,
          imgUrl: shareimage,
          success: function() {},
          cancel: function() {}
        })
        wx.onMenuShareAppMessage({
          title: sharetitle,
          desc: sharedesc,
          link: shareurl,
          imgUrl: shareimage,
          success: function() {},
          cancel: function() {}
        })
        wx.onMenuShareWeibo({
          title: sharetitle,
          desc: sharedesc,
          link: shareurl,
          imgUrl: shareimage,
          success: function() {},
          cancel: function() {}
        })
        wx.onMenuShareQQ({
          title: sharetitle,
          desc: sharedesc,
          link: shareurl,
          imgUrl: shareimage,
          success: function() {},
          cancel: function() {}
        })
        wx.onMenuShareQZone({
          title: sharetitle,
          desc: sharedesc,
          link: shareurl,
          imgUrl: shareimage,
          success: function() {},
          cancel: function() {}
        })
      })
    },
    error: function(XMLHttpRequest, status) {
    }
  })
}

// 获取用户信息
function getUserInfo(resolve) {
  var accessToken = localStorage.getItem('accessToken')
  // if (!accessToken) accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuSWQiOiIxNzAyOSIsIm5hbWUiOiLlkajlkInmmIoiLCJiYWRnZSI6IjE3MDI5IiwiZW1haWwiOiJ6aG91amhAY29ycC4yMWNuLmNvbSIsIm1vYmlsZSI6IjE4MTAyNjc4NjE4IiwiZGVwdDFzdCI6IueUqOaIt-S9k-mqjOS4reW_gyIsImRlcElEIjoi5YmN56uv56CU5Y-R6YOoIiwiam9iQmFzZSI6IuS6pOS6kuiuvuiuoSIsImpvYlN0YXR1cyI6IuWcqOiBjCIsInJlcG9ydFRvIjoi6JSh56uL5YuLIiwibWFuYWdlciI6bnVsbCwicGhvdG8iOiJpbWFnZXMvcGhvdG8vMTcwMjkuanBnIiwiam9iIjoi5Yid57qn5Lqk5LqS6K6-6K6h5biIIiwiYXJyaXZhbERhdGUiOm51bGwsImpvYkdyYWRlIjpudWxsLCJwZXJzb25uZWxUeXBlIjoi5pmu6YCa5ZGY5belIiwiZW1wbG95ZWVUeXBlIjpudWxsLCJwcm9iQmVnaW5EYXRlIjpudWxsLCJwcm9iRW5kRGF0ZSI6bnVsbCwiaXNCaXJ0aCI6bnVsbCwiYmlydGhkYXkiOm51bGwsImpvaW5EYXRlIjoiMjAxNy0wNy0xMCIsImpvYkdyYWRlRGF0ZSI6bnVsbCwid29ya0NpdHkiOiLlub_lt57luIIiLCJ3b3JrUGxhY2UiOm51bGwsInNleCI6bnVsbCwiZW1wR3JhZGUiOm51bGwsImRpcmVjdG9yIjpudWxsLCJsZWF2ZWRhdGUiOm51bGwsInJlcG9ydFRvRW1haWwiOiJjYWlseEBjb3JwLjIxY24uY29tIiwicmVwb3J0VG9CYWRnZSI6IjEzMDM0IiwiaWF0IjoxNTE0MTkxNDU4fQ.raqI0BsqPmoF2DkAcNZvXvlNZfwImVGtSGy5AJOMGwk';
  var header = {}
  if (accessToken && accessToken != '') {
    header = Object.assign(header, {
      'X-Access-Token': accessToken
    })
  }
  $.ajax({
    // url: 'http://10.16.32.161:3000/api/getUserInfo?t=' + Date.parse(new Date()),
    url: '../api/getUserInfo?t=' + Date.parse(new Date()), // 上线时的接口
    method: 'GET',
    headers: header,
    success: function(res) {
      // 成功状态
      if (res.result == 0 && res.name) {
        resolve(res);
      } else if (res.result == 401 && res.redirectUrl)  {
        window.location.replace(res.redirectUrl)
      } else if (res.result == 404) {
        console.log(res.msg);
        // NOT EHR USER
        $('.loader-wrap').hide();
        $('.scene').css({'top': 0, 'left': 0, 'opacity': 1});
        $('.scene1').hide();
        $('.scene2').show();
      } else {
        alert('网络错误，请检查网络');
      }
    }
  })
}

function dynamicAppendText(mystr, target, callback) {
  var len = mystr.length;
  var strArr = mystr.split('');
  var colors = ['#d00', '#00d', '#0d0', '#cc0', '#c0c', '#0cc', '#000'];
  var progress = 0;
  
  var timer = setInterval(function() {
      if (progress <= len) {
          var char = mystr.charAt(progress-1);
          var entityChars = ['<', '>', '/', '&', 'e', 'm', 's', 'p', ';'];
          if (entityChars.indexOf(char) < 0) {
            target.innerHTML = mystr.substring(0, progress)
              + '<span id="cursor">' + ((progress & 1)?'_':'') + '</span>';
            var random = Math.floor(Math.random() * colors.length);
            document.getElementById('cursor').style.color = colors[random] + '';
          }
          progress++;
      } else {
          target.innerHTML += '<br />';
          target.removeChild(document.getElementById('cursor'));
          window.clearInterval(timer);
          if (callback) {
              callback();
          }
      }
  }, 80);
}
