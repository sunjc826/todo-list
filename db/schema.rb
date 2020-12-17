# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_17_153210) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.bigint "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_comments_on_task_id"
  end

  create_table "filter_criteria", force: :cascade do |t|
    t.bigint "filter_id", null: false
    t.bigint "filterable_id"
    t.string "filterable_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["filter_id"], name: "index_filter_criteria_on_filter_id"
    t.index ["filterable_id", "filterable_type"], name: "index_filter_criteria_on_filterable_id_and_filterable_type"
  end

  create_table "filters", force: :cascade do |t|
    t.datetime "time_filter"
    t.integer "priority_filter"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_filters_on_user_id"
  end

  create_table "label_tasks", force: :cascade do |t|
    t.bigint "label_id", null: false
    t.bigint "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["label_id"], name: "index_label_tasks_on_label_id"
    t.index ["task_id"], name: "index_label_tasks_on_task_id"
  end

  create_table "labels", force: :cascade do |t|
    t.string "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_labels_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.boolean "completed"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "title"
    t.string "content"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "subtasks", force: :cascade do |t|
    t.string "content"
    t.boolean "completed"
    t.bigint "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_subtasks_on_task_id"
  end

  create_table "tag_tasks", force: :cascade do |t|
    t.bigint "tag_id", null: false
    t.bigint "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_id"], name: "index_tag_tasks_on_tag_id"
    t.index ["task_id"], name: "index_tag_tasks_on_task_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.datetime "deadline"
    t.string "content"
    t.integer "priority"
    t.boolean "completed"
    t.bigint "user_id", null: false
    t.bigint "project_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "comments", "tasks"
  add_foreign_key "filter_criteria", "filters"
  add_foreign_key "filters", "users"
  add_foreign_key "label_tasks", "labels"
  add_foreign_key "label_tasks", "tasks"
  add_foreign_key "labels", "users"
  add_foreign_key "projects", "users"
  add_foreign_key "subtasks", "tasks"
  add_foreign_key "tag_tasks", "tags"
  add_foreign_key "tag_tasks", "tasks"
  add_foreign_key "tasks", "projects"
  add_foreign_key "tasks", "users"
end
