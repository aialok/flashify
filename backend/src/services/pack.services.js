const { Pack } = require("../models");
const redis = require("../config/redis.config");

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
      await redis.del("packs");
      await redis.del(`packId/${packId}`);
      await redis.del(`pack_length:${packId}`);
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
      await redis.del("packs");
      await redis.del(`packId/${packId}`);

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
      // Check if data is present in Redis
      const cacheData = await redis.get("packs");
      if (cacheData) {
        return JSON.parse(cacheData);
      }
      const packs = await Pack.findAll();

      // Set data in Redis
      await redis.set("packs", JSON.stringify(packs));

      return packs;
    } catch (error) {
      console.log(
        "There is an error in fetching all packs : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  // get a single Pack
  async getPackById(packId) {
    try {
      const pack = await Pack.findByPk(packId);
      return pack;
    } catch (error) {
      console.log(
        "There is an error in fetching a pack : service layer",
        error
      );
      throw new Error(error.message);
    }
  }
}

module.exports = new PackServices();
