module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define("Doctor", {
    docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Doctor;
};
