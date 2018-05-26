// 构建工具
const gulp = require('gulp');
// 代码规范检查
const eslint = require('gulp-eslint');
// 转码插件
const babel = require('gulp-babel');
// 删除文件或者文件夹插件
const clean = require('gulp-clean');
// gulp任务按照指定顺序执行
const sequence = require('gulp-sequence');

// 配置需要处理的文件目录和转码之后文件的存放目录
const paramConfig = {
  source: ['*src/**/*.js', 'index.js'],
  dest: 'dist',
};

// 代码检查
gulp.task('lint', () =>
  // eslint配置，使用配置的文件目录。排除node_modules下的全部文件。
  gulp.src([...paramConfig.source, '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.result((result) => {
      console.log(`ESLint result: ${result.filePath}`);
      console.log(`# Messages: ${result.messages.length}`);
      console.log(`# Warnings: ${result.warningCount}`);
      console.log(`# Errors: ${result.errorCount}`);
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError()));

// 转码编译
gulp.task('babel', () =>
  gulp.src(paramConfig.source)
    .pipe(babel())
    .pipe(gulp.dest(paramConfig.dest)));

// 删除原有的dist文件夹
gulp.task('clean-dist', () =>
  gulp.src('dist', {
    read: false
  })
    .pipe(clean({
      force: true
    })));

// 赋值静态文件到dist文件夹下
gulp.task('copy', () =>
  gulp.src(['*static/**/*.*', '*public/**/*.*'])
    .pipe(gulp.dest(paramConfig.dest)));

gulp.task('default', ['lint'], sequence('clean-dist', ['babel', 'copy']), () => {
  // lint任务成功执行之后执行这个方法
});
