class ColorValidator < ActiveModel::Validator
  def validate(record)
    color = record.color
    permitted = ["primary", "secondary", "success", "danger", "warning", "info"]
    permitted.each do |color_string|
      if color == color_string
        return
      end
    end
    record.errors :color, "Should be one of the Bootstrap colors"
  end
end