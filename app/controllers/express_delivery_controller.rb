# -*- encoding : utf-8 -*-
require 'open-uri'

class ExpressDeliveryController < ApplicationController
  def index
  end

  def search
    url = "http://www.aikuaidi.cn/rest/?key=%s&order=%s&id=%s&ord=desc"
    key = Rails.application.config.order_key
    order_id = params[:order_id]
    com_code = ApplicationHelper.get_express_company order_id

    if not com_code
      render json: {"message" => "快递单号无效"} and return
    end
    content = open(url % [key, order_id, com_code]).read
    render json: content
  end
end
