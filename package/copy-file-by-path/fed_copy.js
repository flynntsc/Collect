const fs = require('fs')
const path = require('path')

const Fed_path = 'fed_path.txt'
const Fed_dir = 'fed_copy_files'

fs.readFile(Fed_path, 'utf8', (err, data) => {
    if (err) throw err
    const arr = data.split('\r\n').sort().filter(v => v).map(v => v.replace(/WebRoot\//g, ''))
    arr.forEach((v, i) => {
        // 判断路径文件是否存在
        fs.exists(v, exists => {
            if (!exists) return console.log(`${v} is not exists`)
            const path_arr = v.split('/')
            const path_leng = path_arr.length
            const path_name = path_arr[path_leng - 1]
            const path_dir = Fed_dir + '/' + path_arr.slice(0, path_leng - 1).join('/')
            const new_path_file = Fed_dir + '/' + v

            // 创建文件目录
            mkdirSync(path_dir, () => {
                // 读取路径文件
                fs.readFile(v, 'utf8', (err, data) => {
                    if (err) throw err

                    // 复制文件并填充内容
                    fs.open(new_path_file, 'w', (err, fd) => {
                        if (err) throw err
                        fs.write(fd, data, err => {
                            if (err) throw err
                            fs.closeSync(fd)
                        })
                    })
                })
            })
        })
    })
})

function mkdirSync(url, cb) {
    var arr = url.split("/");
    cb = cb || function() {};
    if (arr[0] === ".") { //处理 ./aaa
        arr.shift();
    }
    if (arr[0] == "..") { //处理 ../ddd/d
        arr.splice(0, 2, arr[0] + "/" + arr[1])
    }

    function inner(cur) {
        if (!fs.existsSync(cur)) { //不存在就创建一个
            fs.mkdirSync(cur)
        }
        if (arr.length) {
            inner(cur + "/" + arr.shift());
        } else {
            cb();
        }
    }
    arr.length && inner(arr.shift());
}
