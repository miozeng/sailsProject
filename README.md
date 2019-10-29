# sails-project

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Fri Oct 18 2019 14:25:48 GMT+0800 (GMT+08:00) using Sails v1.2.3.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

### 官方文档
[sails document](https://sailsjs.com/documentation/concepts)

### 安装
``` 
npm install sails -g
检查版本号
sails -v
``` 

### 快速入门
#### 创建新项目
``` 
sails new sailsProject
cd sailsProject
sails lift
``` 
访问 http://localhost:1337

#### 安装mysql依赖
``` 
npm install sails-mysql
``` 

#### 创建一个 REST API
``` 
sails generate api user
sails lift
``` 
访问 http://localhost:1337/user

#### 启动项目也可以指定环境和端口

PORT=443 NODE_ENV=production sails lift

node app.js --prod



### 1.环境配置与部署
不同环境的配置文件定义在config/env/*内,按不同的环境启动服务
node app.js --prod
 
 更多部署的信息请查看[sails deployment](https://sailsjs.com/documentation/concepts/)
 

### 2.自定义配置 config/custom.js 
项目需要的一些配置信息，记录一些邮件信息，第三方接口的信息等
```
// config/custom.js
module.exports.custom = {
  mailgunDomain: 'transactional-mail.example.com',
  mailgunApiKey: 'key-testkeyb183848139913858e8abd9a3'
};
```

### 3.链接数据库
我们将数据库的信息配置在datastores.js 中，可以配置多个数据库
跟多关于各中类型的数据库的配置请参考 [数据库适配器](https://sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters)



### 4.model

#### 4.1关联关系
saisl的关联关系也包含多对多，多对一，一对一，单项关联等。
更多关于关联关系的使用请查看[associations](https://sailsjs.com/documentation/concepts/models-and-orm/associations)


#### 4.2.错误处理
再操作数据库如创建数据时报错的处理方式，请查看[errors](https://sailsjs.com/documentation/concepts/models-and-orm/errors)
```
await User.create({ emailAddress: inputs.emailAddress })
// Uniqueness constraint violation
.intercept('E_UNIQUE', (err)=> {
  return 'emailAlreadyInUse';
})
// Some other kind of usage / validation error
.intercept({name:'UsageError'}, (err)=> {
  return 'invalid';
});
```
以上也可以使用
```
try {
  await Something.create({…});
} catch (err) {
  // err.name
  // err.code
  // …
}
```


#### 4.3.attributes
属性的定义，文档参考[attributes](https://sailsjs.com/documentation/concepts/models-and-orm/attributes)

定义属性实例，参考user.js
默认的属性定义在model.js里面
```
attributes: {
  id: { type: 'number', autoIncrement: true },
  createdAt: { type: 'number', autoCreatedAt: true },
  updatedAt: { type: 'number', autoUpdatedAt: true },
}
```

  属性类型包括string；number；boolean；json；ref
  必填：required: true 
  设置默认值：defaultsTo: '111-222-3333'
  允许为空：allowNull: true
  字段名：columnName: 'number_of_round_rotating_things'
  加密：encrypt: true
  自增长： autoIncrement: true
  受否唯一：unique: true


#### 4.4.属性验证
参考：[validations](https://sailsjs.com/documentation/concepts/models-and-orm/validations)
```
starRating: {
  type: 'number',
  allowNull: true,
  min: 1,
  max: 5,
}
```

#### 4.5.model设置

customToJSON：自定义json转换方式
```
customToJSON: function() {
  // Return a shallow copy of this record with the password and ssn removed.
  return _.omit(this, ['password', 'ssn'])
}
```
tableName：指定表名
```
tableName: 'some_preexisting_table'
```
datastore: 指定数据库
```
datastore: 'legacyECommerceDb'
```
实例：指定数据库和表名
```
// api/models/User.js
module.exports = {
  datastore: 'rustyOldMySQLDatabase',
  tableName: 'our_users',
  attributes: {
   ...
  }
};
```

migrate：服务启动时的数据库处理策略
```
migrate: 'alter'
```

  safe	never auto-migrate my database(s). I will do it myself, by hand.
  alter	auto-migrate columns/fields, but attempt to keep my existing data (experimental)
  drop	wipe/drop ALL my data and rebuild models every time I lift Sails


dataEncryptionKeys：加密数据用到的key值，也可以指定每一年的不同的key值

cascadeOnDestroy: 关联删除
```
cascadeOnDestroy: true
```

primaryKey：指定主键
但是官方有句话：
You should never need to change this setting. Instead, if you need to use a custom primary key, set a custom columnName on the "id" attribute.

你不要改id的属性名，你可以定义一个columnName来对应数据库里面的名字


#### 4.6.查询：
##### 基础查询语句
```
var thirdPageOfRecentPeopleNamedMary = await Model.find({
  where: { name: 'mary' , occupation: { contains: 'teacher' } },
  skip: 20,
  limit: 10,
  sort: [{ firstName: 'ASC'}, { lastName: 'ASC'}]
});
```
in
```
var waltersAndSkylers = await Model.find({
  name : ['walter', 'skyler']
});
```
not in
```
 name: { '!=' : ['walter', 'skyler'] }
```
 
 Or 
 ```
 var waltersAndTeachers = await Model.find({
  or : [
    { name: 'walter' },
    { occupation: 'teacher' }
  ]
});
```

##### 支持'<' '<=' '>' '>=' '!=' nin in contains startsWith endsWith
```
Model.find({
  age: { '<': 30 }
});

Model.find({
  name: { in: ['foo', 'bar'] }
});

Course.find({
  subject: { startsWith: 'american' }
});
```
 查询选项
 limit；skip；sort

 ##### 新增
await Something.create(initialValues);

var createdRecord = await Something.create(initialValues).fetch();//有返回值

#### 4.7.Lifecycle callbacks
定义的是model方法的一些回调函数包括 [callbacks](https://sailsjs.com/documentation/concepts/models-and-orm/lifecycle-callbacks)

```
	Lifecycle callbacks on .create()
	beforeCreate: fn(recordToCreate, proceed)
	afterCreate: fn(newlyCreatedRecord, proceed)

	Lifecycle callbacks on .update()
	beforeUpdate: fn(valuesToSet, proceed)
	afterUpdate: fn(updatedRecord, proceed)

	Lifecycle callbacks on .destroy()
	beforeDestroy: fn(criteria, proceed)
	afterDestroy: fn(destroyedRecord, proceed)
```



### Blueprint 

Sails的blueprint是负责指挥每一条客户端请求应该分配到服务器端的哪个Action去 ,你可以理解成路由的"调度中心"
blueprint主要分为三种：RESTful routes、Shortcut routes、Action routes .在 config/blueprints.js 中选择关闭或者打开blueprint提供的路由.

### Blueprint api
[Blueprint api说明](https://sailsjs.com/documentation/reference/blueprint-api)
Blueprint actions(不要和blueprint action routes相混淆)是设计成与你的所有有相同名称的模型的控制器协同工作的通用动作(比如ParrotController将会需要一个Parrot的模型)。你可以将它们想象成你的应用中默认的行为。比如，如果你有一个User.js模型并且有一个空的UserController.js控制器，那么find,create,update,destroy, populate,add和remove的动作将会隐式的存在，不需要你去实现它们。
默认的blueprint RESTful routes和shortcut routes被绑定到它们对应的blueprint 动作中。但是任何blueprint动作都是可以通过在对应控制器的文件(比如ParrotController.find)中创建一个自定义的动作来为某一个特定的控制器重写.另外，你可以通过创建你自己定义的blueprint动作来在你的app中的任何地方重写blueprint动作(比如 api/blueprints/create.js)。
blueprint 设计了基于模型的通用操作

 如果你有一个 User.js model 然后就有了 find, create, update, destroy, populate, add 和 remove actions
 
 ##### Add ：添加一个关联对象
 
 PUT /:model/:id/:association/:fk     association：关联的字段名
 
  ##### Create ：创建对象

 POST /:model
 ```
 POST /pony

{
  "name": "Applejack",
  "hobby": "pickin",
  "involvedInPurchases": [13,25]
}
```

 ##### Destroy 
DELETE /:model/:id
```
DELETE /user/4
```

 ##### Find one
GET /:model/:id

 ##### Find 
GET /:model

包含选项：where  limit skip   sort  select  omit  populate
```
GET /purchase?sort=createdAt DESC&limit=30
```
 ##### Populate ：关联查询 
GET /:model/:id/:association

Find里面的选项对此方法同样可用

 ##### Remove 
DELETE /:model/:id/:association/:fk
```
DELETE /store/16/employeesOfTheMonth/7
```

 ##### Replace ：替换外键
PUT /:model/:id/:association
```
PUT /employee/7/involvedInPurchases
[47, 65]
```

 ##### Update ：修改记录
PATCH /:model/:id
```
PATCH /user/47
{
  "hobby": "kickin"
}
```


你也可以再model.js里面重写 以上的方法


 #### Blueprint Routes
 [Blueprint 配置文档说明](https://sailsjs.com/documentation/reference/configuration/sails-config-blueprints)

##### RESTful routes
其路径总是这样的：/:modelIdentity或/:modelIdentity/:id。这些路由使用HTTP "verb"来决定采取的动作；比如一个POST请求到/user将会创建一个新的用户，并且一个DELETE请求到/user/123将会删除一个有主要关键词123的用户。在产品环境下，RESTful routes应该通过策略来保护不受未认证地访问。
当路径诸如：
/:post 或者 /:post/:id的时候，blueprint会根据HTTP的动作（GET、POST、DELETE、PUT等）来分配到相应的Controller下相应的Action来处理.

例如:

  一个POST请求/post会创建一篇博客，
  一个DELETE请求/post/1122334455  会删除id为1122334455的博文.

##### Shortcut routes
这种类型的路由采取的动作将会体现在路径中。比如，/user/create?name=joe快捷方式创建一个新的用户，/user/update/1?name=mike则会更新用户#1。这些路由只会对GET请求回应。Shortcut routes对开发特别便利，但是一般在产品模式下需要禁用掉。
这种路由主要是方便开发，请求的参数可以直接写在请求路径中，
例如
/post/create?title=node.js分享
这时会创建一篇新博客，

/user/update/1122334455?title=更改以后的标题
这时会更新id为1122334455的博客.

shortcut routes在开发环境很便利，但是在生产环境下需要关闭

##### Action routes
将会自动地为你的自定义的控制器动作创建路由。比如，如果你有一个FooController.js文件并带有一个bar方法，那么一条/foo/bar的路由将会自动为你创建只要blueprint动作路由有使能。不像RESTful and shortcut routes，动作路由不要求一个控制器有一个对应的模型文件。
例如你的Controller层有一个postController.js，里面有一个Test方法，那么请求/post/test  就会分配到postController 下的 Test 方法来响应.


### 自定义路由 route.js 
Sails也会提供自定义的路由，可以在config/routes.js  文件里定义自己的路由.

下面我们自定义一个路由:
```
module.exports.routes = {
  'GET /list': 'blog.list',
  'GET  /blog/:id': 'blog.detail'
}
```

第一个路由:
/list
对应 blogController 下的 list 方法.

第二个路由:
/blog/:id
对应 blogController 下的 detail 方法



### 日志
日志的配置文件 log.js 参考: [log](https://sailsjs.com/documentation/reference/configuration/sails-config-log)

日志的打印
```
sails.log.info('I am an info-level message.');
sails.log('I am a debug-level message');
```

日志级别

	error	.error()
	warn	.warn(), .error()
	debug	.debug(), .warn(), .error()
	info	.info(), .debug(), .warn(), .error()
	verbose	.verbose(), .info(), .debug(), .warn(), .error()
	silly	.silly(), .verbose(), .info(), .debug(), .warn(), .error()
	
### seucrity

##### Security topics
[文档](https://sailsjs.com/documentation/concepts/security)
##### CORS
config/security.js:
```
cors: {
  allRoutes: true,
  allowOrigins: '*',
  allowCredentials: false
}
```
也可以配置在routes.js给每个action单独配置


##### DDOS
##### CSRF
##### Clickjacking
##### P3P
P3P是一种被称为个人隐私安全平台项目（The Platform forPrivacy Preferences Project）的标准
需要在config/http.js配置

##### Content Security Policy
添加配置到config/http.js
```
 csp: require('lusca').csp({
    policy: {
      'default-src': '*'
    }
  }),
 ``` 
##### Socket hijacking
##### XSS
##### Strict Transport Security



	
### Policies
主要权限验证控制
``` 
module.exports.policies = {
  UserController: {
    // By default, require requests to come from a logged-in user
    // (runs the policy in api/policies/isLoggedIn.js)
    '*': 'isLoggedIn',

    // Only allow admin users to delete other users
    // (runs the policy in api/policies/isAdmin.js)
    'delete': 'isAdmin',

    // Allow anyone to access the login action, even if they're not logged in.
    'login': true
  }
};
``` 

### session
``` 
   req.session.userId = foundUser.id;  
```   
 session也可以保存数据到数据库和nosql，以及各类配置请参考session.js,[官方文档](https://sailsjs.com/documentation/reference/configuration/sails-config-session )



### 其他

#### Helpers：
可以理解为Java的util或者是一个Services 的替换
#### fileupload/download
[参考文档]( https://sailsjs.com/documentation/concepts/file-uploads)



#### 配置文件说明
https://sailsjs.com/documentation/reference/configuration/sails-config-security