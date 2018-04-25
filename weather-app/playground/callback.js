
var getUser = (id, f) => {
  var user = {
    id: id,
    name: "yuhao"
  }
 setTimeout(() => {
   f(user);
 }, 3000)
}

getUser(32, (callBack)=> {
  console.log(callBack);
} )
