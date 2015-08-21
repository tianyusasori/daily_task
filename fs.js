var fs =require('fs')
var path = require('path')
var mongo = require('mongodb').MongoClient

var url = '/home/sora/Soda/SODA_distSample/weibo1.txt'
var db_url = 'mongodb://localhost:27017/Soda'

fs.readFile(url,encoding='utf-8',function(err,data){
	if(err) console.error(err)
	var arr = data.toString().split('\n')
	//console.log(getTitle(arr))
	var title = getTitle(arr)
	//console.log(arr.slice(1))
	//createJSON(title,arr.slice(1))
	insert_db(db_url,url,createJSON(title,arr.slice(1)))
})


function getTitle(data){
	return data[0].split(',')}


function createJSON(titles,datas){

	var res = []
	datas.forEach(function(data,idx){
		var result = {}
		detail = data.split(',')
		detail.forEach(function(det,idxn){
			result[titles[idxn]]=det})
		res.push(result)
		console.log(JSON.stringify(result))
	})
	//console.log(JSON.stringify(result))
	//console.log(res)
	return res
	}

//function get_filename(url){
//	var name = path.basename(url).split('.')[0]
	//console.log(name)
//	return name
//	}


function insert_db(db_url,url,datas){
	mongo.connect(db_url,function(err,db){
		if(err) throw err
		var collection = db.collection(path.basename(url).split('.')[0])
		datas.forEach(function(data){
			collection.insert(data,function(err)
				{if(err)throw err
				db.close()})})
		//db.close()
		})}
