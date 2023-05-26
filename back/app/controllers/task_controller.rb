class TaskController < ApplicationController
    protect_from_forgery :except => [:create, :index]

    def index
        task = Task.where(user_id: params[:user_id])
        render json: { task: task }
    end

    def create
        task = Task.new(task_params)
        task.save
        render json: { result: true }
    end

    private
    def task_params
        params.require(:task).permit(:user_id, :context, :checked)
    end
end
