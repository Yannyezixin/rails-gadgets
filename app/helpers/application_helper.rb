require 'open-uri'
require 'json'

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
end
