module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    pic: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  });

  return Image;
};
