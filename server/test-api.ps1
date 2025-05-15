# test-api.ps1

function Print-Section($title) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host $title -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
}

Print-Section "API Health Check"
try {
    $health = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing
    Write-Host "Health Check Response: $($health.Content)"
} catch {
    Write-Host "Health check failed!" -ForegroundColor Red
}

# === CATEGORIES ===
Print-Section "Testing Categories"

# POST Category
$categoryName = "Starters"
Write-Host "Adding new category: $categoryName"
$body = @{ category_name = $categoryName } | ConvertTo-Json
try {
    $postResp = Invoke-WebRequest -Uri "http://localhost:5000/api/categories" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    $cat = $postResp.Content | ConvertFrom-Json
    Write-Host "Added category ID $($cat.category_id): $($cat.category_name)"
} catch {
    Write-Host "Failed to add category: $_.Exception.Message" -ForegroundColor Red
}

# GET All Categories
Write-Host "Fetching all categories..."
try {
    $getResp = Invoke-WebRequest -Uri "http://localhost:5000/api/categories" -UseBasicParsing
    $categories = $getResp.Content | ConvertFrom-Json
    $categories | Format-List
} catch {
    Write-Host "Failed to fetch categories: $_.Exception.Message" -ForegroundColor Red
}

# GET Category by Name
Write-Host "Fetching category by name: $categoryName"
try {
    $getByName = Invoke-WebRequest -Uri "http://localhost:5000/api/categories/by-name/$categoryName" -UseBasicParsing
    $result = $getByName.Content | ConvertFrom-Json
    $result | Format-List
} catch {
    Write-Host "Failed to fetch category by name: $_.Exception.Message" -ForegroundColor Red
}

# === BOOKINGS ===
Print-Section "Testing Bookings"

# POST Booking
$bookingName = "Jane Doe"
Write-Host "Adding booking for: $bookingName"
$body = @{
    customer_name = $bookingName
    booking_date = "2025-04-06"
    booking_time = "19:30"
    guests = 6
} | ConvertTo-Json

try {
    $bookResp = Invoke-WebRequest -Uri "http://localhost:5000/api/bookings" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    $booking = $bookResp.Content | ConvertFrom-Json
    Write-Host "Booking created: $($booking.customer_name) on $($booking.booking_date)"
} catch {
    Write-Host "Failed to create booking: $_.Exception.Message" -ForegroundColor Red
}

# GET All Bookings
Write-Host "Fetching all bookings..."
try {
    $getAllBookings = Invoke-WebRequest -Uri "http://localhost:5000/api/bookings" -UseBasicParsing
    $bookings = $getAllBookings.Content | ConvertFrom-Json
    $bookings | Format-List
} catch {
    Write-Host "Failed to fetch bookings: $_.Exception.Message" -ForegroundColor Red
}

# GET Booking by Name
Write-Host "Fetching bookings by customer name: $bookingName"
try {
    $byName = Invoke-WebRequest -Uri "http://localhost:5000/api/bookings/by-name/$bookingName" -UseBasicParsing
    $result = $byName.Content | ConvertFrom-Json
    $result | Format-List
} catch {
    Write-Host "Failed to fetch bookings by name: $_.Exception.Message" -ForegroundColor Red
}

# GET Booking by Date
$date = "2025-04-06"
Write-Host "Fetching bookings by date: $date"
try {
    $byDate = Invoke-WebRequest -Uri "http://localhost:5000/api/bookings/by-date/$date" -UseBasicParsing
    $result = $byDate.Content | ConvertFrom-Json
    $result | Format-List
} catch {
    Write-Host "Failed to fetch bookings by date: $_.Exception.Message" -ForegroundColor Red
}

# === MENU ITEMS ===
Print-Section "Testing Menu Items"

# GET All Menu Items
Write-Host "Fetching all menu items..."
try {
    $menuItems = Invoke-WebRequest -Uri "http://localhost:5000/api/menu" -UseBasicParsing
    $items = $menuItems.Content | ConvertFrom-Json
    if ($items.Count -eq 0) {
        Write-Host "No menu items found (this is normal if the table is empty)."
    } else {
        $items | Format-List
    }
} catch {
    Write-Host "Failed to fetch menu items: $_.Exception.Message" -ForegroundColor Red
}

# GET Menu Items by Category ID
$categoryId = 1
Write-Host "Fetching menu items for category ID: $categoryId"
try {
    $byCategory = Invoke-WebRequest -Uri "http://localhost:5000/api/menu/$categoryId" -UseBasicParsing
    $result = $byCategory.Content | ConvertFrom-Json
    if ($result.Count -eq 0) {
        Write-Host "No items found for this category."
    } else {
        $result | Format-List
    }
} catch {
    Write-Host "Failed to fetch menu items by category: $_.Exception.Message" -ForegroundColor Red
}

Print-Section "Test Completed!"