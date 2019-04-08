$(function(){
    selectCar();
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
});