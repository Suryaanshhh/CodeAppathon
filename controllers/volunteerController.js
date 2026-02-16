
const { User, VolunteerProfile } = require('../models/index');

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { skills, bio, availabilityStatus } = req.body;
    const userId = req.user.id; 

   
    const [profile, created] = await VolunteerProfile.findOrCreate({
      where: { userId },
      defaults: { skills, bio, availabilityStatus }
    });

    if (!created) {
      await profile.update({ skills, bio, availabilityStatus });
    }

    res.status(200).json({
      success: true,
      message: created ? "Profile created successfully" : "Profile updated",
      data: profile
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getVolunteerStats = async (req, res) => {
  try {
    const profile = await VolunteerProfile.findOne({ 
      where: { userId: req.user.id },
      include: [{ 
        model: User, 
        attributes: ['name', 'email', 'role', 'city'] 
      }]
    });
    
    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: "Profile not found. Please create your profile first." 
      });
    }
    
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};