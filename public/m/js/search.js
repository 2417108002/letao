

$(function(){
    searchHistory();
    addHistory();
    clearHistory();
    removeHistory();


function searchHistory(){
   
   $('.searchBtn').on('tap',function(){
    //    if(localStorage.getItem('searchHistory')){
    //        var arr = JSON.parse(localStorage.getItem('searchHistory'));
    //    }else{
    //        var arr = [];
    //    } 
    var arr = getHistory();
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
    // setHistory();
       addHistory();
       location = "productlist.html?search="+searchCont;
   });
};
 function addHistory(){
        // if(localStorage.getItem('searchHistory')){
        //     var arr = JSON.parse(localStorage.getItem('searchHistory'));
        // }else{
        //     var arr = [];
        // } 
        var arr = getHistory();
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
        // setHistory();
        addHistory();
    });
}

function getHistory(){
    if(localStorage.getItem('searchHistory')){
        var arr = JSON.parse(localStorage.getItem('searchHistory'));
    }else{
        var arr = [];
    } 
    return arr;
}

function setHistory(){
        localStorage.setItem('searchHistory',JSON.stringify(arr));
}
});
