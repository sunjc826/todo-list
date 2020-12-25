class DateValidator < ActiveModel::Validator
  def validate(record)
    if record.startdate && record.enddate
      if record.enddate < record.startdate
        record.errors :startdate, "Start date should not be after end date"
      end
    end
  end
end