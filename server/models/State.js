module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define("State", {
    statename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  State.associate = (models) => {
    State.hasMany(models.Doctor, {
      onDelete: "cascade",
    });
  };

  return State;
};
