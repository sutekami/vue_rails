class RemoveFollowIdFromFollows < ActiveRecord::Migration[7.0]
  def change
    remove_column :follows, :follow_id, :integer
  end
end
