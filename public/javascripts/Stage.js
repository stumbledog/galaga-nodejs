var Stage = (function(){
	var instance;

	function createInstance(){
		var object = new createjs.Stage("game");
		return object;
	}

	return {
		getInstance: function(){
			if(!instance){
				instance = createInstance();
			}
			return instance;
		}
	};
})();