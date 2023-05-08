// 'use strict';

// import DID_API from './api.json' assert { type: 'json' };

// // const RTCPeerConnection = (window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection).bind(window);

// let peerConnection;
// let streamId;
// let sessionId;
// let sessionClientAnswer;

// const talkVideo = document.getElementById('talk-video');
// talkVideo.setAttribute('playsinline', '');

// const chatContainer = document.querySelector('.chat-wrapper');
// chatContainer.scrollTop = chatContainer.scrollHeight;

// // const chatReplies = async (inputData) => {
// // 	const chatAI = await fetch(`http://localhost:1234/grammar/ai`, {
// // 		method: 'POST',
// // 		headers: { 'Content-Type': 'application/json' },
// // 		body: JSON.stringify({
// // 			text: inputData,
// // 		}),
// // 	});

// // 	const text = await chatAI.json();

// // 	let didMessage = document.createElement('span');
// // 	didMessage.className = 'did-message';
// // 	didMessage.textContent = text.choices[0].message.content.replaceAll('\n', '');
// // 	document.querySelector('.chat-wrapper').appendChild(didMessage);

// // 	chatContainer.scrollTop = chatContainer.scrollHeight;
// // };

// // const addMessageButton = document.querySelector('.speak-button');
// // addMessageButton.onclick = async () => {
// // 	const inputData = document.querySelector('.input-chat').value;
// // 	let userMessage = document.createElement('span');
// // 	userMessage.className = 'user-message';
// // 	userMessage.textContent = inputData;
// // 	document.querySelector('.chat-wrapper').appendChild(userMessage);
// // 	document.querySelector('.input-chat').value = '';

// // 	chatContainer.scrollTop = chatContainer.scrollHeight;

// // 	chatReplies(inputData);
// // };

// document.addEventListener(
// 	'DOMContentLoaded',
// 	async () => {
// 		try {
// 			const chatAI = await fetch(`http://localhost:1234/chat/initializeChat`, {
// 				method: 'GET',
// 				headers: { 'Content-Type': 'application/json' },
// 			});

// 			chatAI
// 				.json()
// 				.then(async (res) => {
// 					streamId = res.streamId;
// 					sessionId = res.sessionId;
// 					sessionClientAnswer = await createPeerConnection(res.offer, res.iceServers);
// 					await fetch(`http://localhost:1234/chat/startStream`, {
// 						method: 'POST',
// 						headers: { 'Content-Type': 'application/json' },
// 						body: JSON.stringify({ answer: sessionClientAnswer }),
// 					});
// 					// setTimeout(() => {
// 					// 	startChat();
// 					// }, 1000);
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 		} catch (e) {
// 			console.log('error during streaming setup', e);
// 			stopAllStreams();
// 			closePC();
// 			return;
// 		}
// 	},
// 	false
// );

// // const startChat = async () => {
// // 	if (peerConnection?.signalingState === 'stable' || peerConnection?.iceConnectionState === 'connected') {
// // 		const chatAI = await fetch(`http://localhost:1234/chat/talkStream`, {
// // 			method: 'GET',
// // 			headers: { 'Content-Type': 'application/json' },
// // 		});
// // 	}
// // };

// const talkButton = document.getElementById('talk-button');
// talkButton.onclick = async () => {
// 	if (peerConnection?.signalingState === 'stable' || peerConnection?.iceConnectionState === 'connected') {
// 		const chatAI = await fetch(`http://localhost:1234/chat/talkStream`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({ messageAI: 'how are you ?' }),
// 		});
// 	}
// };

// async function onIceCandidate(event) {
// 	console.log('render');
// 	if (event.candidate) {
// 		console.log(event.candidate);
// 		const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

// 		await fetch(`http://localhost:1234/chat/iceCandidate`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({ candidate, sdpMid, sdpMLineIndex }),
// 		});
// 	}
// }

// function onTrack(event) {
// 	const remoteStream = event.streams[0];
// 	setVideoElement(remoteStream);
// }

// async function createPeerConnection(offer, iceServers) {
// 	if (!peerConnection) {
// 		peerConnection = new RTCPeerConnection({ iceServers });
// 		peerConnection.addEventListener('icecandidate', onIceCandidate, true);
// 		peerConnection.addEventListener('track', setVideoElement, true);
// 	}

// 	await peerConnection.setRemoteDescription(offer);
// 	const sessionClientAnswer = await peerConnection.createAnswer();
// 	await peerConnection.setLocalDescription(sessionClientAnswer);

// 	return sessionClientAnswer;
// }

// function setVideoElement(event) {
// 	if (!event.streams[0]) return;
// 	talkVideo.srcObject = event.streams[0];

// 	// safari hotfix
// 	if (talkVideo.paused) {
// 		talkVideo
// 			.play()
// 			.then((_) => {})
// 			.catch((e) => {});
// 	}
// }

// // function stopAllStreams() {
// // 	if (talkVideo.srcObject) {
// // 		console.log('stopping video streams');
// // 		talkVideo.srcObject.getTracks().forEach((track) => track.stop());
// // 		talkVideo.srcObject = null;
// // 	}
// // }

// // function closePC(pc = peerConnection) {
// // 	if (!pc) return;
// // 	console.log('stopping peer connection');
// // 	pc.close();
// // 	pc.removeEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
// // 	pc.removeEventListener('icecandidate', onIceCandidate, true);
// // 	pc.removeEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
// // 	pc.removeEventListener('connectionstatechange', onConnectionStateChange, true);
// // 	pc.removeEventListener('signalingstatechange', onSignalingStateChange, true);
// // 	pc.removeEventListener('track', onTrack, true);
// // 	console.log('stopped peer connection');
// // 	if (pc === peerConnection) {
// // 		peerConnection = null;
// // 	}
// // }
