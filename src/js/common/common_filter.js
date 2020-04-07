App.filter('customFilter', function() {
    return function(input, value , inputArr) {
      var result = [];
      if(value == undefined || value == ""){  
        result = input;
      }else{
        inputArr.forEach(function(item){
            if(item.fields.zip.indexOf(value) > -1){
                result.push(item);
            }
        });
      }
      return result;
    };
  });