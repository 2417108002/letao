  categoryLeft();
  tz(1);
  mui('.category-list .mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false,
    });
    mui('.product-list .mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    function categoryLeft(){
         $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        dataTtype:'json',
        success:function(obj){
            console.log(obj);
            let html = template('categoryLeftListTpl',obj);
            $('.categoryListUl').html(html);
            toggleRightCategory();
        }
    });
    
    }
   


 function toggleRightCategory(){
     let lis = $('.categoryListUl li');
     console.log(lis);
     lis.on('tap',function(){
         let id = $(this).data('id');
         tz(id);
     });
 }
    function tz(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{id:id},
            dataTtype:'json',
            success:function(obj){
                console.log(obj);
                let html1 = template('categoryRightListTpl',obj);
                $('#brand .mui-row').html(html1);
           }
       
        });

        $('.categoryListUl a').eq(id-1).addClass('active').parent().siblings().find('a').removeClass('active');
     }  
