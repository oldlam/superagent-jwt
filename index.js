exports = module.exports = function(opts) {

  if (undefined === opts) opts = {};

  opts.header = (undefined !== opts.header) ? opts.header.toLowerCase() : 'jwt';
  opts.local = (undefined !== opts.local) ? opts.local : 'jwt';

  return function jwtPlugin(request) {

    if (!localStorage) {
      console.log('client does not support localStorage');
      return request;
    }

    var localJwt = localStorage.getItem(opts.local);
    if (localJwt) {
      request.set({ Authorization: 'Bearer ' + localJwt });
    }

    request.on('response', function(res) {
      var resJwt = res.header[opts.header];
      if (resJwt) {
        localStorage.setItem(opts.local, resJwt);
      }
    });

    return request;

  }

}
