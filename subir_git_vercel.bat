@echo off
cd /d "C:\Users\AVELL\meu-portfolio2"  
echo Atualizando repositorio...
git add .
set /p commitMessage=Digite o nome do commit: 
git commit -m "%commitMessage%"
git push origin master
vercel --prod --force
echo  Deploy concluído!
cmd /k