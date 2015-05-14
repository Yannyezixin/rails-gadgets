# -*- encoding : utf-8 -*-
class TodoController < ApplicationController

  def index
    @todos = Todo.get_all_unfinish
  end

  def create
    @todo = Todo.new(name: params[:name])
    
    if @todo.invalid?
      render json: {"status" => "error", "message" => @todo.errors} and return
    else
      @todo.save
      render json: {
        "status" => "success",
        "data" => {
          "id" => @todo.id,
          "name" => @todo.name,
          "status_url" => view_context.status_todo_url(:id => @todo.id),
        }
      } and return
    end

  end

  def status
    @todo = Todo.find_by_id(params[:id])

    if @todo
      @todo.update(status: !@todo.status)
      render json: {"status" => "success"} and return
    else
      render json: {"status" => "error", "message" => "无该记录"} and return
    end
  end

  def destroy
    @todo = Todo.find_by_id(params[:id])
    @todo.destroy if @todo

    render json: {"status" => "success"}
  end

end
