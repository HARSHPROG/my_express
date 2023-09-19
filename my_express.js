var http = require('http');

function my_express() {

    let get_map = new Map();
    let use_map = new Map();

    let app = http.createServer((req, res) => {

        for(let [key, values] of use_map) {
            if (req.url === key) {
                for(let val=0; val < values.length; val++){
                    next = () => {
                        if (val+1 < values.length){
                            return values[val+1]
                        }else {
                            return () => {}
                        }
                    }
                    values[val](req, res, next);
                }
            }
        }

        if(req.method.toLowerCase() === 'get'){
          for(let [key, value] of get_map) {
            if(req.url === key) {
            //   value();
            console.log("key", key);
            console.log("value", value);
            // console.log("value called", value());
            res.send = (content) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(content);
            };
            
            return value(req, res);
            }
          }
        }

        res.write('Hello World!');
        res.end();
    });

    return  {
        use: (url, handler) => {
            if(use_map.has(url)){
                use_map.get(url).push(handler);
                return
            } else {
                use_map.set(url, [handler]);
            }
        },
        get: (url, handler) => {
          console.log("in get", url, handler);
          get_map.set(url, handler);
        },
        listen: (port, callback) => {
            app.listen(port)
            callback()
        }
    };
}

module.exports = my_express;