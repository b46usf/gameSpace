<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smahada Shooting Game Coming Soon</title>
    <link rel="stylesheet" href="style.css?v=<?php echo date('His')?>">
</head>
<body>
    <div class="container">
        <h1>Coming Soon!<br>Our Newest Website</h1>
        <p>While you wait, enjoy this mini-game!</p>
        <!-- Countdown Timer -->
        <div class="countdown">
            <h2>Launch In:</h2>
            <div id="timer">Loading...</div>
        </div>
        <!-- Mini Game Area -->
        <canvas id="gameCanvas" width="300" height="300"></canvas>
        <!-- Display Lives and Score -->
        <div class="game-info">
            <p style="display: inline;">Lives: <span id="lives">100</span></p>
            <p style="display: inline; margin-left: 20px;">Score: <span id="score">0</span></p>
        </div>
    </div>
    <script src="script.js?v=<?php echo date('His')?>"></script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KR0YB3871R"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KR0YB3871R');
</script>
</body>
</html>