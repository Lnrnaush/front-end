<?php

require_once('./mysql_package_class.php');

$obj_pdo = new MysqlPDO;

$result = $obj_pdo->queryData();

//反转义
for($count = 0; $count < count($result); ++$count)
{
    $result[$count]['msg'] = stripcslashes($result[$count]['msg']);
}

$json_str = json_encode($result);

echo $json_str;

