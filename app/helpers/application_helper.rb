require 'open-uri'
require 'json'
require 'mechanize'
require 'logger'

module ApplicationHelper
  def self.get_express_company(order)
    url = "http://www.kuaidi100.com/autonumber/auto?num=" + order
    content = open(url).read
    if content.size <= 5
      return false
    else
      result = /comCode":"(.*?)"/.match(content)
      return result[1]
    end
  end

  def self.get_cet_html(zkzh, xm)
    url = "http://www.chsi.com.cn/cet/"
    agent = Mechanize.new do |a|
      a.log = Logger.new(STDOUT)
    end
    cet_page = agent.get url
    form = cet_page.forms[1]
    Rails.logger.debug(form)
    form.field_with(:name => "zkzh").value = zkzh
    form.field_with(:name => "xm").value = xm
    html = form.submit

    Rails.logger.debug(html.body)
    return html.body
  end 

  def self.get_cet_result(html)
    result = /m_cnt_m">([\s|\S]*?)<div class="psTxt/.match(html)
    Rails.logger.debug(result)
    return result[1]
  end
end
