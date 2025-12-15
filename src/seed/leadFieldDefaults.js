// const { LeadField } = require("../pgModels/index");

async function insertDefaultLeadFields(LeadField) {
    try {
        if (!LeadField) {
            throw new Error("LeadField model not loaded");
        }


        const count = await LeadField.count();

        if (count === 0) {
            console.log("⏳ Inserting default LeadFields...");

            await LeadField.bulkCreate([
                {
                    name: "name",
                    lable: "name",
                    type: "text",
                    is_required: true,
                    order: 1,
                },
                {
                    name: "phone_number",
                    lable: "Phone Number",
                    type: "phone",
                    is_required: true,
                    order: 2,
                },
            ]);

            console.log("✅ Default LeadFields inserted successfully.");
        } else {
            console.log("ℹ️ LeadFields already exist. Skipping...");
        }

    } catch (error) {
        console.error("❌ Error inserting LeadFields:", error);
    }
}

module.exports = insertDefaultLeadFields;
