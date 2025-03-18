import Review from "../models/reviewModel.js";

const addReview = async (req, res) => {
    const { medicineId, rating, comment } = req.body;

    try {
        const review = new Review({
            user: req.user._id,
            medicine: medicineId,
            rating,
            comment
        });

        await review.save();
        res.status(201).json({ success: true, message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add review" });
    }
};

export { addReview };