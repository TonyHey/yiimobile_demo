react + webpack + koa2

#### Require:

* node(>4)
* npm(>2, recommend>3)
* webpack (npm install -g webpack)
* eslint, eslint-plugin-react (npm install -g eslint eslint-plugin-react)
* [yarn](https://yarnpkg.com/en/docs/install)
* nodemon (npm i -g nodemon)

#### Install

    yarn (recommend)

or
    npm install

### DEV

use nodemon to run koa2

    npm run dev
    can show source-map that original code in the developer tools of browser

#### PRODUCT

    npm run build

#### about webpack params:

```
--colors: print info with color, eg. red color for long period task
--profile: print the performance data, can check the time cost of each step
--display-modules: modules info which under the folder node_modules are disappear on console default, this para is to set to show them

```

##### notice

1. full lower-case && using concat string "-" for file, eg. file-name.js
2. initial capital && Camel-Case for component, eg. HomeComponent.jsx
3. lower-case && using concat string "_" for local variables, eg. const home_title = ""
4. full capital name globle variables,  eg. (global) const USER_NAME = ""
5. Camel-Case for method/function, eg. function homePage(){}
6. "tpl.html" for the file extension of view template, eg. index.tpl.html
7. <font color="#F10C0C" size=4 weight=700>Code Standard！！！ Check [.eslintrc.json](https://github.com/TonyHey/yiimobile_demo/blob/master/.eslintrc.json)</font>

#### other

* update yarn ` curl -o- -L https://yarnpkg.com/install.sh | bash `

### wiki

* [project instruction](https://github.com/TonyHey/yiimobile_demo/wiki/project-instruction)
