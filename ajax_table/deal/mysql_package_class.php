<?php

//mysql相关操作的封装
class MysqlPDO
{
    private static $con = '';
    private $dsn = 'mysql:host=localhost;dbname=temp';
    private $username = 'root';
    private $password = 'root';

    function __construct()
    {
        try
        {
            @ self::$con = new PDO($this->dsn, $this->username, $this->password);
        }
        catch(PDOException $e)
        {
            die($e->getMessage());
        }
    }

    function queryData()
    {
        $sql_statement = 'select * from human';
        $prepare_result = self::$con->prepare($sql_statement);
        $execute_result = $prepare_result->execute();

        if($execute_result)
        {
            $result = $prepare_result->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }
        else
        {
            $result = $prepare_result->errorInfo()[2];
            return $result;
        }
    }

    function deleteRow($name='')
    {
        $sql_statement = 'delete from human where name=:name';
        $prepare_result = self::$con->prepare($sql_statement);
        $execute_result = $prepare_result->execute(Array(':name'=>$name));

        if($execute_result)
        {
            return true;
        }
        else
        {
            $result = $prepare_result->errorInfo()[2];
            return $result;
        }
    }

    function insertRow($name='', $age='', $msg='')
    {
        $sql_statement = 'insert into human(name, age, msg) values(:name, :age, :msg)';
        $prepare_result = self::$con->prepare($sql_statement);
        $execute_result = $prepare_result->execute(Array(':name'=>$name, ':age'=>$age, ':msg'=>$msg));

        if($execute_result)
        {
            return true;
        }
        else
        {
            $result = $prepare_result->errorInfo()[2];
            return $result;
        }
    }

    function updateField($field_name='', $new_value='', $old_value='')
    {

        $sql_statement = 'update human set '. $field_name . '= :new_value where ' . $field_name . '= :old_value';
        $prepare_result = self::$con->prepare($sql_statement);
        $execute_result = $prepare_result->execute(Array(':new_value'=>$new_value, ':old_value'=>$old_value));

        if($execute_result)
        {
            return true;
        }
        else
        {
            $result = $prepare_result->errorInfo()[2];
            return $result;
        }
    }
}
