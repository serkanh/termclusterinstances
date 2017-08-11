#!/usr/bin/env node
const async = require('async');
const AWS = require('aws-sdk');

var program = require('commander');

program.option('-c, --cluster <cluster>', 'terminate cluster')
	.parse(process.argv); 
	console.log(program.cluster)


	
CLUSTER_NAME=program.cluster
	
	

const ecsParams = {
	apiVersion: '2014-11-13',
	region: 'us-east-1'
}

const ecs = new AWS.ECS(ecsParams);
const ec2 = new AWS.EC2(ecsParams);

//TODO 
// Get the clustername from the stdin


// Get ec2 instances
const getEcsInstances = (callback) => {
	var params = {
		cluster: CLUSTER_NAME
	};
	
	ecs.listContainerInstances(params, (err, data) => {
		if (err) {
			callback(err)
		} else {
			console.log('listContainerInstances data:',data)
			callback(null, data)
		}
	})
}

// Gets the container instance arn
const getContainerArn = (arg1, callback) => {
	console.log(arg1.containerInstanceArns)

	let instanceArr = arg1.containerInstanceArns;
	let instanceIds = instanceArr.map(element => {
		return element
			.toString()
			.split('/')[1]
	});
	console.log('instanceIds:', instanceIds)
	callback(null, instanceIds)
}

//Get container instance-id
const getContainerIds = (arg2, callback) => {
	var params = {
		cluster: CLUSTER_NAME,
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
const killEcsInstances = (arg3, callback) => {
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
			console.log('Error', err)
		} else {
			console.log('Data', data)
		}
	})



