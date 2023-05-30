class RemoveFollowedIdFromFollows < ActiveRecord::Migration[7.0]
  def change
    remove_column :follows, :followed_id, :integer
  end
end
