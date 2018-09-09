$(function(){
  //获取输入框焦点
  $('#text').focus();
  // $('#text').height(window.innerHeight);
  //图标点击事件绑定方法
  $('#complete').click(function(){mixture();});
  $('#copy').click(function(){copy();});
  $('#quotation').click(function(){quotation();});
  $('#convert').click(function(){convert();});
  $('#image').click(function(){save_img();});

  //图标的快捷键方法
  document.onkeydown = function(e){
    if(e.ctrlKey && e.keyCode == 79){
      return mixture();
    }
    else if(e.ctrlKey && e.keyCode == 77){
      return copy();
    }
    else if(e.ctrlKey && e.keyCode == 81){
      return quotation();
    }
    else if(e.ctrlKey && e.keyCode == 69){
      return convert();
    }
    else if(e.ctrlKey && e.keyCode == 87){
      return save_img();
    }
    else if(e.ctrlKey && e.keyCode == 13){
      $('#text').height($('#text').height() + 60);
      $('#text').val($('#text').val() + '\n\n');
    }
  };

  //中英混排
  function mixture(){
    var text = $('#text').text();
    text = insert_space(text);
    $('#text').text(text);
    $('#text').height($('#text').height() + 120);
  }

  //复制编辑框中内容
  function copy(){
    if($('#copy_message')){
      $('#copy_message').remove();
    }
    var tempCopyArea = document.getElementById('temp-copy-area');
    tempCopyArea.value = $('#text').text();
    tempCopyArea.select();

    // 执行复制命令
    if (document.queryCommandSupported('copy')) {
      document.execCommand('copy');
    }
    var input = document.querySelector('#temp-copy-area');
    input.select();
    try{
      document.execCommand('copy');
      var copy_message = $('<div>文字已复制到粘贴板</div>');
      copy_message.attr('id','copy_message');
      copy_message.addClass('message');
      copy_message.appendTo('#panel');
      copy_message.fadeOut(3000);
    }
    catch(err){
      console.log(err);
    }
  }

  //插入直角引号
  function quotation(){
    var quation = "「」"
    var content = $('#text').val();
    var index = content.length;
    $('#text').val(content + quation);
    $('#text').focus();
  }

  //简繁转换
  function convert(){

  }

  //截图并保存
  function save_img(){
    html2canvas(document.getElementById('panel'), {
        allowTaint: true,
        taintTest: false,
        onrendered: function (canvas) {
        $('#download').attr('href', canvas.toDataURL());
        $('#download').attr('download', canvas.toDataURL());
        $('#download').click();
      }
    });
  }

  //中英混排插入空格规则
  function insert_space(text) {
    // 英文、数字、符号 ([a-z0-9~!@#&;=_\$\%\^\*\-\+\,\.\/(\\)\?\:\'\"\[\]\(\)])
    text = text.replace(/([\u4E00-\u9FA5])([A-Za-z@#&;=_\[\$\%\^\*\-\+\(\/])/ig, '$1 $2');
    text = text.replace(/([A-Za-z#!~&;=_\]\,\.\:\?\$\%\^\*\-\+\)\/])([\u4E00-\u9FA5])/ig, '$1 $2');
    text = text.replace(/([0-9])([\u4E00-\u9FA5A-Za-z@#&;=_\[\$\%\^\*\-\+\(\/])/ig, '$1 $2');
    text = text.replace(/([\u4E00-\u9FA5A-Za-z#!~&;=_\]\,\.\:\?\$\%\^\*\-\+\)\/])([0-9])/ig, '$1 $2');
    return text;
  }

  //插入标点时启动中英混排
  $('#text').keyup(function(e){
    if(e.which == 188 || e.which == 190 || e.which == 186 || e.which == 97 || e.which == 111){
      var text = $('#text').text();
      text = insert_space(text);
      $('#text').text(text);
      focusOnLast();
    }
  });

  //编辑框的高度自动调节
  $('#text').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  function focusOnLast(){
    if (window.getSelection) {
      $('#text').focus();
      var range = window.getSelection();
      range.selectAllChildren(document.getElementById('text'));
      range.collapseToEnd();
    }
    else if (document.selection) {
      var range = document.selection.createRange();
      range.moveToElementText(document.getElementById('text'));
      range.collapse(false);
      range.select();
    }
  }

  //添加文字计数
  var txt0 = document.getElementById("text");
  var txtNum0 = document.getElementById("txtNum0");
  var chnIpt0 = false;

  txt0.addEventListener("keyup",function(){
    removeStyle();
    focusOnLast();
    if(chnIpt0 ==false){
      countTxt();
    }
  });
  txt0.addEventListener("compositionstart",function(){
    chnIpt0 = true;
  });
  txt0.addEventListener("compositionend",function(){
    chnIpt0 = false;
    countTxt();
  });
  function countTxt(){
    if(chnIpt0 == false){
      txtNum0.textContent = txt0.innerText.length;
    }
  }

  function removeStyle(){
    var str = $('#text').html();
    var re = /<[^>]+>/g;
    str = str.replace(re,"");
    $('#text').html(str);
  }

});








