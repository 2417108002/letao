var currentPage = 1;
var totalPages = 1;
$(function(){
    
    selectUser();
    function selectUser(){
        console.log(1);
        
         $.ajax({
             type:'get',
             url:'/user/queryUser',
             data: {
                 page: currentPage,
                 pageSize: 5,
             },
             success:function(obj){
                 console.log(obj);
                 if(obj.error){
                     alert("页面为渲染");
                     return;
                 }
                 var html = template('indexTpl',obj);
                 $('.info tbody').html(html);
                 updateUser();
                 totalPages = Math.ceil(obj.total / obj.size);
                 console.log(totalPages);
                 // 5. 得等请求完数据知道总页数才能初始化分页
                 initPage(selectUser);
                     
                 
             }
         });
    }

    function updateUser(){
        $('.btn-togle').on('click',function(){
            var id = $(this).data('id');
            var isdelete = $(this).data('isdelete');
            console.log(id);
            console.log(isdelete);
            isdelete = isdelete == 0 ? 1 : 0;
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data: {
                    id:id,
                    isDelete:isdelete
                },
                success:function(obj){
                    console.log(obj);
                    
                    if(obj.error){
                        alert("操作失败");
                        return;
                    }
                   selectUser();
                }
            });
            
        });
    }
});