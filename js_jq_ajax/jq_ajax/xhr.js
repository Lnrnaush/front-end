//引入jquery库
document.write('<script type="text/javascript" src="jquery_min.js"></script>');

function useAjax()
{
	//选中id为"update_time"的标签,为其添加onclick时间
    $("#update_time").click
    (
		//当onclick发生时执行下面的函数
        function()
        {
			//使用jquery创建ajax的基本方法
            $.ajax
            (
                {
                    type: "GET",
                    url: "ajax_php.php?refresh=",
                    data: Math.random(),
                    dataType: "text",
                    success: function(data)
                    {
						//相当于document.getElementById("#time").innerHTML = data;
                        $("#time").html(data);
                    },
                    error: function()
                    {
                        alert("Falied!");
                    }
                }
            );
        }
    );
}

