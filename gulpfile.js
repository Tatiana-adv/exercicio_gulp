// gulpfile.js

const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

// Tarefa para compilar SASS para CSS e minificar o resultado
function compilaSass() {
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('dist/css'));
}

// Tarefa para concatenar e minificar arquivos JavaScript
function comprimeJs() {
    return src('src/js/*.js')
        .pipe(concat('scripts.min.js')) // Concatena os arquivos
        .pipe(uglify()) // Minifica o arquivo concatenado
        .pipe(dest('dist/js'));
}

// Tarefas de observação (watch) - para automatizar o processo
function watchFiles() {
    // Monitora arquivos SASS
    // Ao salvar, executa a tarefa 'compilaSass'
    gulp.watch('src/scss/**/*.scss', compilaSass);
    
    // Monitora arquivos JS
    // Ao salvar, executa a tarefa 'comprimeJs'
    gulp.watch('src/js/*.js', comprimeJs);
}

// Exporta as tarefas para que possam ser executadas via terminal
exports.sass = compilaSass;
exports.js = comprimeJs;
exports.default = series(parallel(compilaSass, comprimeJs), watchFiles);
