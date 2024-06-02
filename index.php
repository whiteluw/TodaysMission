<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>今日任务</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="task-container">
                <?php
                date_default_timezone_set("Asia/Shanghai");

                $file = 'missionlist.txt';
                $mission = "Error";
                $completedFile = 'completedCount.txt';
                $completedCount = 0;

                if (file_exists($file)) {
                    $missions = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                    if (count($missions) > 0) {
                        $mission = $missions[0];
                    }
                }

                if (file_exists($completedFile)) {
                    $completedCount = (int)file_get_contents($completedFile);
                }

                echo "<div id='mission' data-mission='$mission'></div>";
                ?>
                <div id="countdown-container">
                    <div id="time-label">剩余时间</div>
                    <div id="countdown"></div>
                    <svg id="progress-ring" width="180" height="180">
                        <circle id="progress-ring-bg" cx="90" cy="90" r="82" fill="transparent" stroke="#e5e5e5" stroke-width="16"/>
                        <circle id="progress-ring-fg" cx="90" cy="90" r="82" fill="transparent" stroke="#487ef4" stroke-width="16" stroke-dasharray="514.72" stroke-dashoffset="0"/>
                    </svg>
                </div>
                <?php if ($mission !== "Error"): ?>
                <button id="complete-btn">我已完成（<span id="completed-count"><?php echo $completedCount; ?></span>）</button>
                <?php endif; ?>
            </div>
        </div>
        <div class="footer">
            <hr>
            Since 2024
            <a href="https://github.com/whiteluw/TodaysMission" target="_blank">Power by whitelu</a>
        </div>
    </div>
</body>
</html>
