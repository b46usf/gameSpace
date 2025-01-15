// Countdown Timer
const launchDate = new Date("December 31, 2024 00:00:00").getTime();

const countdown = setInterval(function () {
    const now = new Date().getTime();
    const timeRemaining = launchDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeRemaining < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "Website Innovatech!";
    }
}, 1000);

// Space Shooting Game
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let spaceshipX = canvas.width / 2 - 25;
let spaceshipY = canvas.height - 60;
const spaceshipWidth = 50;
const spaceshipHeight = 50;
let rightPressed = false;
let leftPressed = false;

let bullets = [];
let enemies = [];
const enemyWidth = 40;
const enemyHeight = 40;
let score = 0;
let lives = 100;

// Suara untuk tembakan, ledakan, dan backsound
const shootSound = new Audio('shoot.mp3');
const explosionSound = new Audio('explosion.mp3');
const backgroundMusic = new Audio('background-music.mp3');
backgroundMusic.loop = true; // Mengulang musik secara otomatis

// Memuat gambar pesawat dan musuh
const spaceshipImage = new Image();
spaceshipImage.src = 'spaceship-warna.png'; // Path ke gambar pesawat
const enemyImage = new Image();
enemyImage.src = 'enemy-warna.png'; // Path ke gambar musuh

let gameStarted = false; // Status permainan

// Preload suara ledakan untuk menghindari delay
explosionSound.load();

// Event listener untuk input keyboard
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", shootBullet, false);

// Fungsi untuk memperbarui tampilan nyawa di layar
function updateLives() {
    document.getElementById("lives").innerText = lives;
}

// Fungsi untuk memperbarui tampilan skor di layar
function updateScore() {
    document.getElementById("score").innerText = score;
}

// Fungsi ketika tombol ditekan
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === "Enter" && !gameStarted) {
        startGame(); // Mulai permainan ketika Enter ditekan
    }
}

// Fungsi ketika tombol dilepas
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Fungsi untuk menembakkan peluru
function shootBullet(e) {
    if (e.key === " " || e.key === "Spacebar") {
        bullets.push({ x: spaceshipX + spaceshipWidth / 2 - 2, y: spaceshipY, width: 4, height: 10 });
        shootSound.play(); // Mainkan suara tembakan
    }
}

// Fungsi untuk menggambar pesawat
function drawSpaceship() {
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight);
}

// Fungsi untuk menggambar peluru
function drawBullets() {
    bullets.forEach((bullet, index) => {
        ctx.beginPath();
        ctx.rect(bullet.x, bullet.y, bullet.width, bullet.height);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();

        bullet.y -= 5; // Gerakkan peluru ke atas

        // Hapus peluru yang melewati layar
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

// Fungsi untuk membuat musuh baru
function createEnemies() {
    if (Math.random() < 0.02 + score * 0.0001) {
        const enemyX = Math.random() * (canvas.width - enemyWidth);
        const enemySpeed = 2 + Math.random() * (score * 0.001);
        enemies.push({ x: enemyX, y: 0, width: enemyWidth, height: enemyHeight, speed: enemySpeed });
    }
}

// Fungsi untuk menggambar musuh
function drawEnemies() {
    enemies.forEach((enemy, index) => {
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);

        enemy.y += enemy.speed; // Gerakkan musuh ke bawah

        // Jika musuh mencapai dasar layar, nyawa berkurang
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            lives--;
            updateLives();
            if (lives === 0) {
                alert("Game Over! Final Score: " + score);
                document.location.reload();
            }
        }
    });
}

// Fungsi untuk memeriksa tabrakan antara peluru dan musuh
function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                explosionSound.currentTime = 0; // Mengatur ulang waktu suara untuk memastikan tidak ada delay
                explosionSound.play();
                score += 10;
                updateScore();
            }
        });
    });

    // Mengecek tabrakan antara spaceship dan enemy
    enemies.forEach((enemy, enemyIndex) => {
        if (
            spaceshipX < enemy.x + enemy.width &&
            spaceshipX + spaceshipWidth > enemy.x &&
            spaceshipY < enemy.y + enemy.height &&
            spaceshipY + spaceshipHeight > enemy.y
        ) {
            explosionSound.currentTime = 0; // Mengatur ulang waktu suara untuk memastikan tidak ada delay
            explosionSound.play(); // Suara ledakan
            lives -= 10; // Mengurangi nyawa
            updateLives();
            enemies.splice(enemyIndex, 1); // Hapus musuh setelah tabrakan
            if (lives <= 0) {
                alert("Game Over! Final Score: " + score);
                document.location.reload();
            }
        }
    });
}

// Fungsi utama game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas

    if (gameStarted) {
        drawSpaceship();
        drawBullets();
        drawEnemies();
        checkCollisions();
        createEnemies();

        // Gerakkan pesawat kiri/kanan
        if (rightPressed && spaceshipX < canvas.width - spaceshipWidth) {
            spaceshipX += 5;
        } else if (leftPressed && spaceshipX > 0) {
            spaceshipX -= 5;
        }
    } else {
        // Jika permainan belum dimulai, tampilkan pesan
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Tekan Enter untuk mulai", canvas.width / 2 - 120, canvas.height / 2);
    }

    requestAnimationFrame(draw);
}

// Fungsi untuk memulai game
function startGame() {
    gameStarted = true; // Set status permainan menjadi dimulai
    backgroundMusic.play().catch(error => {
        console.log("Playback failed: " + error);
    });
}

// Mulai menggambar, tetapi game tidak dimulai hingga ada interaksi pengguna
draw();