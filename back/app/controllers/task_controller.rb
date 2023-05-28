class TaskController < ApplicationController
    protect_from_forgery :except => [:create, :index, :delete]

    def index
        task = Task.where(user_id: params[:user_id])
        render json: { task: task }
    end

    def create
        task = Task.new(task_params)
        task.save
        render json: { result: true }
    end

    def delete
        task = Task.find(params[:id])
        if task[:user_id] == params[:user_id] then
            task.destroy
            render json: { result: true }
        else
            render json: { result: false }
        end
    end

    private
    def task_params
        params.require(:task).permit(:user_id, :context, :checked)
    end
end
