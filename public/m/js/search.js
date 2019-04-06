

$(function(){
    searchHistory();
    addHistory();
    clearHistory();
    removeHistory();
//   function searchHistory(){
//       $('.searchBtn').on('tap',function(){
//           if(localStorage.getItem('searchHistory')){
//               var arr = JSON.parse(localStorage.getItem('searchHistory'));
//           }else {
//              var arr = []; 
//           }
//           console.log(localStorage.getItem('searchHistory'));
          
//          let searchCont = $('.search').val().trim();
//          if( searchCont.length == 0 ){
//              return;
//          }
//          for(let i = 0; i < arr.length;i++){
//             if(arr[i] == searchCont){
//                 arr.splice(i,1);
//                 i--;
//             }
//         }
//          arr.unshift(searchCont);
//          let json = JSON.stringify(arr);
//          localStorage.setItem('searchHistory',json); 
//          addHistory();
//       });
//   }

//   function addHistory(){
//      //将记录添加到列表
//      arr = JSON.parse(localStorage.getItem('searchHistory'));
//      for(let i = 0; i < arr.length;i++){
//          let html = template('searchTpl',{list:arr});
//          $('.record').html(html);
//      }
//   }




function searchHistory(){
   
   $('.searchBtn').on('tap',function(){
       if(localStorage.getItem('searchHistory')){
           var arr = JSON.parse(localStorage.getItem('searchHistory'));
       }else{
           var arr = [];
       } 
       let searchCont = $('.search').val().trim();
       if(searchCont.length == 0){
           return;
       }
       for (let i = 0; i < arr.length; i++) {
           if(arr[i] == searchCont){
               arr.splice(i,1);
               i--;
           }
           
       }
       arr.unshift(searchCont);
       let json = JSON.stringify(arr);
       localStorage.setItem('searchHistory',json);
       addHistory();
   });
};
 function addHistory(){
        if(localStorage.getItem('searchHistory')){
            var arr = JSON.parse(localStorage.getItem('searchHistory'));
        }else{
            var arr = [];
        } 
     let html = template('searchTpl',{list:arr});

     $('.search').val('');
     $('.record').html(html);
 };
 function clearHistory(){
    $('.btn-clear').on('tap',function(){
        $('.record').html('');
        localStorage.clear();
    });
}
function removeHistory(){
    $('.record').on('tap','.removeBtn',function(){
        let index = $(this).parent().data('suoyin');
        console.log(1);
       
        var arr = JSON.parse(localStorage.getItem('searchHistory'));
        for (let i = 0; i < arr.length; i++) {
            if(index == i){
                arr.splice(i,1);
            }
            
        }
        let json = JSON.stringify(arr);
        localStorage.setItem('searchHistory',json);
        addHistory();
    });
}
});
