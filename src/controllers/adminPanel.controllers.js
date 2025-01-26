import Application  from "../models/adminpanel.model.js";

// View all applications
const getAllApplications = async (req, res) => {
    try {
      console.log("Fetching all applications...");
      const applications = await Application.find().populate("userId");
      console.log("Applications fetched:", applications);
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Error fetching applications", error });
    }
  };
  
// Filter applications by city and country
const filterApplications = async (req, res) => {
    try {
      const { city, country } = req.query;
      const filter = {};
  
      if (city) filter.city = city;
      if (country) filter.country = country;
  
      console.log("Filter criteria:", filter);
  
      const applications = await Application.find(filter).populate("userId");
      console.log("Filtered applications:", applications);
  
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error filtering applications:", error);
      res.status(500).json({ message: "Error filtering applications", error });
    }
  };
  

// Add or update token number to an application
const addTokenNumber = async (req, res) => {
  try {
    const { applicationId, tokenNumber } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.tokenNumber = tokenNumber;
    await application.save();

    res.status(200).json({ message: "Token number added successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Error adding token number", error });
  }
};

export { getAllApplications, filterApplications, addTokenNumber };
