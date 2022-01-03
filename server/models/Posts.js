module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    //this is how we associate a post table to comments table
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
