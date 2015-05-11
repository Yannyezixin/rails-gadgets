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
        console.log($(this).attr('action'));

        orderId = $('#order_id').val();
        $.post($(this).attr('action'), {"authenticity_token": $('meta[name="csrf-token"]').attr('content'), "order_id": orderId},
            function (data) {
                $('.loading').hide();
                if (data.errCode == 0) {
                    if (data.message.length != 0) {
                        $msg.text(data.message);
                    } else if (data.data.length == 0) {
                        $msg.text($msg.data('empty'));
                    } else if (data.data.length > 0) {
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
};

$(document).ready(ready);
$(document).on('page:load', ready);
