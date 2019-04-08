$(function(){
    productDetails();
     var id;
     function productDetails(){
         id = getQueryString('id');
         console.log(id);
         $.ajax({
             type:'get',
             url: '/product/queryProductDetail',
             data: { 'id': id },
             dataType:'json',
             success:function(obj){
                
                 let min = +obj.size.split('-')[0];
                 let max = +obj.size.split('-')[1];
                 obj.size = [];
                 for (let i = min; i <= max; i++) {  
                     obj.size.push(i);
                 }
                  console.log(obj);
                 let html = template('detailsTpl',obj);
                 $('#main').html(html);
                 var gallery = mui('.mui-slider');
                 gallery.slider({
                 interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
                 });
                 mui(".mui-numbox").numbox();
                 $('.product-size button').on('tap',function(){
                     $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
                 });
                 addCar();
             }
         });
         
     }

     function addCar(){
        
         
         
         $('.btn-car').on('tap',function(){
            var size = $('.mui-btn.mui-btn-warning').data('size');
            console.log(size);
            var num = mui('.mui-numbox').numbox().getValue();
            console.log(num);
            
            if(!size){
                mui.toast('请选择尺码',{ duration:'long', type:'div' });
                return;
             }

             $.ajax({
                 type: 'post',
                 url:'/cart/addCart',
                 data:{
                     productId:id,
                     num: num,
                     size: size
                },
                success:function(obj){
                    console.log(obj);
                    if(obj.message == "未登录！"){
                        let returnUrl = location.href;
                        console.log(returnUrl);
                        
                        location = "./login.html?returnUrl="+returnUrl;
                        return;
                    }
                   
                        var btnArray = ['是', '否'];
                        mui.confirm('是否前往购物车？', '温馨提示', btnArray, function(e) {
                            if (e.index == 0) {
                                location = "./productCar.html";
                            } else {
                                mui.toast('请继续添加商品,么么哒',{ duration:'long', type:'div' });
                                return;
                            }
                        })
                    
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