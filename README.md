פרויקט ניהול תקציבים והטבות לחיילים

מסדי נתונים:
 מונגו (רשומות): שומר את היסטוריית ההטבות של החייל.
 יותר נוח להוריד את כל המערך של הלקוח,
 לשנות ולכתוב את כולם חזרה בלי להסתבך עם אינדקסים. ולכן נדרש דאטהבייס יותר גמיש
 סופאבייס (תקציבים והוצאות): טבלאות  מתאימות יותר לחיבור נתונים וחישובים וגם רק בSQL אפשרי לעשות מפתח זר בגלל שזה בסיס נתונים רלציוני.

ישויות:

record (mdb): id, soldiered, unit, currentBenfitType, history(מערך).
budget(sb): id , unit , benefitType , month , allocatedAmount .
expenses(סופאבייס): id, budgetId( foreign key), amount , reason , createdAt.

נתיבים (Endpoints)

ניהול רשומות (מונגו)
POST /soldiers/:id/benefits: פותח תיק לחייל עם הטבה ראשונה. מחזיר 201 או 409.
GET /soldiers/:id/benefits: מביא את התיק וההיסטוריה. מחזיר 200  או 404.
PATCH /soldiers/:id/benefits: מחליף הטבה (סוגר נוכחית ופותח חדשה). מחזיר 200.

ניהול תקציבים (סופרבייס)
POST /budget: פותח תקציב חדש. מחזיר 201  או 409 אם התקציב כבר קיים ליחידה באותו חודש.
GET /budget: מביא רשימת תקציבים. מחזיר 200.
GET /budget/:id/transactions: מביא את כל ההוצאות של תקציב ספציפי. מחזיר 200  או 404 .
POST /budget/:id/spend: רושם הוצאה. בודק קודם שנשאר מספיק כסף בתקציב. מחזיר 201 או 400 .



מבנה קבצים:

app.js
README.md
.gitignore
package.json
package-lock.json
dal/
    budgetsDal.js
    expensesDal.js
    recordsDal.js
middlewares/
    middlewares.js
routes/
    budgetRouter.js
    recordRouter.js
services/
    budgetService.js
    recordService.js
dbConnection/
    supabaseConnection.js
    mongodbConnection.js
utils/
    utils.js

הוראות הרצה:
להרצת קונטיינר בדוקר:
 docker build .
 docker-compose up -d


להרצה בטרמינל:
npm run dev
או:
node --watch --env-file=.env app.js