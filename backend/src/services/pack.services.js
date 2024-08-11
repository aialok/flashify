const { Pack } = require("../models");

/**
 * PackServices Class to handle all the services related to Packs
 */

class PackServices {
  // create a new Pack
  async createPack(data) {
    try {
      const pack = await Pack.create(data);

      return pack;
    } catch (error) {
      console.log(
        "There is an error in creating a pack : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  // update a Pack
  async updatePack(packId, data) {
    try {
      const updatedPack = await Pack.update(data, {
        where: { id: packId },
      });

      return updatedPack;
    } catch (error) {
      console.log(
        "There is an error in updating a pack : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  // delete a Pack
  async deletePack(packId) {
    try {
      const deletedPack = await Pack.destroy({
        where: { id: packId },
      });

      return deletedPack;
    } catch (error) {
      console.log(
        "There is an error in deleting a pack : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  // get all Packs
  async getAllPacks() {
    try {
      const packs = await Pack.findAll();

      return packs;
    } catch (error) {
      console.log(
        "There is an error in fetching all packs : service layer",
        error
      );
      throw new Error(error.message);
    }
  }
}

module.exports = new PackServices();
