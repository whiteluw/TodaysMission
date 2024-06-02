<?php
date_default_timezone_set("Asia/Shanghai");

$file = 'missionlist.txt';
if (file_exists($file)) {
    $missions = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (count($missions) > 0) {
        array_shift($missions);
        file_put_contents($file, implode(PHP_EOL, $missions));
    }
}
