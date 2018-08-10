$(function(){
  $('#text').focus();
  // $('#text').height(window.innerHeight);

  var lastTag = 0;
  var curTag = 0;
  var pos = [0];

  function isChinese(temp){
    var re = /[^\u4e00-\u9fa5]/;
    if(re.test(temp)) return false;
    return true;
  }

  $('#text').keyup(function(e){
    if(e.which == 188 || e.which == 190 || e.which == 186 || e.which == 97 || e.which == 111){
      lastTag = curTag;
      curTag = $('#text').val().length;
      var preText = $('#text').val().substring(0, lastTag);
      var text = $('#text').val().substring(lastTag, curTag);
      // console.log(text);
      if(isChinese(text)) return;
      else{
        var array = text.split(/[^A-Za-z]/g);
        console.log(array);
        for(var i = 0; i < array.length; i++){
          if(array[i].length != 0){
            if(text.indexOf(" " + array[i] + " ") != -1) continue;
            else {
              if (text.indexOf(array[i]) == 0 && lastTag == 0 && curTag != array[i].length + 1){
                text = text.replace(array[i], array[i] + " ");
                continue;
              }
              if(text.indexOf(array[i]) == curTag - lastTag - array[i].length - 1){
                text = text.replace(array[i], " " + array[i]);
                continue;
              }
              if(text.indexOf(" " + array[i]) != -1) text = text.replace(array[i], array[i] + " ");
              else if(text.indexOf(array[i] + " ") != -1) text = text.replace(array[i], " " + array[i]);
              else text = text.replace(array[i], " " + array[i] + " ");
            }
          }
        }
      }
      $('#text').val(preText + text);
      curTag = $('#text').val().length;
      pos.push(curTag);
      console.log(pos);
    }
    else if(e.which == 8){
      var len = pos.length;
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








