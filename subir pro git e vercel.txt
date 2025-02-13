@echo off
set /p commitMessage=Digite o nome do commit: 

echo.
echo ⏳ Adicionando arquivos ao Git...
git add .

echo.
echo 📝 Criando commit...
git commit -m "%commitMessage%"

echo.
echo 🚀 Enviando para o GitHub...
git push origin master

echo.
echo 🌎 Publicando no Vercel...
vercel --prod --force

echo.
echo ✅ Deploy finalizado! Pressione qualquer tecla para sair.
pause >nul
