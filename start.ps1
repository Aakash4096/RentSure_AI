Write-Host "Starting RentSure..." -ForegroundColor Green

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; Write-Host 'Backend starting...' -ForegroundColor Yellow; npm run dev"

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; Write-Host 'Frontend starting...' -ForegroundColor Cyan; npm run dev"

Write-Host "Done! Backend: http://localhost:5000 | Frontend: http://localhost:5173" -ForegroundColor Green