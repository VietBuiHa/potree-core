"use strict";

import {LRU} from "./utils/LRU.js";
import {WorkerManager} from "./utils/WorkerManager.js";

function getBasePath()
{
	if(document.currentScript && document.currentScript.src)
	{
		var scriptPath = new URL(document.currentScript.src + "/..").href;

		if(scriptPath.slice(-1) === "/")
		{
			scriptPath = scriptPath.slice(0, -1);
		}

		return scriptPath;
	}
	else
	{
		console.error("Potree: Was unable to find its script path using document.currentScript.");
	}

	return "";
}

// Three.js r71 doesn't support normalized buffer attributes, so we turn the uint8s into floats manually
function denormalizeUint8Array(ubytes) {
	const floats = new Float32Array(ubytes.length);
	for (let i = 0; i < floats.length; i++) {
		floats[i] = ubytes[i] / 255.0;
	}
	return floats;
}

var Global = 
{
	debug: {},
	workerPath: getBasePath(),
	maxNodesLoadGPUFrame: 20,
	maxDEMLevel: 0,
	maxNodesLoading: navigator.hardwareConcurrency !== undefined ? navigator.hardwareConcurrency : 4,
	pointLoadLimit: 1e10,
	numNodesLoading: 0,
	measureTimings: false,
	workerPool: new WorkerManager(),
	lru: new LRU(),
	pointcloudTransformVersion: undefined,
	denormalizeUint8Array
};

export {Global};