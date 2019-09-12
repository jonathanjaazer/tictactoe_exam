const http = require('http')
const app = require("./app")
const port = 5000

http.createServer(app).listen(process.env.PORT || port)
	.on('listening', () => {
		console.log("Server listening on port " + port)
}); 




