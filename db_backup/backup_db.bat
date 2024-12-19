@echo off
set "BACKUP_DIR=C:\ws\nanosoft-suite\db_backup"
set "PG_DUMP_PATH=C:\Program Files\PostgreSQL\16\bin\pg_dump.exe"  
rem Adjust if needed

rem Use date and time to uniquely name the backup file
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set TODAY=%%c%%a%%b)

"%PG_DUMP_PATH%" "postgresql://postgres:root@localhost:5432/nanosoft_suite" > "%BACKUP_DIR%\nanosoft_suite_%TODAY%.sql"
