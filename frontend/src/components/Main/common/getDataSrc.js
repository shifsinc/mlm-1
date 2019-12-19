export default function(dataSrc, callback){
  setTimeout(() => dataSrc.then(r => callback(r)), 0)
}
