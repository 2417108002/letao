$(function(){
    loginUser();

     function loginUser(){
       
        $('.btn-login').on('tap',function(){
            let returnUrl = getQueryString('returnUrl');
            let userName = $('.mui-input-clear').val().trim();
            let password = $('.mui-input-password').val().trim();
            console.log(userName);
            console.log(password);
            if(!userName){
                mui.toast('用户名不能为空',{ duration:'long', type:'div' }) ;
                return;
            };

            if(!password){
                mui.toast('密码不能为空',{ duration:'long', type:'div' }) ;
                return;
            };

            $.ajax({
                type:'post',
                url: '/user/login',
                data:{
                    username: userName,
                    password: password
                },
                success:function(obj){
                    console.log(obj);
                    if(obj.message == '用户名不存在!'){
                        mui.toast('用户名错误',{ duration:'long', type:'div' }) ;
                        return;
                    };
                    if(obj.message == '密码错误！'){
                        mui.toast('密码错误',{ duration:'long', type:'div' }) ;
                        return;
                    };
                        location = returnUrl;
                    
                    
                }
            });
        });
        
     }


    /**获取地址栏上传递过来的值
     * 
     * @param name 参数是发请求的键 
     */
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
        return decodeURI(r[2]);
        }
        return null;
    }  
});