class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.text :title
      t.references :list, foreign_key: true

      t.timestamps
    end
  end
end
