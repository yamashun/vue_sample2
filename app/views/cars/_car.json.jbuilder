json.extract! car, :id, :maker_id, :maker_name, :car_model_id, :car_model_name, :price, :created_at, :updated_at
json.url car_url(car, format: :json)
