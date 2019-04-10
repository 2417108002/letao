$(function(){
    slectUsetInfo();
    btnExit();
    function slectUsetInfo(){
         $.ajax({
             url:'/user/queryUserMessage',
             success:function(obj){
                 console.log(obj);
                
                 if(obj.error){
                     return;
                 }
                 $('.username').html(obj.username);
                 $('.mobile').html(obj.mobile);
             }
         });
    }

    function btnExit(){
        $('.btn-exit').on('tap',function(){
            $.ajax({
                url:'/user/logout',
                success:function(obj){
                    if(obj.error){
                        return;
                    }
                    location = "./login.html";
                }
            });
        });
    }
});