import Plant from "../models/Plant.js"

export const handlegetplants = async (req, res) => {
    console.log("Request.user", req.user)
    try {
        const userId = req.user;
        const plants = await Plant.find({ userId: userId });

        res.json({ success: true, plants });
    } catch (error) {
        console.error("Error getting plants by user ID:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const handleCreate = async (req, res) => {
    try{
        
        console.log("Create plant: ",  req.body)

        const plant = req.body;
        if (req.file) { 
            plant.image = req.file.path;
        }
        const userId = req.user;
        const userName = req.user;
        plant.userId = userId;
        plant.userName = userName;
        
        const newPlant = new Plant(plant);
        await newPlant.save();
        res.json({ success: true, newPlant });
     

    } catch (error) {
        console.error("Error creating plant:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const handleDelete = async (req, res) => {
    
    try{
        const { plantId } = req.params
    const findPlant = await Plant.findByIdAndDelete(plantId)
    
    res.json({success: true,  message: "Plant deleted successfully!" })

    } catch (error) {
        console.error("error delete Plant", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const handleEdite = async(req,res)=>{
    const { plantId } = req.params
    const updatedData = req.body
    const updatedPlant = await Plant.findByIdAndUpdate(plantId,updatedData, {new: true})
    if (!updatedPlant) {
        return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedPlant)
}

// Search to find all users plants

export const SearchPlants = async (req, res) => {
    try {
        const { query } = req.query;
        let plants;
        if (query) {
            plants = await Plant.find({ name: { $regex: `.*${query}.*`, $options: 'i' } }).populate('userId', 'name');
        } else {
            plants = await Plant.find().populate('userId', 'name');
        }
        
        res.json({ success: true, plants });
    } catch (error) {
        console.error("Error searching plants:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

// get plant by id
export const getPlantById = async (req, res) => {
    try {
        const plantId = req.params.plantId; 
        console.log("Plant ID:", plantId);
        console.log("Request Params:", req.params);

        const plant = await Plant.findById(plantId).populate('userId', 'name');
        console.log("Populated Plant:", plant);

        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }

        const userName = plant.userId ? plant.userId.name : "Unknown";
        console.log("User Name:", userName);

        res.json({ success: true, plant, userName }); 
    } catch (err) {
        console.error("Error fetching plant by id:", err.message);
        res.status(500).json({ success: false, error: err.message }); 
    }
};



export const getCategories = async (req, res) => {
    try {
        const userId = req.user;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userPlants = await Plant.find({ userId });
        const categories = userPlants.map(plant => plant.categorie);
        const uniqueCategories = [...new Set(categories)];
        res.json({ success: true, categories: uniqueCategories });
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const filterPlantsByCategory = async (req, res) => {
    try {
        const { categorie } = req.query;
        let filteredPlants;
        if (categorie === 'All' || !categorie) {
            filteredPlants = await Plant.find({});
        } else {
            filteredPlants = await Plant.find({ categorie });
        }        res.json({ success: true, plants: filteredPlants });
    } catch (error) {
        console.error("Error filtering plants by category:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getPlantsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const plants = await Plant.find({ userId: userId });
        res.json({ success: true, plants });
    } catch (error) {
        console.error('Error fetching plants by user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
