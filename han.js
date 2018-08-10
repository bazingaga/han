$(function(){
  $('#text').focus();
  // $('#text').height(window.innerHeight);

  var lastTag = 0;
  var curTag = 0;
  var pos = [0];

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

  $('#text').keyup(function(e){
    //win10默认输入法-todo
    if(e.which == 229){

    }
    if(e.which == 188 || e.which == 190 || e.which == 186 || e.which == 97 || e.which == 111){
      lastTag = curTag;
      curTag = $('#text').val().length;
      var preText = $('#text').val().substring(0, lastTag);
      var text = $('#text').val().substring(lastTag, curTag);
      console.log(text);
      var array = text.match(/[A-Za-z\s+]+/g);
      console.log(array);
      if(array != null){
        for(var i = 0; i < array.length; i++){
          if(array[i].indexOf('\n') != -1) continue;
          if(text.indexOf(array[i]) + array[i].length + lastTag + 1 == curTag){
              if(pos[pos.length - 1] == text.indexOf(array[i]) - 1) continue;
              if(text.indexOf(array[i]) == 0 && lastTag == 0) text = text.replace(array[i], array[i].replace(/(^\s*)|(\s*$)/g, ""));
              else text = text.replace(array[i], " " + array[i].replace(/(^\s*)|(\s*$)/g, ""));
          }
          else if(text.indexOf(array[i]) == 0 && lastTag == 0){
              text = text.replace(array[i], array[i].replace(/(^\s*)|(\s*$)/g, "") + " ");
          }
          else{
              text = text.replace(array[i], " " + array[i].replace(/(^\s*)|(\s*$)/g, "") + " ");
          }
        }
        $('#text').val(preText + text);
      }
      curTag = $('#text').val().length;
      pos.push(curTag);
      console.log(pos);
    }
    else if(e.which == 8){
      var len = pos.length;
      console.log($('#text').val().length);
      console.log(pos[len - 1]);
      if($('#text').val().length < pos[len - 1]){
        var index = -1;
        for(var i = 0; i < pos.length; i++){
          if(pos[i] >= curTag){
            lastTag = pos[i - 1];
            index = i;
            break;
          }
        }
        if(index > 0){
          pos.splice(index, len - index);
          curTag = lastTag;
        }
        console.log(pos);
      }
    }
  });

  

  $('#text').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

});








