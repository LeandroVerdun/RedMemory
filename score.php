<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "Red_Angel";
$password = "";
$dbbane = "red_game_score";


$conn = new mysqli($servername, $username, $password, $dbbane);


if($conn->connect_error) {
    die("Connection failed" , $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$score= $data['score'];
$time = $data['time'];


$stmt = $conn->prepare("INSERT INTO scores (name, score, time) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $name, $score, $time);


if($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Score saved successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error saving score"]);
}


$stmt->close();
$stmt->close();

?>