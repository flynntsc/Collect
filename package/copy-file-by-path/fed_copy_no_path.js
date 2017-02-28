const fs = require('fs')
const exec = require('child_process').exec

const Fed_path = 'fed_path.txt'
const Fed_dir = 'fed_copy_files'

exec('rm -fr ' + Fed_dir, function(err, out) {
    if (err) throw err
    fs.mkdirSync(Fed_dir)
    const data = fs.readFileSync(Fed_path, 'utf8')
    const arr = data.split('\r\n').sort().filter(v => v).map(v => v.replace(/WebRoot\//g, ''))
    arr.forEach((v, i) => {
        // 判断路径文件是否存在
        fs.exists(v, exists => {
            if (!exists) return console.log(`${v} is not exists`)
            const path_arr = v.split('/')
            const path_leng = path_arr.length
            const path_name = Fed_dir + '/' + path_arr[path_leng - 1]

            // 创建文件
            fs.readFile(v, 'utf8', (err, data) => {
                if (err) throw err

                // 复制文件并填充内容
                fs.open(path_name, 'w', (err, fd) => {
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
