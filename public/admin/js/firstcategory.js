var currentPage = 1;
var totalPages = 1;
$(function(){
    
    selectUser();
    addCategory()
    function selectUser(){
        console.log(1);
        
         $.ajax({
             type:'get',
             url:'/category/queryTopCategoryPaging',
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
                 var html = template('firstTpl',obj);
                 $('.info tbody').html(html);
                //  updateUser();
                 totalPages = Math.ceil(obj.total / obj.size);
                 console.log(totalPages);
                 // 5. 得等请求完数据知道总页数才能初始化分页
                 initPage(selectUser);
                     
                 
             }
         });
    }

    function addCategory(){
        
        $('.btn-save').on('click',function(){
              var category = $('.category').val().trim();
              if(!category){
                  alert('分类名不能为空');
                  return false;
              }
              $.ajax({
                  type: 'post',
                  url:'/category/addTopCategory',
                  data: {
                    categoryName:category
                  },
                  success:function(obj){
                      console.log(obj);
                      if(obj.success){
                        selectUser();
                      }
                  }
              });
        });
    }

});