const Donor = require('../models/Donor');
const { Op } = require('sequelize');

exports.searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    let queryCondition = {};

    if (bloodGroup) queryCondition.bloodGroup = bloodGroup;
    if (city) queryCondition.city = city;

    const donors = await Donor.findAll({
      where: {
        ...queryCondition,
        isAvailable: true,
        status: 'Active'
      },
      attributes: ['fullName', 'bloodGroup', 'city', 'lastDonationDate'] // Excludes phone for privacy [cite: 38]
    });

    res.json({ success: true, count: donors.length, data: donors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};