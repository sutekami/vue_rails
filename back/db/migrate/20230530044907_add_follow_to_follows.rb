class AddFollowToFollows < ActiveRecord::Migration[7.0]
  def change
    add_column :follows, :follow_id, :string
    add_column :follows, :followed_id, :string
  end
end
