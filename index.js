const async = require('async');
const AWS = require('aws-sdk');


var ecs = new AWS.ECS({
	apiVersion: '2014-11-13',
	region: 'us-east-1'
});

var ec2 = new AWS.EC2({
	apiVersion: '2014-11-13',
	region: 'us-east-1'
});

//TODO 
// Get the clustername from the stdin


// Get ec2 instances
let getEcsInstances = (callback) => {
	var params = {
		cluster: "caranddriverapp-bakery"
	};
	ecs.listContainerInstances(params, (err, data) => {
		if (err) {
			callback(err)
		} else {
			callback(null, data)
		}
	})
}

// Gets the container instance arn
let getContainerArn = (arg1, callback) => {
	console.log(arg1.containerInstanceArns)
	let instanceArr = arg1.containerInstanceArns;
	let instanceIds = instanceArr.map(function (element) {
		return element
			.toString()
			.split('/')[1]
	});
	console.log('instanceIds:', instanceIds instanceof Array)
	callback(null, instanceIds)
}

//Get container instance-id
let getContainerIds = (arg2, callback) => {
	var params = {
		cluster: "caranddriverapp-bakery",
		containerInstances: arg2
	}
	ecs.describeContainerInstances(params, (err, data) => {
		if (err) {
			console.log(err, err.stack)
		} else {
			console.log(data)
			instanceIds = data.containerInstances.map((elem) => {
				return elem.ec2InstanceId
			})
			console.log(instanceIds)
			callback(null, instanceIds)
		}
	})
}

// Terminate ec2 instances
let killEcsInstances = (arg3, callback) => {
	var params = {
		InstanceIds: arg3,
		DryRun: false
	}
	ec2.terminateInstances(params, (err, data) => {
		if (err) console.log(err, err.stack);
		else callback(null, data)
	})
}

async.waterfall([
	getEcsInstances,
	getContainerArn,
	getContainerIds,
	killEcsInstances
], (err, data) => {
	if (err) {
		console.log(err)
	} else {
		console.log('Data', data)
	}
})