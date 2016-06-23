exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _babelPolyfill = __webpack_require__(4);
	
	var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);
	
	var _path = __webpack_require__(5);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _express = __webpack_require__(6);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(7);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _morgan = __webpack_require__(8);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _swig = __webpack_require__(9);
	
	var _swig2 = _interopRequireDefault(_swig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	try {
	    var app = (0, _express2.default)();
	    var server = __webpack_require__(10).createServer(app);
	
	    app.set('port', process.env.PORT || 8000);
	    app.use((0, _compression2.default)());
	    app.use((0, _morgan2.default)('dev'));
	
	    app.use(_express2.default.static('static'));
	
	    app.get('/', function (req, res, next) {
	        var page = _swig2.default.renderFile('views/index.html', {});
	        res.status(200).send(page);
	    });
	
	    //error log
	    app.use(function (err, req, res, next) {
	        console.log(err.stack.red);
	        res.status(err.status || 500);
	        res.send({ message: err.message });
	    });
	
	    //Start Server
	    server.listen(app.get('port'), function () {
	        console.log('Express server listening on port ' + app.get('port'));
	        var open = __webpack_require__(11);
	        open("http://localhost:8000");
	    });
	
	    //Hot updates
	    if (true) {
	        if (true) {
	            console.log("[HMR] Waiting for server-side updates");
	
	            module.hot.addStatusHandler(function (status) {
	                if (status === "abort") {
	                    setTimeout(function () {
	                        return process.exit(0);
	                    }, 0);
	                }
	            });
	        }
	    }
	} catch (error) {
	    console.error('@error.stack || error');
	    console.error(error.stack || error);
	}

/***/ }

};
//# sourceMappingURL=0.update.js.map