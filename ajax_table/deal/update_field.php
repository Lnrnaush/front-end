<?php

require_once('./mysql_package_class.php');

if(!empty($_POST['field_name']))
{
    if(!empty($_POST['new_value']))
    {
        if(!empty($_POST['old_value']))
        {
            $obj_pdo = new MysqlPDO;

            $result = $obj_pdo->updateField($_POST['field_name'], $_POST['new_value'], $_POST['old_value']);

            if($result === true)
            {
                echo "True";
            }
            else
            {
                echo $result;
            }
        }
        else
        {
            echo "old_value is none";
        }
    }
    else
    {
        echo "new_value is none";
    }
}
else
{
    echo "field_name is none";
}
