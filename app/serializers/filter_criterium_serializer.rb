class FilterCriteriumSerializer
  include JSONAPI::Serializer
  attributes :filterable_id, :filterable_type

  poly = Proc.new do |record|
    if record.tag?
      TagSerializer
    else
      LabelSerializer
    end
  end

  belongs_to :filter
  belongs_to :filterable, serializer: poly
end
