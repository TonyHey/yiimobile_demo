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
3. lower-case && Camel-Case for local variables, eg. const homeTitle = ""
4. full capital name globle variables,  eg. (global) const USER_NAME = ""
5. Camel-Case for method/function, eg. function homePage(){}
6. "tpl.html" for the file extension of view template, eg. index.tpl.html
7. <font color="#F10C0C" size=4 weight=700>Code Standard！！！ Check [.eslintrc.json](https://github.com/Tours4Fun/mobile_web_t4f/blob/develop/.eslintrc.json)</font>
8. If you are getting error("eslint: command not found") while commit code , you can change in your git hook ("\.git\hooks\pre-commit") `eslint` to `npm run lint`


#### other

* update yarn ` curl -o- -L https://yarnpkg.com/install.sh | bash `

## Application Structure

```
|—— client 				        # Application source code
|	|—— assets				# Assets required to render components
|	|—— common				# Global Reusable code
|	|	|—— api				# Ajax request interface
|   |   |   |——dev.js       # configuration for dev environment, create locally
|   |   |   └── ...         # other configuration
|	|	|—— components			# Global Reusable Presentational Components
|	|	|—— lib			        # Static library
|	|	|—— redux			# Redux state container (use by store, actions, reducers, constans)
|	|	|—— root			# Application root container & redux dev tool
|	|	└── tool			# Global Reusable util code
|	|—— containers				# Application view containers
|	|	|—— home			# Single view container
|	|	|	|—— components           # components that home includes
|	|	| 	|—— less                # Style for home
|	|	|	└── index.js            # home view-controller(containers)
|	|	|── ...				# Other view containers ...
|   |   |── public                              # Public resources
|   |   |       |── img                         # imgs
|   |   |       |── style                       # styles
|   |   └─routes				# Application routes with require.ensure
|   |      |──...               # detail routes
|   |      └─index.js           # combine routes
|	|── index.js				# Bootstrap main application routes with store
|	└── routes.js				# Application routes with require.ensure
|—— dist					# Production code after build
|	|—— client
|	└── server
|—— server					# Server source code
|	|—— controllers				# Server interface function
|	|—— lib					# library function
|	|—— middlewares				# Isomorphic middlewares
|	|—— routers				# Public route loading method
|	|—— config.js				# Public configuration
|	|── index.js				# Bootstrap server
|	|── server.dev.js			# configuration for Development environment
|	└── server.prod.js			# configuration for Production environment
|—— views					# Main HTML page container for app
|	└── tpl
└── webpack					# configuration for webpack
	|── CodeCheckPlugin.js
	|── webpack.dev.config.js
	└── webpack.prod.config.js

```

## Debug

```
npm run dev   			# enables nodemon for the server, will serves app at localhost:8080,
				# you can change the port in /server/config.js
```

## Style guide

Please follow the style guide for the mobile site.  

![ui-guide](https://cloud.githubusercontent.com/assets/6957203/26339740/bc430eae-3fa7-11e7-90b6-fd8bb0822ed7.jpg)