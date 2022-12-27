# react-ts-app-template

React app template :
  - ViteJs 
  - eslint + eslint-config-airbnb : 
  ```
  npm i -D eslint 
  npx eslint --init
  npx install-peerdeps --dev eslint-config-airbnb
  ```

  NP : il faut ajouter eslint-config-airbnb/hooks dans eslintrc

  cf : https://www.npmjs.com/package/eslint-config-airbnb

  - eslint-config-airbnb-typescript 

  ```
  eslint-config-airbnb-typescript
  ```
NB: nécessite eslint-plugin et parser; cf : https://www.npmjs.com/package/eslint-config-airbnb-typescript

il faut ajouter ".eslintrc.cjs", dans  "include" du tsconfig.

- prettier : 
```
 npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

prettier config file :
