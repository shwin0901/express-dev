const mysql = require('mysql')
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'smile',
  database: 'my_db_01',
})

// 测试数据库是否连接成功
db.query('select 1', function(err, result) {
  if(err) return console.log(err.message)

  console.log(result)
})


// 查询 返回值为数据
db.query("select * from users where username='mmmm'", (err, result) => {
  if(err) return console.log(err.message)
  
  console.log(result)
})


//向users表中新增一条数据
const str = {username: 'mac', password: '123'}
// 插入 (?代表使用占位符表示具体值, 使用数组填充占位符)
db.query('insert into users (username, password) values (?, ?)', [str.username, str.password], (err, result) => {
  if(err) {
    console.log(err.message)
    return 
  } 

  console.log(result)
  //affectedRows 表示插入行数
  if(result.affectedRows === 1) console.log('添加成功')
})


// 新增数据便捷方式
const setUpdate = {username: 'pro', password: '0000', status: 1}
db.query('insert into users set ?', setUpdate, (err, result) => {
  if(err){
    console.log(err.message)
    return
  }

  if(result.affectedRows === 1) {
    console.log('insert a data success')
  }
})


// 更新数据库里的数据
db.query("update users set username=?, password=? where id=?", ['macBook', 'mac', 7], (err, result) => {
  if(err) return console.log(err.message)

  if(result.affectedRows === 1){
    console.log('update a data successfully')
  }
})


// 更新数据库便捷方式
const updateStr = {username: 'macBook1', password: 'mac1', id: 6}
db.query('update users set ? where id=?', [updateStr, updateStr.id], (err, result) => {
  if(err) return console.log(err.message)

  if(result.affectedRows === 1) {
    console.log('update a data successfully')
  }
})


// 标记删除 来模拟删除动作
db.query('update users set status=? where id=?', [2, 9], (err, result) => {
  if(err) return console.log(err.message)
  
  if(result.affectedRows === 1) {
    console.log('标记删除成功')
  }
})