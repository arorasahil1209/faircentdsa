  const city = (sequelize, Sequelize) => sequelize.define("dsa_city", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    city_name: {
      type: Sequelize.STRING
    },
    state_name: {
      type: Sequelize.STRING
    },
    country_name: {
      type: Sequelize.STRING,
      defaultValue: 'India'
    },
    country_code: {
      type: Sequelize.STRING,
      defaultValue: '+91'
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  });  

export default class City {
  constructor(sequelize, Sequelize) {
    const cityDetails = city(sequelize, Sequelize);
    this.model = cityDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}