$(function(){
    login();

    function login(){
         $('.btn-login').on('click',function(e){
             e.preventDefault();
             
             var username = $('.username').val().trim();
             var password = $('.password').val().trim();
             console.log(username);
             
             if(!username){
                 alert("用户名不能为空");
                 return;
             }

             if(!password){
                alert("密码不能为空");
                return;
             }

             $.ajax({
                 type:'post',
                 url:'/employee/employeeLogin',
                 data: {
                     username:username,
                     password:password
                 },
                 success:function(obj){
                     console.log(obj);
                     if(obj.success){
                         location = "./zhuye.html";
                     }else{
                         alert("账号或密码错误");
                     }
                 }
             });
         });
    }
});