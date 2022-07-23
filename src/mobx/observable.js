@fc1
@fc2("observable")
class MyClass {
  @noWritable title = "observable"
  @noEnumerable enumerable = "enumerable"
  @noWritable readonly() { 
    return "hello mobx"
  }

}

// 添加类静态成员
function fc1(target) {
  target.count = 1
}

function fc2(value) {
  return function (target) {
    target.sting = value
  }
}
console.log("类的静态成员", MyClass.count) // 1
console.log("类的静态成员2", MyClass.sting) // observable


//添加类实例成员
function fc3(target) {
  target.prototype.lei = "实例成员"
}
const myClass = new MyClass()
console.log(myClass.lei) // 实例成员


// writeable 不能修改
function noWritable(target, name, description) {
  console.log(target, name, description)
  description.writable = false
}
// myClass.readonly = () => {
//   console.log("hello, world")
// }

//enumerable 不能遍历
function noEnumerable(target, name, desc) {
  desc.enumerable = false
}
for (let key in myClass) {
  console.log("遍历", key)
}
