import Plant from "../models/Plant.js"

export const handlegetplants = async (req, res) => {
    try{
        const plants = await Plant.find()
        res.json({success: true, plants})
    } catch (error) {
        console.error("Error getting all plants:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const handleCreate = async (req, res) => {
    try{
        const plant = req.body;
        if (req.file) { 
            plant.image = req.file.path;
        }
        const userId = req.user;
        plant.userId = userId;
        
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
        
        // If there's a query, perform a search
        if (query) {
            plants = await Plant.find({ name: { $regex: query, $options: 'i' } });
        } else {
            // Otherwise, fetch all plants
            plants = await Plant.find();
        }
        
        res.json({ success: true, plants });
    } catch (error) {
        console.error("Error searching plants:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};
