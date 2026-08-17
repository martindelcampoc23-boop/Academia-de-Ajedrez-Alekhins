@echo off
echo Agregando cambios a Git...
git add .
git commit -m "Update project files"
echo Subiendo a GitHub...
git push origin main
echo.
echo ¡Proceso finalizado con éxito!
