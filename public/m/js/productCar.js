$(function(){
    selectCar();
    deleteBtn();
    exitBtn();
    
    var page = 1;
    //初始化
    function selectCar(){
        mui.init({
            pullRefresh : {
              container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback : PulldownToRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              },
              up: {
                contentrefresh: '正在加载...',
                callback: pullupRefresh
              }
            }
          });
    }

    function PulldownToRefresh(){
        $.ajax({
            type: 'get',
            url: '/cart/queryCartPaging',
            data: {
                page: 1,
                pageSize: 4
            },
            success:function(obj){
                console.log(obj);
                
                let html = template('carListTpl',obj);
                $('.mui-table-view').html(html);
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                page = 1;
                sum();
                $('.mui-table-view input').on('change',function(){
                    sum();
                });
            }
        });
    }
    function pullupRefresh(){
        page++;
        $.ajax({
            type: 'get',
            url: '/cart/queryCartPaging',
            data: {
                page: page,
                pageSize: 4
            },
            success:function(obj){
                console.log(obj);
                if(obj.data){
                    let html = template('carListTpl',obj);
                    $('.mui-table-view').append(html);          
                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                }else{
                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                }
               
            }
        });
    }

    function deleteBtn(){
        $('.mui-table-view').on('tap','.btn-delete',function(){
              var li = $(this).parents().parents();//li是jquery对象
            
              
                var btnArray = ['是', '否'];
                var id = $(this).data('id');
				mui.confirm('您确认要从购物车中移除该商品？', '温馨提示', btnArray, function(e) {
					if (e.index == 0) {
                        $.ajax({
                            url:'/cart/deleteCart',
                            data: {
                                id:id
                            },
                            success:function(obj){
                                if(obj.success){
                                    PulldownToRefresh()
                                }else{
                                    mui.toast('删除失败');
                                }
                            }
                        });
					} else {
						setTimeout(function() {
                            mui.swipeoutClose(li[0]);//转成dom对象
                        }, 0);
					}
				});
        });
    }

    function exitBtn(){
        $('.mui-table-view').on('tap','.btn-exit',function(){
            var li = $(this).parents().parents();//li是jquery对象
            var data = $(this).data('product');
            var btnArray = ['是', '否'];
            var min = +data.productSize.split('-')[0];
            var max = +data.productSize.split('-')[1];
            // 2.2 定义一个新的尺码数组来吧每个加进去
            data.productSize = [];
            // 2.3 循环从min开始到max结束 得包含max
            for (var i = min; i <= max; i++) {
                // 2.4 把每个i的值添加到数组里面
                data.productSize.push(i);
            }
            var html = template('editTpl',data);
            html = html.replace(/[\r\n]/g, '');
            mui.confirm(html, '编辑商品标题', btnArray, function(e) {
               
                if (e.index == 0) {
                   var size = $('.btn-size.mui-btn-warning').data('size');
                   var num = mui('.mui-numbox').numbox().getValue();
                   $.ajax({
                       type:'post',
                       url:'/cart/updateCart',
                       data:{
                           id:data.id,
                           size: size,
                           num:num
                       },
                       success:function(obj){
                           if(obj.success){
                            PulldownToRefresh()
                        }else{
                            mui.toast('修改失败');
                        }
                       }
                   });
                } else {
                    setTimeout(function() {
                        mui.swipeoutClose(li[0]);//转成dom对象
                    }, 0);
                }
            });
            mui(".mui-numbox").numbox();
            $('.product-size button').on('tap',function(){
                $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
            });
        });
    }

    function sum(){
        var sum = 0;
        var checkboxs = $('.mui-checkbox input:checked');
        console.log(checkboxs);
        checkboxs.each(function(index,value){
            var num = parseInt($(value).data('num')) ;
            var price = parseInt($(value).data('price'));
            console.log(num);
            console.log(price);
            sum += num * price;
        });
        
        $('.need-money').find('span').html(sum);
    }
});