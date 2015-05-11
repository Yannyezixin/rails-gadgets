# -*- encoding : utf-8 -*-
class CetController < ApplicationController
  def index
  end

  def search
    zkzh = params[:zkzh]
    xm = params[:xm]
    html = ApplicationHelper.get_cet_html(zkzh, xm)

    render plain: ApplicationHelper.get_cet_result(html)
  end
end
