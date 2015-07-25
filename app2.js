/*
	App 控制整个app
		Page切换（Pjax）
			Page内置加载模块，加载自身内容 -> 每个页面使用各自的js
			Cache缓存控制 html5 application cache控制
		手势事件实现动画切换
			Fliper
*/

var events = require('./modules/widget/events');
var tplParser = require('./modules/plugins/tplParser');

function App(opts){
	this.init(opts);
}
App.prototype.init = function (opts){
	this.pages = [];
	this.inEffects = [];
	this.cache = [];
	
	this.APICaches = {};
	
	this.currentPage = opts.currentPage || 0;
};

App.prototype.toPage = function (index){
	if(index === this.currentPage){
		return;
	}
	if(!this.cache[index]){
		this.pages[index] = new Page({
			parent: this,
			url: this.urls[index],
			inEffect: this.inEffects[index]
		});
		this.toPage(index);
		return;
	}
	this.pages[this.currentPage].out();
	this.pages[index].in();
	this.currentPage = index;
};

App.prototype.cache = function (){
	// application cahce // HTML5 API not local storage
};
App.prototype.API = function (url){
	if(this.APICaches[url]){
		
	}
	
};

function Page(opts){
	this.init(opts);
}

Page.prototype.init = function (opts){
	this.app = opts.app
	this.url = opts.url;
	this.param = opts.param;
	this.pageNum = opts.pageNum;
	this.data = {};
	this.inEffect = opts.inEffect || 'blank';
	this.outEffect = opts.outEffect || 'blank';
	
	this.$ele = document.createElement('div');
};
Page.prototype.load = function (){
	this.emit('loading...');
	var self = this;
	if(!this.xhr){
		this.xhr = new XMLHttpRequest();
		this.xhr.onload = function (){
			self.data = this.responseText;
			self.emit('load');
		};
	}
	this.xhr.open(this.method, this.url, false);
};
Page.prototype.bindEvents = function (){
	this.on('load', function (){
		this.parent.cache[this.index] = this.pageData;
	});
};