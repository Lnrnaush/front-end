/*创建一个XMLHttpRequest对象*/
function createXHR()
{
    var obj_xhr = null;

    //判断是否支持ajax
    if(window.XMLHttpRequest)
    {
        obj_xhr = new XMLHttpRequest();

        return obj_xhr;
    }
    else
    {
        alert("The 'XMLHttpRequest' doesn't exist!");
    }
}

/*建立请求*/
function getContents()
{
    //指定请求页面
    var the_page = "ajax_php.php";
    //附带get参数以刷新缓存
    var the_num = Math.random();
    //指定请求url
    var the_url = the_page +"?refresh="+ the_num;

    //第三个参数默认为true,即为异步传输
    the_xhr.open("GET", the_url, true);
    //当状态改变时,执行回调函数
    the_xhr.onreadystatechange = returnContents;
    //send()可以发送post所需要的参数
    the_xhr.send(null);
}

/*处理返回内容*/
function returnContents()
{
    //当状态码为4且服务器返回200时,即可处理返回内容
    if(the_xhr.readyStete = 4)
    {
        if(the_xhr.status)
        {
            //返回的内容可以有"responseXML, responseText", 返回json也使用responseText
            var contents = the_xhr.responseText;
            document.getElementById("time").innerHTML = contents;
        }
        else
        {
            return false;
        }
    }
}
