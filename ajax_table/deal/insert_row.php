<?php

require_once('./mysql_package_class.php');

if(!empty($_POST['name']) && !empty($_POST['age']) && !empty($_POST['msg']))
{
    $obj_pdo = new MysqlPDO;

    //进行转义再存进数据库
    $str_name = addcslashes($_POST['name'], "'");
    $str_age = addcslashes($_POST['age'], "'");
    $str_msg = addcslashes($_POST['msg'], "'");

    $result = $obj_pdo->insertRow($str_name, $str_age, $str_msg);

    if($result === true)
    {
        echo "True";
    }
    else
    {
        echo "False";
    }
}
else
{
    echo 'parm error!';
}
