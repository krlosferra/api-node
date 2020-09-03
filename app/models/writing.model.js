module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      text: String,
      note: String,
      location: String,
      choosen: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Writing = mongoose.model("writing", schema);
  return Writing;
};
