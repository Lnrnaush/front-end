
$(
    function() {
        /*从数据库读取数据，然后添加到表格最后*/
          $.ajax
          (
              {
                  type: "GET",
                  url: "./deal/load_data.php?read=" + Math.random(),
                  dataType: "json",
                  success: function (json_data)
                  {
                      for (var count = 0; count < json_data.length; ++count) {
                          $("#tbl").append
                          (
                              "<tr>" +
                              "<td class='tdx'>" + json_data[count].name + "</td>" +
                              "<td class='tdx'>" + json_data[count].age + "</td>" +
                              "<td class='tdx'>" + json_data[count].msg + "</td>" +
                              "<td><a class=" + json_data[count].name +
                              " href='javascript:void(0)'>Change</a></td>" +
                              "<td><a class=" + json_data[count].name +
                              " href='javascript:void(0)'>Delete</a></td>" +
                              "</tr>"
                          );
                      }
                  },
                  error: function()
                  {
                      alert("Query falied!");
                  }
              }
          );

        /*为所有a标签绑定click, 并根据文本内容决定执行内容*/
        $("#tbl").on
        (
            "click", "a", function ()
            {
                var a_text = $(this).text();
                var a_class = $(this).attr("class");

                switch (a_text) {
                    //标签为内容为"Add"则增加一行
                    case "Add":
                        $("#tbl").append
                        (
                            "<tr>" +
                            "<td><input id='name' type='text' placeholder='name' value=''/></td>" +
                            "<td><input id='age' type='text' placeholder='age' value=''/></td>" +
                            "<td><input id='msg' type='text' placeholder='msg' value=''/></td>" +
                            "<td><a href='javascript:void(0)'>Submit</a></td>" +
                            "<td><a href='javascript:window.location.reload()'>Delete</a></td>" +
                            "</tr>"
                        );
                        break;

                    case "Submit":
                        $.ajax
                        (
                            {
                                url: "./deal/insert_row.php",
                                type: "POST",
                                data: {"name": $("#name").val(), "age": $("#age").val(), "msg": $("#msg").val()},
                                dataType: "text",
                                success: function(result)
                                {
                                    if(result == "True")
                                    {
                                        window.location.reload();
                                    }
                                    else if(result == "False")
                                    {
                                        alert(result);
                                    }
                                },
                                error: function()
                                {
                                    alert("Insert falied!");
                                }
                            }
                        );
                        break;

                    //当点击Change表格变为可修改, Change变为提交按钮
                    case "Change":
                        $(this).text("OK");
                        $(this).parent().siblings("td").each
                        (
                            function(index)
                            {
                                var old_val_str = "\"" + $(this).text() + "\"";
                                switch(index)
                                {
                                    case 0:
                                        $(this).html
                                        (
                                          "<input name='name' value='" + $(this).text() + "' type='text'" +
                                          "onblur='updateField(this.name, this.value, " + old_val_str + ")'" +
                                          "/>"
                                        );
                                        break;
                                    case 1:
                                        $(this).html
                                        (
                                            "<input name='age' value='" + $(this).text() + "' type='text'" +
                                            "onblur='updateField(this.name, this.value, " + old_val_str + ")'" +
                                            "/>"
                                        );
                                        break;
                                    case 2:
                                        $(this).html
                                        (
                                            "<input name='msg' value='" + $(this).text() + "' type='text'" +
                                            "onblur='updateField(this.name, this.value, " + old_val_str + ")'" +
                                            "/>"
                                        );
                                        break;
                                    default:
                                        break;
                                }
                            }
                        );
                        break;

                    case "OK":
                        window.location.reload();
                        break;

                    //标签内容为"Delete"则删除此行
                    case "Delete":
                        $.ajax
                        (
                            {
                                url: "./deal/delete_row.php",
                                type: "POST",
                                data: {"del_parm": a_class},
                                dataType: "text",
                                success: function (da)
                                {
                                    if (da == "true") {
                                        window.location.reload();
                                    }
                                    else if (da == "false") {
                                        alert("Falied!!");
                                    }
                                }
                            }
                        );
                        break;

                    case "Refresh":
                        window.location.reload();
                        break;

                    default:
                        break;
                }
            }
        );
    }
);

/*单个字段更新时用于onblur事件的函数*/
function updateField(field_name, new_value, old_value)
{
    $.ajax
    (
        {
            url: "./deal/update_field.php",
            type: "POST",
            data:{"field_name": field_name, "new_value": new_value, "old_value": old_value},
            dataType: "text",
            success:function(result)
            {
                if(result != "True")
                {
                    alert(result);
                }
            },
            error:function()
            {
                alert("updateField Error!");
            }
        }
    );
}
