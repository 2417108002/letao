$(function(){
    resert()
function resert(){
    $('.btn-resert').on('tap',function(){
        var check = true ;
        mui(".mui-input-row input").each(function() {
            
            //若当前input为空，则alert提醒 
            if(!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑 
        if(check){
            mui.alert('验证通过!');
            var 
        }
    });
    
}
 




});

var letao = function(){

}

letao.prototype = {
          resert:function(){
            $('.btn-resert').on('tap',function(){
                 var check = true ;
                mui(".mui-input-row input").each(function() {
                   
                    //若当前input为空，则alert提醒 
                    if(!this.value || this.value.trim() == "") {
                        var label = this.previousElementSibling;
                        mui.alert(label.innerText + "不允许为空");
                        check = false;
                        return false;
                    }
                }); //校验通过，继续执行业务逻辑 
                if(check){
                    mui.alert('验证通过!')
                }
            });
          }
}