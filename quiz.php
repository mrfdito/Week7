<?php
// File: quiz.php

// Mengambil data dari file data.php
require 'data.php';

// Mengecek jika data player telah dikirim
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $playerName = htmlspecialchars($_POST['playerName']);
    $playerNIM = htmlspecialchars($_POST['playerNIM']);
} else {
    // Jika form belum disubmit, redirect kembali ke form
    header("Location: index.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Application</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div id="quizScreen" class="screen active">
            <h1>Selamat Datang, <?php echo $playerName; ?>!</h1>
            <p>NIM: <?php echo $playerNIM; ?></p>
            <form action="submit.php" method="POST">
                <?php
                // Menampilkan soal-soal dari data quiz
                foreach ($quizData as $index => $question) {
                    echo "<div class='question'>";
                    echo "<p><strong>Question " . ($index + 1) . ":</strong> " . $question['question'] . "</p>";
                    
                    if ($question['type'] === 'multiple') {
                        foreach ($question['options'] as $option) {
                            echo "<label>
                                    <input type='radio' name='question{$index}' value='{$option}' required> {$option}
                                  </label><br>";
                        }
                    } else {
                        echo "<label>
                                <input type='text' name='question{$index}' required>
                              </label><br>";
                    }
                    echo "</div>";
                }
                ?>
                <button type="submit" class="btn">Submit Quiz</button>
            </form>
        </div>
    </div>
</body>
</html>
