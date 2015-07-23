// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.form.min
//= require turbolinks
//= require_tree .


ready = function () {

    // 快递单号表单
    $('#express').submit(function (event) {
        $msg = $('.msg');
        $msg.text("");
        $('.loading').show();
        $list = $('#order_list tbody');
        $list.html("");
        event.preventDefault();
        statusArr = new Array('查询出错', '暂无记录', '在途中', '派送中', '已签收', '拒收', '疑难件', '退回');

        orderId = $('#order_id').val();
        $.post($(this).attr('action'), {"authenticity_token": $('meta[name="csrf-token"]').attr('content'), "order_id": orderId},
            function (data) {
                $('.loading').hide();
                if (data.errCode == 0) {
                    console.log(data);
                    if (data.message.length != 0) {
                        $msg.text(data.message);
                    } else if (data.data.length == 0) {
                        $msg.text($msg.data('empty'));
                    } else if (data.data.length > 0) {
                        $('#com').text(data.name);
                        $('#status').text(statusArr[data.status]);
                        data.data.map(function (item) {
                            $tr = $('<td></td>');
                            $tr.append($('<p class="time"></p>').text(item.time));
                            $tr.append($('<p class="content"></p>').text(item.content));
                            $list.append($('<tr></tr>').append($tr));
                        });
                    }
                } else {
                    $msg.text(data.message);
                }
            }
        );
    });

    // 四六级查询
    $('#cet').submit(function (event) {
        event.preventDefault();
        zkzh = $('#zkzh');
        xm = $('#xm');

        if (zkzh.val().replace(/\s+/g,"").length != zkzh.data('length')) {
            zkzh.addClass('error-input');
            return;
        } else {
            zkzh.removeClass('error-input');
        }

        $('.loading').show();
        $cetTable = $('#cet_table');
        $cetTable.html("");
        $.post($(this).attr('action'), {"authenticity_token": $('meta[name="csrf-token"]').attr('content'), "zkzh": zkzh.val(), "xm": xm.val()},
            function (data) {
                $('.loading').hide();
                $cetTable.html(data);
            }
        );
    });

    // 图片实时上传
    (function () {
        if ($('#avatar')) {
            $this = $('#avatar');
            $this.parent().wrap('<form id="avatar_form" action="'+$this.data('form-action')+
                         '" method="post" enctype="multipart/form-data"></form>');
        }
    }());
    $('#avatar').on('change', function () {
        progressBtn = $('#progress');
        progressBtn.width('0%');
        progressNum = $('#progress-num span');
        photo = $('.photo');
        $('#avatar_form').ajaxSubmit({
            dataType: 'json',
            beforeSend: function () {
            },
            uploadProgress: function (event, position, total, percentComplete) {
                var percentVal = percentComplete + '%';
                progressBtn.width(percentVal);
                progressNum.html(percentVal);
            },
            success: function (data) {
                if (data.status == "error") {
                    progressNum.html(data.message);
                } else {
                    setTimeout(function () {
                        progressNum.html("");
                        progressBtn.width("0%");
                    }, 1000);
                    console.log(data.url);
                    img = $('<img>').attr('src', data.url);
                    photo.prepend($('<div class="block"></div>').html(img));
                }
            },
            error: function (data) {
                progressNum.html("服务器出错");
            },
        });
    });

    // TODO-List
    $('#todo-form').submit(function (event) {
        event.preventDefault();
        todo = $('#todo-new');
        todoLen = todo.val().replace(/\s+/g,"").length;
        if (todoLen > 0) {
            $.post($(this).attr('action'),
                   {"authenticity_token": $('meta[name="csrf-token"]').attr('content'), "name": todo.val()},
                    function (data) {
                        todo.val("");
                        if (data.status == "error") {
                            console.log(data.message);
                            return;
                        }
                        li = $('<li data-id='+data.data.id+' data-url-status="'+ data.data.status_url +'"></li>');
                        div = $('<div><span class="checkbox"><div class="checker"></div></span></div>');
                        div.append($('<div class="todo_si"></div>').text(data.data.name));
                        div.append($('<div class="delete">X</div>'));
                        $('.todo').prepend(li.append(div));
                    }
            );
        }
    });
    // TODO-list finish check
    $('.todo').on('click', '.checker', function () {
        li = $(this).parents('li');
        id = li.data('id');
        $.get(li.data('url-status'), function (data) {
            if (data.status == "success") {
                li.animate({
                    left:'100%',
                    opacity: 0.25
                }, 500, function () {
                    li.remove();
                });
            }
        });
    });
    // TODO-list delete
    $('.todo').on('click', '.delete', function () {
        li = $(this).parents('li');
        id = li.data('id');
        ajaxUrl = $('#todo-form').attr('action') + '/' + id;
        $.ajax({
            url: ajaxUrl,
            type: 'DELETE',
            success: function (data) {
                if (data.status == "success") {
                    li.animate({
                        left:'100%',
                        opacity: 0.25
                    }, 500, function () {
                        li.remove();
                    });
                }
            }
        });
    });

    // 天气查询
    $('#weather_form').submit(function (e) {
        e.preventDefault();
        weatherCon = $('#weather_container');
        weatherCon.html(null);
        var cityCode = city[$('#weather_id').val()];
        if (cityCode == undefined) {
            weatherCon.html("请输入正确的城市名");
        } else {
            $('.loading').show();
            $.post($(this).attr('action'), {'authenticity_token': $('meta[name="csrf-token"]').attr('content'), 'cityCode': cityCode}, function (data) {
                $('.loading').hide();
                weatherCon.html(data);
                weatherCon.children().last().remove();
            });
        }
    });

};

$(document).ready(ready);
$(document).on('page:load', ready);
