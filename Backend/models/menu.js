//we need catrgories
//inside each category :item
// each item ref. of foodItem
//whole menu => belongs to restaurant

const mongoose = require(`mongoose`);
const Schema = new mongoose.Schema({
    menu: {
        category:{
            type: String,
            item:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: "FoodItem"
            }]
        }

    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)
Menu = mongoose.model("Menu",Schema);
module.exports = Menu;
