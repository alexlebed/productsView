var gulp = require('gulp'),
    opn = require('opn');


var server = {
    host: 'localhost',
    port: '8888'
};

gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port );
});
	
gulp.task('default', ['openbrowser']);