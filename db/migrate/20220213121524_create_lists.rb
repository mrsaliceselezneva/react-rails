class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.text :name
      t.references :table, foreign_key: true

      t.timestamps
    end
  end
end
