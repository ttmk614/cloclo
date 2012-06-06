# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120606141716) do

  create_table "cloths", :force => true do |t|
    t.integer  "user_id"
    t.string   "image"
    t.text     "description"
    t.string   "color"
    t.boolean  "privacy"
    t.string   "redRemark"
    t.time     "redTime"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.string   "public_class"
    t.string   "private_class"
    t.string   "signal"
  end

  create_table "colors", :force => true do |t|
    t.string   "color"
    t.integer  "cloth_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "comments", :force => true do |t|
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
  end

  create_table "posts", :force => true do |t|
    t.string   "name"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
  end

  create_table "users", :force => true do |t|
    t.string   "account"
    t.text     "friend"
    t.text     "visible"
    t.text     "spec"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "sh1"
    t.string   "sh2"
    t.string   "sh3"
    t.string   "sh4"
    t.string   "sh5"
    t.string   "sh6"
    t.string   "sh7"
  end

end
