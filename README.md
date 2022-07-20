# reportA-Tsel

## Originally developed by Muhammad Juan Pradana


## How To Use

**GET**

User Service
- [Using accessToken x-access-token on Header]
  - [http://host:port/datas]

    Get all datas on database

  - [http://host:port/datas/{SiteID}]

    Get detail data from site id
  
  - [http://host:port/SiteID]

    Get list of site id

- [Using key]
  - [http://host:port/{key}/datas]

    Get all datas on database

  - [http://host:port/{key}/datas/{SiteID}]

    Get detail data from site id
  
  - [http://host:port/{key}/SiteID]

    Get list of site id
    
    
**POST**

User Service
- [Using AuthToken x-access-token on Header]
  - [http://host:port/datas/filter]

    Filtering data, use body JSON.
    
    {"colls":[""],"condit":[{}]}
  
  - [http://host:port/addDatas]

    Adding data to database, use body JSON. [{"":""}]

- [Using key]
  - [http://host:port/{key}/datas/filter]

    Filtering data, use body JSON.
    
    {"colls":[""],"condit":[{}]}
  
  - [http://host:port/{key}/addDatas]

    Adding data to database, use body JSON. [{"":""}]
    
Authentication
- [http://host:port/auth/signup]
  Regist account (user, moderator, admin), use body JSON.
  
  {"username":"", "email":"", "password":"", "roles":[""]}
  
  If not using roles, will automatic set to user role.

- [http://host:port/auth/signin]

  Login account, use body JSON. {"username":"", "password":""}. Response is "roles" and "accessToken".
  
**PUT**

User Service
- [Using AuthToken x-access-token on Header]
  - [http://host:port/changeData/{SiteId}]

    Adding data, use body JSON. [{"":""}]

- [Using key]
  - [http://host:port/{key}/changeData/{SiteId}]

    Adding data, use body JSON. [{"":""}]
    
**DELETE**

User Service
- [Using AuthToken x-access-token on Header]
  - [http://host:port/datas/{SiteId}]

    Adding data, use body JSON. [{"":""}]

- [Using key]
  - [http://host:port/{key}/datas/{SiteId}]

    Adding data, use body JSON. [{"":""}]
    

## REST API DATA POTENSI
This is the backend that is used to interact with Data Potensi.

## requirement
- node js v.14.18
- git (optional)

## Installation With Node JS
- ```git clone https://github.com/juanpradana/reportA-tsel-API.git```
- ```cd reportA-tsel-API```
- ```npm install```
- ```npm run start```

for reset account
- ```npm run reset```

## Project Resource
- express (https://hapi.dev/)
- pg (https://node-postgres.com/)
- sequelize (https://sequelize.org/)
- bcryptjs (https://github.com/dcodeIO/bcrypt.js)
- jsonwebtoken (https://github.com/auth0/node-jsonwebtoken)


## API CONTRACTS
1. **Endpoint: '/datas'**
  - method: **GET**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Get all datas on database.
  - example request: **curl --request GET *'host:port/datas'**
  - example request: **curl -X GET http://host:port/datas -H "Content-Type: application/json" -H "x-access-token: accessToken"**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180070868-0765963e-659b-4fd4-8c2e-e2af8b1e4fb6.png)

2. **Endpoint: '/datas/:SiteID'**
  - method: **GET**
  - params: SiteID
  - query: *none*
  - response type: **application/json**
  - desc: Get detail data from site id.
  - example request: **curl -X GET http://host:port/datas/BKG013 -H "Content-Type: application/json" -H "x-access-token: accessToken"**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180071632-d89156b1-5917-4e75-98cc-ebbceeb6855b.png)

  
3. **Endpoint: '/SiteID'**
  - method: **GET**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Get list of site id.
  - example request: **curl -X GET http://host:port/SiteID -H "Content-Type: application/json" -H "x-access-token: accessToken"**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180072224-b3249701-5ade-4c63-9ee8-ab0f11a6d81b.png)

4. **Endpoint: '/datas/filter'**
  - method: **POST**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Filtering data, use body JSON.
  - example request: **curl -X POST http://host:port/SiteID -H "Content-Type: application/json" -H "x-access-token: accessToken" -d '{"colls": ["site_id", "site_name", "long", "lat", "program", "kab_kot"], "condit": [{"program": "Tulip 2021 (Batch#2)"}, {"kab_kot": "KOTA PEKANBARU"}]}'**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180083518-ffbe57e3-06c0-41fb-aa5f-4f6505637748.png)

  
5. **Endpoint: '/addDatas'**
  - method: **POST**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Adding data to database, use body JSON.
  - example request: **curl -X POST http://host:port/SiteID -H "Content-Type: application/json" -H "x-access-token: accessToken" -d '[{"Site_ID": "ASW34"}, {"Site_Name": "Schneider Batam"}, {"Long": "104.029006"}, {"Lat": "1.06718"}]'**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180084777-338d2f85-eab7-4a6f-a66b-10fbc0c7095b.png)


6. **Endpoint: '/auth/signup'**
  - method: **POST**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Regist account (user, moderator, admin), use body JSON. If not using roles, will automatic set to user role.
  - example request: **curl -X POST http://host:port/auth/signup -H "Content-Type: application/json" -d '{"username": "dwzan", "email": "dwzan@bro.com", "password": "12345678", "roles": ["user", "moderator", "admin"]}'**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180086114-a922481c-fe6b-4fe7-b4e7-8a4b42d0c209.png)

7. **Endpoint: '/auth/signin'**
  - method: **POST**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Login account, use body JSON. {"username":"", "password":""}. Response is "roles" and "accessToken".
  - example request: **curl -X POST http://host:port/auth/signin -H "Content-Type: application/json" -d '{"username": "kwcnan", "password": "12345678"}'**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180086817-bad12d6a-8055-4e0a-b604-25e8b9c0343a.png)
  
8. **Endpoint: '/changeData/:SiteId'**
  - method: **PUT**
  - params: SiteId
  - query: *none*
  - response type: **application/json**
  - desc: Adding data, use body JSON. [{"":""}]
  - example request: **curl -X PUT http://host:port/changeData/ASW34 -H "Content-Type: application/json" -H "x-access-token: accessToken" -d '[{"Site_Name": "goguru"}, {"Long": "105.037832"}, {"Lat": "2.73478923"}]'**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180088387-e5dc47a9-5fb2-4661-a297-23da4fc0163f.png)
  
9. **Endpoint: '/datas/:SiteId'**
  - method: **DELETE**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Adding data, use body JSON. [{"":""}]
  - example request: **curl -X DELETE http://host:port/changeData/ASW34 -H "x-access-token: accessToken" -H "Content-Type: application/json"**
  - example response:
  
    ![image](https://user-images.githubusercontent.com/30497994/180089878-368dc921-571f-457b-a915-b98425cc2f4a.png)

## Test Postman
collection https://www.getpostman.com/collections/b247874a2df4f3f8f72d
