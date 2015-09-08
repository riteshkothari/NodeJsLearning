var https = require("https");

function getRepos(username, callback){
	console.log('Inside GetRepos : ' + username);
	var options = {
		host: 'api.github.com',
		path: '/users/' + username + '/repos',
		method: 'GET',
		headers: {'user-agent': 'node.js'}
	};
	var request = https.request(options,function(resp){
			var body = '';
			resp.on("data",function(chunk){
				body += chunk.toString('utf8');
			});
			resp.on("end",function(){
				var repos = [];
				var json = JSON.parse(body);
				json.forEach(function(repo){
					repos.push({
						name : repo.name,
						description : repo.description
					});
				});
				//console.log(repos);
				callback(repos);
			});
	});
	request.end();
}

getRepos("riteshkothari",function(repos){
	console.log("riteshkothari has " + repos.length + " repos");
})

