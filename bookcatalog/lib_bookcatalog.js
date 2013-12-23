var Table = require("cli-table");
var table = new Table({
  head : ['ISBN','PRICE','AUTHOR','TITLE','PUBLISHER','PAGES'],
  colWidths:[10,10,20,20,20,10]
});
var bookcatalog ={};

//.............. converting string to object form ...........................

bookcatalog.string_to_object=function(input){
  var input=input.split(';');
  var userInput={isbn:'',price:'',author:'',title:'',publisher:'',pages:''};
  input.forEach(function(x){
    var bookRecord=x.split(':');
    if(bookRecord[1])
    bookRecord[1]=bookRecord[1].trim();
    if(Is_it_option(bookRecord[0]))
    {userInput[bookRecord[0]]=bookRecord[1]}
    });
    return userInput;
};

//.............. book add ......................................................

bookcatalog.AddBookInfo= function(input,connection){
  var userData=bookcatalog.string_to_object(input);
   connection.query('INSERT INTO test.book_catalog VALUES("'+userData.isbn+'","'+userData.price+
    '","'+userData.author+'","'+userData.title+'","'+userData.publisher+'","'+userData.pages+'")',function(err,fields,row){
    if(err) throw err.code;
  });
   table.push(
          [userData.isbn,userData.price,userData.author,userData.title,userData.publisher,userData.pages]    
    )
   console.log(table.toString());
  return {message:''};
}

//......................delete book ..............................................

bookcatalog.deleteBookInfo = function(input,connection){
  connection.query('delete from book_catalog where isbn = "'+input+'"',function(err,fields,row){
    if(err) throw err.code;
  });
  return {message: '\n Book deleted with isbn no "'+input+'"'};
}

//............................ show book from catalog ...............................

bookcatalog.showinventoryData = function(connection){
    connection.query('select * from book_catalog',function(err,row,fields){
     row.forEach(function(x)
     {
       table.push(
          [x.isbn,x.price,x.author,x.title,x.publisher,x.pages])
    });
    console.log(table.toString());
  }) 
  return {message:''};
};
//............................ update book detail....................................

bookcatalog.update_book_detail=function(record,connection){  
  var isbn=record.split(';')[0].split(':')[1];
  var bookField = record.split(';')[1].split(':')[0];
  var newValue = record.split(';')[1].split(':')[1];
  var query = 'update book_catalog set '+bookField+'="'+newValue+'" where isbn = "'+isbn+'"';
  connection.query(query,function(err,row){
    if(err) throw err.code;
    })
  return {message:'updated sucessfully'};
}

//............................. search all books matching the information ..............

bookcatalog.search_from_whole_catalog=function(valueToBeSearched,connection){
  var query = "Select * from book_catalog where Concat(isbn,price,author,title,publisher,pages) like \"%"+valueToBeSearched+"%\";"
  connection.query(query,function(err,row){
    if(err) throw err.code;
    row.forEach(function(x){
      table.push(
      [x.isbn,x.price,x.author,x.title,x.publisher,x.pages])
    });
    console.log(table.toString());
  })
  return {message:''};
  };

//.............................. search from specific bookkey.......................

bookcatalog.search_by_a_specific_bookKey=function(BookKey,valueToBeSearched,connection){
  var BookKey=BookKey.substring(1,BookKey.length);
  var query = 'select * from book_catalog where '+BookKey+' = "'+valueToBeSearched+'"';
  connection.query(query,function(err,row){
    if(err) throw err.code;
    row.forEach(function(x){
    table.push(
    [x.isbn,x.price,x.author,x.title,x.publisher,x.pages])
    });
    console.log(table.toString());
  })
  return {message:''};
};

// ........................... cheaking valid options ...............................

var Is_it_option=function(option){
  var validOptions='isbn price author title publisher pages pages search'.split(' ')
  return validOptions.some(function(x){
    return x==option;
  })
};

// ......................converting from string formet to object form ................

bookcatalog.string_to_object=function(input){
  var input=input.split(';');
  var userInput={isbn:'',price:'',author:'',title:'',publisher:'',pages:''};
  input.forEach(function(x){
    var bookRecord=x.split(':');
    if(bookRecord[1])
    bookRecord[1]=bookRecord[1].trim();
    if(Is_it_option(bookRecord[0]))
    {userInput[bookRecord[0]]=bookRecord[1]}
    });
    return userInput;
};

//..................... cheaking for valid oprations ..........................

bookcatalog.cheakForInvalidOperations=function(userInput){
  var validInputs= 'add remove list update search'.split(' ');
  return validInputs.every(function(x){
    return x!=userInput;
  });
};

//......................... geting input from user .............................

bookcatalog.getUserInput=function(args,connection){
  var opration=args[0];
  if(opration==null)return {message:'Usage: bookcatalog [OPTION]... [DATA]...\nFor more Information go to help (--h or --help)'};
  if(bookcatalog.cheakForInvalidOperations(opration)==true)return {message:'invalid option'};
  var result={};
  result['add']=function(){return bookcatalog.validateUserInput_add(args,connection);}
  result['remove']=function(){return bookcatalog.validateUserInput_remove(args,connection);}
  result['list']=function(){return bookcatalog.validateUserInput_list(args,connection);}
  result['update']=function(){return bookcatalog.validateUserInput_update(args,connection);}
  result['search']=function(){return bookcatalog.validateUserInput_search(args,connection);}
  return result[opration]();
  };

//......................validation for every oprations .................................

bookcatalog.validateUserInput_add=function(args,connection){
  if(args.slice(1,args.length).join("")=='')return {message:'Add Needs Book Info.\nUsage: [add] [book Information]'};
  args[1]=args[1].trim();
  if(args[1].indexOf('isbn:')<0)return {message:'Book must contain a isbn'};
  if(bookcatalog.string_to_object(args[1]).isbn.trim()=='')
    return {message:'isbn needs a value'};
  return bookcatalog.call_Add_to_Catalog(args,connection);
  };
bookcatalog.validateUserInput_remove=function(args,connection){
  if(args.slice(1,args.length)[0]!=='-isbn')return {message:'Wrong input use (-isbn) to delete a book'};
  if(args.slice(1,args.length)[1]=='')return {message:'Remove Needs An ISBN to delete a book'};
  if(args.slice(1,args.length)[1]==undefined)return {message:'Give isbn a value to delete'};
  return bookcatalog.call_remove_from_Catalog(args,connection);
};
bookcatalog.validateUserInput_list=function(args,connection){
  if(args.length>1)return {message:'wrong input'};
  return bookcatalog.call_show_catalog(args,connection);
};
bookcatalog.validateUserInput_update=function(args,connection){
  if(args.slice(1,args.length).join("")=='')return {message:'Update Needs Book Info.\nUsage: [update] [isbn,column Name,new value]'};
    args[1]=args[1].trim();
    if(args.length<2)return {message:'wrong input'};
    if(args[1].indexOf('isbn:')<0)return {message:'Provide an ISBN number to update Book'};
    return bookcatalog.call_update_book_detail(args[1],connection);
};
bookcatalog.validateUserInput_search=function(args,connection){
  if(args.length<=1)return {message:'search needs a record'};
  if(args.length>2&&args.length<4){
    var BookKey=args[1];
    var valueToBeSearched=args[2];
    if(BookKey=='-isbn'||BookKey=='-price'||BookKey=='-author'||BookKey=='-title'||BookKey=='-publisher'||BookKey=='-pages'){
        return bookcatalog.call_search_book_key_in_catalog(BookKey,valueToBeSearched,connection);        
    }
    return {message:'Wrong Option, Use (-)with bookkey after search'};
  }
  return bookcatalog.call_search_catalog(args,connection);
};

//.................... calling function for performing oprations ......................

bookcatalog.call_Add_to_Catalog=function(args,connection){
  var callAdd=bookcatalog.AddBookInfo(args.slice(1,args.length).join(';'),connection);
  return callAdd;
};
bookcatalog.call_remove_from_Catalog=function(args,connection){
  var callRemove=bookcatalog.deleteBookInfo(args.slice(1,args.length)[1],connection);
  return callRemove;
};
bookcatalog.call_show_catalog=function(args,connection){
  var list = bookcatalog.showinventoryData(connection);
  return list;
};
bookcatalog.call_update_book_detail=function(args,connection){
  var result = bookcatalog.update_book_detail(args,connection);
  return result;
}
bookcatalog.call_search_catalog=function(args,connection){
  var result = bookcatalog.search_from_whole_catalog(args.slice(1,args.length)[0],connection);
  return result;
};
bookcatalog.call_search_book_key_in_catalog=function(BookKey,valueToBeSearched,connection){
  var result = bookcatalog.search_by_a_specific_bookKey(BookKey,valueToBeSearched,connection);
  return result;
};
exports.bookcatalog = bookcatalog;