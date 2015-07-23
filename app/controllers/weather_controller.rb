# -*- encoding : utf-8 -*-
class WeatherController < ApplicationController
  def index
  end

  def search
    cityCode = params[:cityCode]

    weather = ApplicationHelper.get_weather_html(cityCode)

    render plain: weather
  end

end
