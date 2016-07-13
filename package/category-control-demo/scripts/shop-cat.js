require.config({
    // baseUrl: '/',
    paths: {
        'jquery': 'jquery.min',
        'template': 'template',
        'bs3': 'bootstrap.min',
    },
    shim: {
        'bs3': ['jquery']
    }
});
require(['jquery', 'template', 'bs3'], function($, template) {
    'use ctrict';
    var myData
    var tbody = document.getElementById('j-tbody')
    var $table = $('#j-table')
    var $tbody = $(tbody)
    var $modalCat = $('#j-modalCat')
    var $modalBd1 = $('#j-modalDelNote1')
    var $modalBd2 = $('#j-modalDelNote2')
    var time

    // 获取数据
    $.ajax({
            url: 'shop-cat.json',
            dataType: 'json',
        })
        .done(function(data) {
            // 模版初始化
            myData = data
            $tbody.data('maxid', myData.maxid)
            updateTemp(myData)
        })
        .fail(function() {
            // 无静态服务环境则虚拟赋值
            myData = {
                "title": "标题",
                "maxid": "200",
                "rows": [{
                    "id": "100",
                    "parent_id": "0",
                    "type_name": "分类A",
                    "ordering": "5",
                    "create_time": "2016-01-01 09:08:02",
                    "url": "/#a",
                    "children": [{
                        "id": "101",
                        "parent_id": "100",
                        "type_name": "子分类CC",
                        "ordering": "3",
                        "create_time": "2016-01-01 09:08:02",
                        "url": "/#a1"
                    }, {
                        "id": "102",
                        "parent_id": "100",
                        "type_name": "子分类DD",
                        "ordering": "2",
                        "create_time": "2016-01-01 09:08:02",
                        "url": "/#a2"
                    }, {
                        "id": "107",
                        "parent_id": "100",
                        "type_name": "子分类DD",
                        "ordering": "1",
                        "create_time": "2016-01-01 09:08:02",
                        "url": "/#a2"
                    }]
                }, {
                    "id": "103",
                    "parent_id": "0",
                    "type_name": "分类B",
                    "ordering": "2",
                    "create_time": "2016-01-01 09:08:02",
                    "url": "/#a",
                    "children": []
                }, {
                    "id": "104",
                    "parent_id": "0",
                    "type_name": "分类CC",
                    "ordering": "5",
                    "create_time": "2016-01-01 09:08:02",
                    "url": "/#a",
                    "children": [{
                        "id": "106",
                        "parent_id": "104",
                        "type_name": "子分类CC",
                        "ordering": "2",
                        "create_time": "2016-01-01 09:08:02",
                        "url": "/#a1"
                    }, {
                        "id": "108",
                        "parent_id": "104",
                        "type_name": "子分类CC",
                        "ordering": "1",
                        "create_time": "2016-01-01 09:08:02",
                        "url": "/#a1"
                    }]
                }]
            }

            $tbody.data('maxid', myData.maxid)
            updateTemp(myData)
        })


    // 批量删除
    $('#j-delMul').on('click', delMulTr)

    // 单个删除
    $tbody.on('click', '.j-btnDel', delOneTr)

    // 批量删除确定按钮
    $('#j-modalSure').on('click', sureDel)

    // 显示/隐藏子分类(全)
    $('#j-isOut').on('click', toggleAllChild)

    // 显示/隐藏子分类(单)
    $tbody.on('click', '.j-btnmore', toggleChild)

    // 分类弹框
    $modalCat.on('show.bs.modal', function(event) {
        var $target = $(event.relatedTarget),
            $targetPar = $target.parents('tr'),
            isEdit = $target.data('isedit') || false,
            parent_id = $target.data('parid') || 0,
            isChild = parent_id > 0 ? true : false,
            tit, id

        if (isEdit) {
            id = $targetPar.data('id')
            tit = isChild ? '修改子分类' : '修改分类'
        } else {
            tit = isChild ? '添加子分类' : '添加分类'
        }

        isChild ? $('#j-modalParBd').removeClass('f-hide') : $('#j-modalParBd').addClass('f-hide')

        updateModal(this, isEdit, tit, id, parent_id)
    })

    // 分类弹框保存按钮
    $('#j-modalCatSave').on('click', function() {
        var parBd = $(this).parents('.modal')
        var catId = parBd.data('id')
        var catName = parBd.find('.j-modalName').val() || '新建分类'
        var catSort = parBd.find('.j-modalSort').val() || 1
        var isEdit = parBd.data('isedit')
        var parent_id = parBd.data('parent_id')
        var isChild = parent_id > 0 ? true : false
        var newCat

        if (isEdit) {
            // 更新
            if (isChild) {
                $.each(myData.rows, function(i, v) {
                    if (v.id == parent_id) {
                        updateObj(v.children, catId, catName, catSort)
                        return
                    }
                });
            } else {
                updateObj(myData.rows, catId, catName, catSort)
            }
        } else {
            // 新建
            if (isChild) {
                $.each(myData.rows, function(index, val) {
                    if (val.id == parent_id) {
                        newCat = newObj(catName, catSort, catId, parent_id)
                        val.children.push(newCat)
                        return
                    }
                });
            } else {
                newCat = newObj(catName, catSort, catId, parent_id)
                myData.rows.push(newCat)
            }
        }
        updateTemp(myData, !isChild)
        $modalCat.modal('hide')

        function updateObj(arr, catId, catName, catSort) {
            $.each(arr, function(index, val) {
                if (val.id == catId) {
                    val.type_name = catName
                    val.ordering = catSort
                    return
                }
            });
        }

        function newObj(catName, catSort, catId, parent_id) {
            return {
                'supplier_id': null,
                'type_name': catName,
                'create_time': getNowTime(),
                'ordering': catSort,
                'parent_id': parent_id,
                'options': null,
                'id': catId,
                'status': null,
                'children': [],
                'user_id': null,
                'oper_time': null,
                'oper_ip': null,
                'user_name': null,
                'params': null
            }
        }
    })

    // 全选择/取消
    var selAll = (function(bd, sels, sel, selchild) {
        var $ckb = $(sel)
        var $ckbs = $(sels)
        var $bd = $(bd)
        var $ckbc = $(selchild)

        $table.on('click', sel, function() {
            var ckbVal = this.checked
            $(sels).prop('checked', ckbVal)
            $(selchild).prop('checked', ckbVal)
        })

        $bd.on('click', sels, function(event) {
            var ckbVal = this.checked
            var num = $ckbs.length
            var numEd = $('input' + sels + ':checked').length
            var parent_id = $(this).parents('tr.j-par').data('id')

            $('tr[data-parent_id="' + parent_id + '"]').find('.j-ckbc').prop('checked', ckbVal)

            if (ckbVal && num ===
                numEd) {
                $ckb.prop('checked', ckbVal)
            } else if (!ckbVal && num - 1 === numEd) {
                $ckb.prop('checked', ckbVal)
            }
        })
    })('#j-tbody', '.j-ckb', '#j-ckb', '.j-ckbc')

    // Fn
    // 批量删除按钮
    function delMulTr() {
        var numSel = $tbody.find('.j-ckb:checked').length + $tbody.find('.j-ckbc:checked').length
        $modalBd2.data('id', 0)
        if (numSel < 1) {
            $modalBd1.modal('show')
            setTimeout(function() {
                $modalBd1.modal('hide')
            }, 1000)
        } else {
            $modalBd2.modal('show')
        }
    }
    // 单个删除按钮
    function delOneTr(event) {
        var id = $(this).parents('tr').data('id')
        var parid = $(this).parents('tr').data('parent_id')

        $modalBd2.data('id', id)
        $modalBd2.data('parid', parid)
        $modalBd2.modal('show')
    }
    // 删除弹框确定按钮
    function sureDel() {
        var id = $modalBd2.data('id')
        var parid = $modalBd2.data('parid')

        // 单个
        if (id > 0 && parid >= 0) {
            if (parid > 0) {
                $.each(myData.rows, function(index, val) {
                    if (val.id == parid) {
                        $.each(val.children, function(i, v) {
                            if (!v || id == v.id) {
                                val.children.splice(i, 1)
                                return
                            }
                        })
                    }
                })
            } else {
                $.each(myData.rows, function(i, v) {
                    if (!v || id == v.id) {
                        myData.rows.splice(i, 1)
                        return
                    }
                })
            }
        } else {
            // 批量
            var arr1 = $tbody.find('.j-ckb:checked')
            var arr2 = $tbody.find('.j-ckbc:checked')
            var leng1 = arr1.length
            var disChild = arr2.length > 0 ? false : true

            if (leng1 > 0) {
                $.each(arr1, function(index, val) {
                    $.each(myData.rows, function(i, v) {
                        if (!v || $(val).parents('tr').data('id') == v.id) {
                            myData.rows.splice(i, 1)
                            return
                        }
                    })
                })
            }

            if (!disChild) {
                $.each(arr2, function(index, val) {
                    $.each(myData.rows, function(i, v) {
                        if ($(val).parents('tr').data('parent_id') == v.id) {
                            $.each(v.children, function(x, y) {
                                if (!y || $(val).parents('tr').data('id') == y.id) {
                                    v.children.splice(x, 1)
                                    return
                                }
                            })
                        }
                    })
                })
            }

        }

        updateTemp(myData)
        $modalBd2.modal('hide')
    }
    // 

    // 显示/隐藏子类（全）
    function toggleAllChild() {
        var num = $tbody.find('.j-par').length,
            numIcon = $tbody.find('.glyphicon-minus-sign').length
        if (num === numIcon) {
            $tbody.find('.j-btnmore').removeClass('glyphicon-minus-sign')
            $tbody.find('.j-child').addClass('f-hide')
        } else {
            $tbody.find('.j-btnmore').addClass('glyphicon-minus-sign')
            $tbody.find('.j-child').removeClass('f-hide')
        }
    }

    // 显示/隐藏子类（单）
    function toggleChild(event) {
        var $this = $(this)
        var $par = $this.parents('tr.j-par')
        var id = $par.data('id')
        $this.toggleClass('glyphicon-minus-sign')
        $('tr[data-parent_id="' + id + '"]').toggleClass('f-hide')
    }

    // 更新modal上内容
    function updateModal(target, isEdit, mytit, myid, myparent_id) {
        var $target = $(target)
        var $targetTr = $('tr[data-id="' + myid + '"]')
        var tit = mytit || '修改分类'
        var id = myid || getBiggerId()
        var parent_id = myparent_id || 0
        var name = $targetTr.data('name') || ''
        var ordering = $targetTr.data('sort') || 1
        $target.data('isedit', isEdit)
        $target.data('id', id)
        $target.data('parent_id', parent_id)
        $target.find('.j-modalTit').html(tit)
        $target.find('.j-modalName').val(name)
        $target.find('.j-modalSort').val(ordering)

        // 子分类情况
        if (parent_id > 0) {
            var $targetPar = $('tr[data-id="' + myparent_id + '"]')
            var parname = $targetPar.data('name') || ''
            $target.find('.j-modalPar').html(parname)
        }
    }

    // 获取当前时间格式
    function getNowTime() {
        var time = new Date()
        var Y = time.getFullYear()
        var M = formate(time.getMonth() + 1)
        var D = formate(time.getDate())
        var h = formate(time.getHours())
        var m = formate(time.getMinutes())
        var s = formate(time.getSeconds())
        return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s

        function formate(num) {
            return num < 10 ? '0' + num : num
        }
    }

    // 新建分类id增长
    function getBiggerId() {
        // 获取到当前最大id值
        var id = $tbody.data('maxid')
        id++
        $tbody.data('maxid', id)
        return id;
    }
    // 更新模版并渲染
    function updateTemp(data, disChild, el, id) {
        el = el || tbody
        id = id || 'j-temp'
        data.rows = sortArr(data.rows, disChild)
        var myHtml = template(id, data)
        el.innerHTML = myHtml

        // 此处ajax提交数据到数据库
    }
    // 数组排序
    function sortArr(arr, disChild) {
        arr.sort(function(a, b) {
            return a.ordering - b.ordering;
        })

        // 子类排序
        if (!disChild) {
            $.each(arr, function(index, val) {
                val.children.sort(function(a, b) {
                    return a.ordering - b.ordering;
                })
            });
        }
        return arr;
    }
});
