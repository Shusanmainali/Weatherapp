<?php
// Step 1: Establish database connection
$serverName = "localhost";
$userName = "root";
$password = ""; // Default MySQL password for XAMPP
$conn = mysqli_connect($serverName, $userName, $password);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Step 2: Create the database (if not exists)
$createDatabase = "CREATE DATABASE IF NOT EXISTS prototype2testing";
mysqli_query($conn, $createDatabase);
mysqli_select_db($conn, "prototype2testing");

// Step 3: Create the weather table
$createTable = "CREATE TABLE IF NOT EXISTS weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100),
    humidity FLOAT NOT NULL,
    wind FLOAT NOT NULL,
    pressure FLOAT NOT NULL,
    temp FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
mysqli_query($conn, $createTable);

// Step 4: Get city name from URL
$cityName = isset($_GET['q']) ? $_GET['q'] : "Gadsden";

// Step 5: Check if data exists in the database (within the last 2 hour)
$query = "SELECT * FROM weather WHERE city = '$cityName' AND timestamp > NOW() - INTERVAL 2 HOUR";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) == 0) {
    // Step 6: Fetch data from the OpenWeather API
    $apiKey = "d0c23fea1640e4b22986ae67ce4d1ed4";
    $url = "https://api.openweathermap.org/data/2.5/weather?q=$cityName&appid=$apiKey&units=metric";
    $response = file_get_contents($url);
    $data = json_decode($response, true);

    if (isset($data['main'])) {
        // Extract data
        $temp = $data['main']['temp'];
        $humidity = $data['main']['humidity'];
        $wind = $data['wind']['speed'];
        $pressure = $data['main']['pressure'];

        // Insert into database
        $insertQuery = "INSERT INTO weather (city, temp, humidity, wind, pressure)
                        VALUES ('$cityName', '$temp', '$humidity', '$wind', '$pressure')";
        mysqli_query($conn, $insertQuery);

        // Prepare data for response
        $data = [
            "city" => $cityName,
            "temp" => $temp,
            "humidity" => $humidity,
            "wind" => $wind,
            "pressure" => $pressure
        ];
    } else {
        echo json_encode(["error" => "City not found or API error."]);
        exit;
    }
} else {
    // Fetch existing data
    $data = mysqli_fetch_assoc($result);
}

// Return the weather data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>