<!--
 * @Author: chenzhongsheng
 * @Date: 2025-08-14 19:23:48
 * @Description: Coding something
-->
npm ci
npm run install-server
npm start

cd webdriver-ts-results
npm ci

cd frameworks/non-keyed/vue
npm ci
npm run build-dev
npm run build-prod

cd webdriver-ts
npm ci
npm run compile
npm run bench keyed/vanillajs
npm run results


http://localhost:8080/webdriver-ts-results/table.html