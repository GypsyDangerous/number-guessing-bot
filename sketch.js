let bot

function setup() {
	createCanvas(400, 400);
	noCanvas();
	select("#first").html(getTime());
	bot = new RiveScript();
	bot.loadFile("brain.rive").then(brainReady).catch(brainError);

	function brainReady() {
		console.log('Chatbot ready!');
		bot.sortReplies();
		let num = floor(random(100)) + 1;
		console.log(num);
		let reply = bot.reply('local-user', 'set ' + num);
	}

	function brainError(e) {
		console.log('Chatbot error!'+e)
	}
}

function setNum()
{
	let num = floor(random(100)) + 1;
	console.log(num);
	let reply = bot.reply('local-user', 'set ' + num);
}

function getTime() {
	let h = hour();
	let m = minute();
	let ampm = h <= 12 ? "AM" : "PM"
	return "" + h % 12 + ":" + m + " " + ampm
}

function escape(txt)
{
	let newtxt = "";
 for(let char in txt)
 {
	 char = txt.charAt(char);
	 if(char == "<")
	 {
		newtxt += "&lt" 
	 }else if(char == ">")
	 {
		newtxt += "&gt" 
	 }
	 else newtxt += char
 }
	return newtxt
}

function send() {
	let msg = select("#msg").value();
	if (msg != "") {
		msg = escape(msg);
		let div = createDiv('<img src="https://assets.editor.p5js.org/5c2b8971da5723001f824cee/f4854ed1-c4e0-43ed-abed-e0bfc1646078.png" alt="Avatar" class="right" style="width:100%;"><p class="right-txt">' + msg + '</p><span class="time-left">' + getTime() + '</span>').addClass("container").addClass("darker");
		div.parent("txtScreen");
		let objDiv = document.getElementById("txtScreen");
		objDiv.scrollTop = objDiv.scrollHeight;
		select("#msg").value("")
		setTimeout(() => {setTimeout(botReply(msg), 1000)}, 1000);
	}
}

function botReply(msg)
{
	let reply;
	reply = bot.reply('local-user', ""+msg).then(function(result) {
		let div = createDiv('<img src="https://assets.editor.p5js.org/5c2b8971da5723001f824cee/606a8fcb-f698-4d61-b923-2629edc984d6.png" alt="Avatar" style="width:100%;"><p>' + result + '</p><span class="time-right">' + getTime() + '</span>').addClass("container");
	div.parent("txtScreen");
	let objDiv = document.getElementById("txtScreen");
		objDiv.scrollTop = objDiv.scrollHeight;

	if(result == "you got it!")
	{
		setTimeout(() =>{
			let msg = "generating new number..."
			let div = createDiv('<img src="https://assets.editor.p5js.org/5c2b8971da5723001f824cee/606a8fcb-f698-4d61-b923-2629edc984d6.png" alt="Avatar" style="width:100%;"><p>' + msg + '</p><span class="time-right">' + getTime() + '</span>').addClass("container");
			div.parent("txtScreen");
			let objDiv = document.getElementById("txtScreen");
		objDiv.scrollTop = objDiv.scrollHeight;
			setNum()
		}, 1000);
		setTimeout(() =>{
			let msg = "Done! Guess another number between 1 and 100"
			let div = createDiv('<img src="https://assets.editor.p5js.org/5c2b8971da5723001f824cee/606a8fcb-f698-4d61-b923-2629edc984d6.png" alt="Avatar" style="width:100%;"><p>' + msg + '</p><span class="time-right">' + getTime() + '</span>').addClass("container");
			div.parent("txtScreen");
			let objDiv = document.getElementById("txtScreen");
		objDiv.scrollTop = objDiv.scrollHeight;
			setNum()
		}, 2000);
	}	
});
	

	

}

function keyPressed() {
	if (keyCode == 13) {
		send();
	}
}
