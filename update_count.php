<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $completedCount = $data['completedCount'];

    $completedFile = 'completedCount.txt';
    file_put_contents($completedFile, $completedCount);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
