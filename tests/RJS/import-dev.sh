# rm -rf node_modules/acey
cd /Users/louis/Acey/acey
npm pack --yes
cd - 
mv /Users/louis/Acey/acey/acey-1.3.2.tgz .
tar -xvf acey-1.3.2.tgz
rm acey-1.3.2.tgz
mv package acey
mv acey node_modules/
# cd node_modules/acey
# yarn
# cd -
