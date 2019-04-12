var currentPage = 1;
var totalPages = 1;
$(function(){
    
    selectUser();
    selectcategoryList();
    selectImg();
    addproduct();
    // addCategory()
    function selectUser(){
        console.log(1);
        
         $.ajax({
             type:'get',
             url:'/category/querySecondCategoryPaging',
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
                 var html = template('secondTpl',obj);
                 $('.info tbody').html(html);
                //  updateUser();
                 totalPages = Math.ceil(obj.total / obj.size);
                 console.log(totalPages);
                 // 5. 得等请求完数据知道总页数才能初始化分页
                 initPage(selectUser);
                     
                 
             }
         });
    }
    function selectcategoryList(){
        $.ajax({
            url:'/category/queryTopCategory',
            success:function(obj){
                console.log(obj);
                var html = "";
                for (let i = 0; i < obj.rows.length; i++) {
                    
                    html += '<option value="'+obj.rows[i].id+'">'+obj.rows[i].categoryName+'</option>';
                }
                $('.select-category').html(html);
            }
        });
    }
    
    function selectImg(){
        $('.select-img').on('change',function(){
            var file = this.files[0];
            if(!file){
                alert("请选择一张图片");
                return;
            }
            var pic = URL.createObjectURL(file);
            $('.file-img').attr('src',pic);
        });
    }

    function addproduct(){
        $('.btn-save').on('click',function(){
            var categoryId = $('.select-category').val();
            var brandName = $('.brand-name').val().trim();
            
            if (!brandName) {
                alert('请输入品牌名称');
                return false;
            }
            console.log(brandName);
            var brandLogo = $('.file-img').attr('src');
            if (!brandLogo) {
                alert('请选择图片');
                return false;
            }
            console.log(brandLogo);
            $.ajax({
                type:'post',
                url: '/category/addSecondCategory',
                data:{
                    brandName: brandName,
                    categoryId:categoryId,
                    brandLogo:brandLogo,
                    hot:1
                },
                success:function(obj){
                    if(obj.success){
                        selectUser();
                    }
                }
            });
        });
    }

});