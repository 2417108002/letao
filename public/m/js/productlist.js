$(function(){
    requestProduct();
    btnSearch();
    sortProduct();
    var searchCont;
    function requestProduct(){
        searchCont = getQueryString('search');
        ajaxRequest({proName: searchCont});
    }
    function ajaxRequest(parmas){
        parmas.proName = parmas.proName || '鞋';
        parmas.page = parmas.page || 1;
        parmas.pageSize = parmas.pageSize || 2;
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: parmas,
            dataType: 'json',
            success:function(obj){
                  console.log(obj);
                  let html = template('productTpl',obj);
                  $('.mui-card-content .mui-row').html(html);
            }
        });
    }

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
        return decodeURI(r[2]);
        }
        return null;
        }
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });

        function btnSearch(){
            $('.searchBtn').on('tap',function(){
                searchCont = $('.search').val().trim();
                if(searchCont.length == 0){
                    return;
                }
                ajaxRequest({proName: searchCont});
            });

       }

       function sortProduct(){
           $('.mui-card-header a').on('tap',function(){
               let type = $(this).data('type');
               let sort = $(this).data('sort');
               $(this).addClass('active').siblings().removeClass('active');
               if(sort == 1){
                   sort = 2;
                   $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
               }else{
                sort = 1;
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
               }
               $(this).data('sort',sort);
               var obj = {
                proName: searchCont,
                page: 1,
                pageSize: 2,
               }
               obj[type] = sort;
               ajaxRequest(obj);
           });
       }

       mui.init({
        pullRefresh : {
          container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down: {
            contentdown: "你正在下拉", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover: "可以松手了", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh: "哥正在拼命刷新中...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            // 下拉刷新的回调函数 触发了下拉刷新就执行回调
            callback: downRefresh
        },
        up: {
            contentrefresh: "哥正在拼命刷新中...",
            callback: upload
        }
        }
      });
 var page = 1;
      function downRefresh(){
        
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
       
      }
    function upload(){
        setTimeout(function(){
            
        });
        page++;
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: {
                page:page,
                proName: searchCont,
                pageSize: 2,
            },
            dataType: 'json',
            success:function(obj){
                  console.log(obj);
                  let html = template('productTpl',obj);
                  $('.mui-card-content .mui-row').append(html);
                  mui('#pullrefresh').pullRefresh().endPullupToRefresh();  
            }
        });
    }
    
});


