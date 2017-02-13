exports = module.exports = function(options) {

  options = options || {};

  if (!options.header) options.header = 'JWT';
  if (!options.local) options.header = 'JWT';

  return function jwtPlugin(request) {

    if (!localStorage) {
      console.log('client does not support localStorage');
      return request;
    }

    var localJwt = localStorage.getItem(options.local);
    if (localJwt) {
      request.set({ Authorization: 'Bearer ' + localJwt });
    }

    request.on('response', function(res) {
      var resJwt = res.header[options.header];
      if (resJwt) {
        localStorage.setItem(options.local, resJwt);
      }
    });

    return request;

  }

}
