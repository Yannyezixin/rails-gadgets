# -*- encoding : utf-8 -*-
class AvatarController < ApplicationController
  def index
    @avatar_src_arr = []

    avatar_path = File.join(Rails.root, "public", "uploads", "avatar")

    # TODO better way to get files of a dir
    if File.directory?(avatar_path)
      Dir.entries(avatar_path).reject{|d| d == '.' || d == '..'}.each do |item|
        @avatar_src_arr.push(view_context.image_url("/uploads/avatar/#{item}"))
      end
    end
  end

  def upload
    uploader = AvatarUploader.new()
    avatar = params[:avatar]
    begin
      uploader.store!(avatar)
    rescue Exception => e
      render json: {"status" => "error", "message" => e.message} and return
    end

    render json: {"status" => "success", "url" => uploader.url}
  end
end
