# -*- encoding : utf-8 -*-
class Todo < ActiveRecord::Base
  validates :name, presence: { message: "TODO 名称不能为空"}

  def self.get_all_unfinish
    return self.where(status: false).order('id desc')
  end
end
