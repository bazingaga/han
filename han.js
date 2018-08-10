$(function(){
  $('#text').focus();
  // $('#text').height(window.innerHeight);

  $('#complete').click(function(){mixture();});
  $('#copy').click(function(){copy();});
  $('#quotation').click(function(){quotation();});
  $('#convert').click(function(){convert();});
  $('#image').click(function(){save_img();});

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

  function mixture(){
    var text = $('#text').val();
    text = insert_space(text);
    $('#text').val(text);
    $('#text').height($('#text').height() + 120);
  }

  function copy(){
    const input = document.querySelector('#text');
    input.select();
    try{
      document.execCommand('copy');
    }
    catch(err){
      console.log(err);
    }
  }

  function quotation(){
    var quation = "「」"
    var content = $('#text').val();
    var index = content.length;
    $('#text').val(content + quation);
    $('#text').focus();
  }

  function convert(){

  }

  function save_img(){
    html2canvas(document.getElementById('panel'), {
        allowTaint: true,
        taintTest: false,
        onrendered: function (canvas) {
        $('#download').attr('href', canvas.toDataURL());
        $('#download').attr('download', canvas.toDataURL());
        console.log(canvas.toDataURL());
        $('#download').click();
      }
    });
  }

  function insert_space(text) {
    console.log(text);
    // 英文、数字、符号 ([a-z0-9~!@#&;=_\$\%\^\*\-\+\,\.\/(\\)\?\:\'\"\[\]\(\)])
    text = text.replace(/([\u4E00-\u9FA5])([A-Za-z@#&;=_\[\$\%\^\*\-\+\(\/])/ig, '$1 $2');
    text = text.replace(/([A-Za-z#!~&;=_\]\,\.\:\?\$\%\^\*\-\+\)\/])([\u4E00-\u9FA5])/ig, '$1 $2');
    text = text.replace(/([0-9])([\u4E00-\u9FA5A-Za-z@#&;=_\[\$\%\^\*\-\+\(\/])/ig, '$1 $2');
    text = text.replace(/([\u4E00-\u9FA5A-Za-z#!~&;=_\]\,\.\:\?\$\%\^\*\-\+\)\/])([0-9])/ig, '$1 $2');
    return text;
  }

  $('#text').keyup(function(e){
    if(e.which == 188 || e.which == 190 || e.which == 186 || e.which == 97 || e.which == 111){
      var text = $('#text').val();
      text = insert_space(text);
      $('#text').val(text);
    }
  });
  
  $('#text').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

});








