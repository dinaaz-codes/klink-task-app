# Klink Task App

Task assigned by Klink for the role of fullstack engineer.
- Upload CSV containing transactions (TxHash,dateTime,address,amount)
- Display transactions by wallet address
- Show total amount of the transactions

### App Link
- http://13.233.143.91:8000/
### Techstack
1. Laravel 9
2. React.js
3. MySQL
4. PhpUnit
5. Jest
### Run Server
```bash
composer install
npm install
npm run dev
php artisan serve
```
### Run Test
```bash
npm run test
php artisan test
#Test with coverge (note:xdebug is required)
php artisan test --coverage
```
### Test Screenshot
- Backend tests 
![Screenshot 2022-12-25 155500](https://user-images.githubusercontent.com/113454848/209464377-777b605c-8702-47ec-a031-632710d09480.png)
- Frontend tests


### Test Wallet address
- 0xdfd5293d8e347dfe59e90efd55b2956a1343963d
- 0x7abe0ce388281d2acf297cb089caef3819b13448
### Screenshots
- Upload CSV page
![upload_csv](https://user-images.githubusercontent.com/113454848/209404810-f4ef133a-ca42-4f92-98a0-f5e0b5149a68.png)

- List Transaction by wallet address page
![list](https://user-images.githubusercontent.com/113454848/209404658-eaf02209-ae72-43b3-9333-542491d0815f.png)

