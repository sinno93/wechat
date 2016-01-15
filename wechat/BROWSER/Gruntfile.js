module.exports = function(grunt) {
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-connect-proxy');
	// LiveReload的默认端口号，你也可以改成你想要的端口号
	var lrPort = 35666;
	// 使用connect-livereload模块，生成一个与LiveReload脚本
	// <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
	var lrSnippet = require('connect-livereload')({
		port: lrPort
	});
	// 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
	var serveStatic = require('serve-static');
	var serveIndex = require('serve-index');
	
    var lrMiddleware = function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // 设置代理

                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];
						middlewares.push(lrSnippet);
                        // 代理每个base目录中的静态文件
                        options.base.forEach(function(base) {
                        	//serveStatic(options.base[0]),
                            middlewares.push(serveStatic(options.base[0]));
                        });
                         	
                        // 让目录可被浏览（即：允许枚举文件）
                       // var directory = options.directory || options.base[options.base.length - 1];
                        //serveIndex(options.base[0])serveIndex(options.base[0])
                       middlewares.push(serveIndex(options.base[0]));

                        return middlewares;
                      }
	/*
	var lrMiddleware = function(connect, options, middlwares) {
		return [
			lrSnippet,
			// 静态文件服务器的路径
			serveStatic(options.base[0]),
			// 启用目录浏览(相当于IIS中的目录浏览)
			serveIndex(options.base[0])
		];
	};
   */
	// 项目配置(任务配置)
	grunt.initConfig({
		// 读取我们的项目配置并存储到pkg属性中
		pkg: grunt.file.readJSON('package.json'),
		// 通过connect任务，创建一个静态服务器
		connect: {
			options: {
				// 服务器端口号
				port: 8666,
				// 服务器地址(可以使用主机名localhost，也能使用IP)
				hostname: 'localhost',
				// 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
				base: ''
			},
			/*test---------------*/
            proxies:[
                      {
					 context:  ['/KMS-MSERVER','/epmv'],// 这是你希望出现在grunt serve服务中的路径，比如这http://10.0.24.226:9000/api/
					 host: '10.118.13.5',// 这是你希望转发到的远端服务器
					 port: 8180,// 远端服务器端口
					 // host:'10.118.37.25',//全坤的服务ip
					 // port:8080,
					 https: false,
					 changeOrigin:true // 
					 
					 //headers: {
					 //      "x-custom-added-header": value
					 //}
            }
                   ],
            /*test------------------*/
			livereload: {
				options: {
					// 通过LiveReload脚本，让页面重新加载。
					middleware: lrMiddleware
				}
			}
		},
		// 通过watch任务，来监听文件是否有更改
		watch: {
			client: {
				// 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
				options: {
					livereload: lrPort
				},
				// '**' 表示包含所有的子目录
				// '*' 表示包含所有的文件
				files: ['**/*.html','**/*.js','**/*.css']
			}
		}
	}); // grunt.initConfig配置完毕

	

	// 自定义任务
	//grunt.registerTask('live', ['connect','configureProxies:server', 'watch']);

	//
	grunt.registerTask('live', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      //'connect',
      'configureProxies:server', // *** 务必插入这句 ***
      'connect:livereload',
      'watch'
    ]);
  });
};