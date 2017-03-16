<?php

require_once('./mysql_package_class.php');

if(isset($_POST['del_parm']) && !empty($_POST['del_parm']))
{
    $obj_pdo = new MysqlPDO;

    $result = $obj_pdo->deleteRow($_POST['del_parm']);

    if($result === true)
    {
        echo 'true';
    }
    else
    {
        echo 'false';
    }
}
else
{
    echo "PARM NOT TRUE";
}
