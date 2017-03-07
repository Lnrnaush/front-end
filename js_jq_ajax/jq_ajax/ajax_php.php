<?php

if($_GET['refresh'])
{
    $the_time = date('Y-m-d, H:i:s', time());
    echo '<p>' .$the_time. '</p>';
}
