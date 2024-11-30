set timestamp=%DATE:/=-%_%TIME::=-%
set timestamp=%timestamp: =%
set arg1=%1
set arg1WithoutQuotes=%arg1:"='%
set commit_msg="Optimizations at %timestamp% %arg1WithoutQuotes%"
git status
git add src/*
git add *.json
git add *.ts
git add pnpm-lock.yaml
git add prisma/*
git add push_to_git.bat
git commit -m %commit_msg%
git push origin master
git status

