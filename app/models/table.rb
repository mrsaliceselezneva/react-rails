class Table < ApplicationRecord
  has_many :lists, dependent: :destroy
end
