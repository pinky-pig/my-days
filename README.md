
## 开发流程


### [√] 创建项目

```bash
npx create-expo-app@latest --template tabs@49
```

### [√] 安装依赖

```bash
# 进入项目安装依赖
npm i
# 安装 router 等
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
```

### [√] 修改命令

在 package.json 文件

```json
{
  "scripts": {
    "dev": "expo start",
    "clear": "expo start --clear",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest --watchAll"
  }
}
```

### [√] 启动

```bash
npx expo start
```

### [√] 添加 ESlint

#### 安装
```bash
npm i install eslint @antfu/eslint-config -D
```

#### 添加 ESLint 配置

```bash
echo '{
  "extends": [
    "@antfu"
  ],
  "overrides": [
    {
    "files": [
      "**/*.ts",
      "**/*.tsx"
    ],
    "rules": {
      "@typescript-eslint/no-require-imports": 0,
      "@typescript-eslint/consistent-type-definitions": 0
    }
    }
  ]
}' > .eslintrc

```

#### 添加 NPX 命令

格式化根目录 `.` ，如果格式化某个文件夹，比如 `app` ，那就是 `eslint app --fix --ext .ts,.tsx,.vue,.js,.jsx`

```json
{
  "scripts": {
    "lint": "eslint . --fix --ext .ts,.tsx,.vue,.js,.jsx"
  }
}
```

然后再 VSCode 查看右下角的 *\{}* ，点击，会有 popover，显示的会有一项 *ESLint* ，点击 *Open ESLint Output* ，就可以进入 ESLint 的输出。
如果成功的话，会显示 `ESLint server is starting.`。 
如果失败的话，看看输出问题，解决一下。

### [√] 添加 Path Alias

1. 修改 app.json 文件

```json
{
  "expo": {
    "experiments": {
      "typedRoutes": true,
      "tsconfigPaths": true
    }
  }
}
```

2. 修改 tsconfig.json 文件

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["app/*"],
      "~/*": ["./*"]
    }
  }
}
```

然后重启一下 VSCode ，因为有的时候配置完 tsconfig.json ， VSCode并没有及时响应。
然后再在文件中以 alias 引入后， ts 提示就能找到对应的文件了，如果不能找到，点不进对应的文件，说明 ts 的 alias 并没有生效。

3. 修改 babel.config.js 文件

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          '@/*': ['./app/*'],
          '~/*': ['./*'],
        },
      }],
      // Required for expo-router
      'expo-router/babel',
    ],
  }
}
```

添加的是 *'module-resolver'* ，这里面的 alias 的 value 值跟 tsconfig 中的 value 值多了 `./` 注意一下。
如果上一步 ts 的 alias 配置生效了，那么 babel 的配置完，清除缓存重新启动就okk了。

```bash
npm run clear
```


### [√ ｜ ×]添加 tailwindcss(twrnc & nativewind)


#### twrnc

配置开发提示

先在 VSCode 中下载安装 Tailwind CSS 依赖 `bradlc.vscode-tailwindcss`

然后在 VSCode 中添加配置，可以在项目的 settings 中配置，也可以在 GUI 中添加 Item，都一样的。

但是最后生效的点，是项目中有 tailwind.config.js 这个文件。

而且最最重要的是！！！这个文件要手动的创建！！！不能使用 echo 创建并写入！！！困扰了我一下午，虽然最后创建的几乎一样，我并不没有看出有什么区别～～～🥹但是脚本创建的改成手动创建就生效了。

```json
// .vscode/setting.json
{
  "tailwindCSS.classAttributes": ["class", "className", "style", "ngClass", "extra", "someOtherAttribute"]
}
```

1. 安装

```bash
npm i twrnc
```

2. 使用

直接 import ，然后在 style 中使用

#### nativewind
> https://www.nativewind.dev/quick-starts/expo

1. 安装
```bash
npm i nativewind
npm i -D tailwindcss@3.3.2
```

2. 配置

- 添加 tailwind 配置文件 和 postcss 配置文件（废弃 echo ，手动创建文件，并写入以下内容！！！）

```bash
echo 'module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}' > tailwind.config.js

echo 'module.exports = {
  plugins: {
    tailwindcss: {},
  },
};' > postcss.config.js
```

- 创建 `global.css` 并在根文件引入

```bash
mkdir styles; 
echo '@tailwind base;
@tailwind components;
@tailwind utilities;
' > styles/global.css
```

- 往 `babel.config.js` 文件中写入 `plugins`
```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      'nativewind/babel',
    ],
  }
}
```
